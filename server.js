import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import app from "./app.js";
import { fileURLToPath } from "url";
import { dbConnection } from "./src/database/dbConnection.js";
import { errorMiddleware } from "./src/middleware/error.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(
//   cors({
//     origin: true,
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   }),
// );
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// app.use(errorMiddleware);
// Serve the favicon.ico file from the uploads directory
// app.get('/favicon.ico', (req, res) => {
//   res.sendFile(path.join(__dirname, 'uploads', 'favicon.ico'));
// });
const HTTPS_PORT = process.env.HTTPS_PORT;
const HTTP_PORT = process.env.HTTP_PORT;

const IS_SSL = process.env.IS_SSL;

const httpServer = http.createServer(app);
let httpsServer;

const startServers = async () => {
  try {
    await dbConnection();

    if (IS_SSL) {
      try {
        const privateKey = fs.readFileSync(process.env.SSL_SERVER_KEY, "utf8");
        const certificate = fs.readFileSync(
          process.env.SSL_SERVER_CERT,
          "utf8",
        );
        const credentials = { key: privateKey, cert: certificate };

        httpsServer = https.createServer(credentials, app);
        httpsServer.listen(HTTPS_PORT, () => {
          console.log(`:lock: HTTPS Server is running at port: ${HTTPS_PORT}`);
        });

        httpsServer.on("error", (err) => {
          if (err.code === "EADDRINUSE") {
            console.error(`HTTPS Server failed to start: ${err.message}`);
            console.log(`Switching to HTTP Server on port: ${HTTP_PORT}...`);

            httpServer.listen(HTTP_PORT, () => {
              console.log(
                `:gear: HTTP Server is running at port: ${HTTP_PORT}`,
              );
            });
          } else {
            console.error(`HTTPS Server encountered an error: ${err.message}`);
            process.exit(1);
          }
        });
      } catch (sslError) {
        console.error(`Failed to start HTTPS Server: ${sslError.message}`);
        console.log(`Switching to HTTP Server on port: ${HTTP_PORT}...`);

        httpServer.listen(HTTP_PORT, () => {
          console.log(`:gear: HTTP Server is running at port: ${HTTP_PORT}`);
        });
      }
    } else {
      httpServer.listen(HTTP_PORT, () => {
        console.log(`:gear: HTTP Server is running at port: ${HTTP_PORT}`);
      });
    }
  } catch (dbError) {
    console.error("MongoDB connection failed:", dbError);
    process.exit(1);
  }
};

startServers();
