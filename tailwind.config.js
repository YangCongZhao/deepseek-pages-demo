// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(8px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 300ms ease-in-out forwards',
            },
        },
    },
};
