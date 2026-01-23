/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "near-black": "#0B0B0B",
                "secondary": "#445567",
                "orange-accent": "#E4952B",
                "teal-accent": "#1BADAC",
            },
        },
    },
    plugins: [],
};
