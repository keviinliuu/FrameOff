/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/index.tsx', './**/*.{js,ts,jsx,tsx}', '!./**/node_modules/**'],
    theme: {
        extend: {
            colors: {
                'current': 'currentColor',
                'moonbeam': '#ffffff',
                'slate': '#838383',
                'graphite': '#585457',
                'charcoal': '554f4f',
                'aqua': '#84e4db',
                'midnight': '#00031d',
                'nocturne': '#0d0324',
                'blush': '#ffade7',
                'lilac': '#bc8aad',
                'candy': '#ffd4f3',
                'plum': '#6b385c',
                'raspberry': '#be4f9d',
                'fushcia': '#e41b9f'
            },
            fontFamily: {
                main: ['League Spartan'],
            },
            spacing: {
                'logocustom': '13%'
            },
            fontSize: {
                '1.5xl': ['1.35rem', {
                  lineHeight: '2rem',
                  letterSpacing: '-0.01em',
                }],
              }
        },
    },
    plugins: [],
};
