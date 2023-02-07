module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },

            aspectRatio: {
                image: '2 / 3',
            },
        },
    },
    plugins: [require("daisyui")],
}