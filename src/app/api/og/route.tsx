import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

const loadGoogleFont = async (font: string, text: string) => {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
};

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get('title');
  const description = searchParams.get('description');

  if (!title) {
    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          background: 'linear-gradient(to bottom, #5b90ff, #86e1fc)',
        }}
      >
        <div
          style={{
            backgroundColor: '#1e2030',
            color: '#c8d3f5',
            fontWeight: 600,
            display: 'flex',
            flexDirection: 'column',
            marginTop: '2rem',
            marginBottom: '2rem',
            marginLeft: '2rem',
            marginRight: '2rem',
            flexGrow: '1',
            borderRadius: '1rem',
          }}
        >
          <p
            style={{
              fontSize: 100,
              marginTop: 'auto',
              marginBottom: 'auto',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            RUNFUNRUN.dev
          </p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'notoSansJP',
            data: await loadGoogleFont('Noto+Sans+JP', 'RUNFUNRUN.dev'),
            style: 'normal',
          },
        ],
      },
    );
  }

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        background: 'linear-gradient(to bottom, #5b90ff, #86e1fc)',
      }}
    >
      <div
        style={{
          backgroundColor: '#1e2030',
          color: '#c8d3f5',
          fontWeight: 600,
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2rem',
          marginBottom: '2rem',
          marginLeft: '2rem',
          marginRight: '2rem',
          flexGrow: '1',
          borderRadius: '1rem',
        }}
      >
        <p
          style={{
            fontSize: 50,
            marginTop: '2rem',
            marginBottom: 'auto',
            marginLeft: '4rem',
            marginRight: '4rem',
          }}
        >
          RUNFUNRUN.dev
        </p>
        <div
          style={{
            fontSize: 70,
            marginLeft: '4rem',
            marginRight: '4rem',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 'auto',
            marginBottom: '2rem',
            marginLeft: '4rem',
            marginRight: '4rem',
          }}
        >
          {description}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'notoSansJP',
          data: await loadGoogleFont(
            'Noto+Sans+JP:wght@600',
            `RUNFUNRUN.dev${title}${description}`,
          ),
          style: 'normal',
        },
      ],
    },
  );
};
