
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  runtimeConfig: {
    public: {
      privateKey: process.env.NUXT_ENV_PRIVATE_KEY,
      baseUrl: process.env.NUXT_ENV_BASE_URL,
    },
  },
  modules: ["@nuxt/ui"],
  plugins: [ "@/plugins/axios.ts"],
  colorMode: {
    preference: 'light'
  },
});