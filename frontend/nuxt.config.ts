export default defineNuxtConfig({
    nitro: {
        routeRules: {
            '/ws': { server: true },
        },
    },
});
