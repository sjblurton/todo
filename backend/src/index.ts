import app from "./app";

addEventListener("fetch", (event: FetchEvent) =>
  event.respondWith(app.handle(event.request))
);
