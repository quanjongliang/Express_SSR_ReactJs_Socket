import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import * as socketio from "socket.io";
import Chat from "./chat";
import cors from "cors";
dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT;

const server = createServer(app).listen(port, function () {
  console.log("Express server listening on port " + port);
});
const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/helloworld", (req, res) => {
  res.json({ sayHi: "hello from server, nice to meet you!" });
});

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("sendMessage", (message: string) => {
    console.log(`message: ${message}`);
    Chat.addMessage(message);
    io.emit("messages", Chat.getMessages());
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
