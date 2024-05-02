/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'chatgpt-light-gray': '#212121',
                'chatgpt-dark-gray': '#121212',
                'chatgpt-border-gray': '#333333',

            },
        },
    },
    plugins: [],
}