// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  session: {
    session: {
      cookieSecure: process.env.NODE_ENV === "production",
    },
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: ["@sidebase/nuxt-session"],
});
