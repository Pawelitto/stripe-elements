// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      STRIPE_KEY: process.env.STRIPE_KEY,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    },
  },
});
