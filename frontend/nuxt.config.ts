export default defineNuxtConfig({
    nitro: {
        routeRules: {
            '/ws': { server: true }, // Stellt sicher, dass /ws vom Server behandelt wird
        },
    },
});
