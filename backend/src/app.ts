import express from "express";
import http from "http";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";
import multer from "multer";
import upload from "./config/upload";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
  })
);

const serverHttp = http.createServer(app);

app.use(express.json());

app.use(router);

export { serverHttp };