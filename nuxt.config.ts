// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      privateKey: process.env.NUXT_ENV_PRIVATE_KEY,
      baseUrl: process.env.NUXT_ENV_BASE_URL,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  imports: {
    dirs: ['stores']
  },
  plugins: ["@/plugins/axios.ts"],
});
