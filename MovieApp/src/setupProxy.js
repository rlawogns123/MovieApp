import { createProxyMiddleware } from "http-proxy-middleware";

export default function (server) {
  server.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
}
