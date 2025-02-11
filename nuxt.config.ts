export default defineNuxtConfig({
  app: {
    baseURL: "/simple-game/", // GitHub Pages 用のベースURL
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
