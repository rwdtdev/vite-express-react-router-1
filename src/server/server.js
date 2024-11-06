import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config";

const app = express();
ViteExpress.config({ mode: process.env.NODE_ENV });

app.get("/message", (_, res) => res.send("Hello from express!"));

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
