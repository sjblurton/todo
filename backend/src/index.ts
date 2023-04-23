import app from "./app";

addEventListener("fetch", (event) =>
  event.respondWith(app.handle(event.request))
);
