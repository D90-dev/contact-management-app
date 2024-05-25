/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                background: {
                    primary: '#F1F1F1',
                    secondary: '#2C2D5E',
                    gray: '#868686'
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
}
