export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ink:             '#0d0d0d',
                paper:           '#f8f6f2',
                warm:            '#f0ece4',
                accent:          '#c8552a',
                'accent-light':  '#e8845e',
                muted:           '#6d6560',
                border:          '#e0ddd8',
            },
            fontFamily: {
                display: ['Fraunces', 'Georgia', 'serif'],
                body:    ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
                mono:    ['DM Mono', 'monospace'],
            },
            maxWidth: {
                content: '1200px',
            },
        },
    },
    plugins: [],
};