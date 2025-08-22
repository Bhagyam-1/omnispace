import { validateMessage } from "@/actions/omniconnect/chat/chat";
import { NextRequest } from "next/server";
import { Server } from "socket.io";

// 👇 Keep a global reference so it's not recreated on hot reloads
const globalForIO = global as unknown as { io?: Server };

export async function GET(req: NextRequest) {
  if (!globalForIO.io) {
    console.log("Starting Socket.io server...");

    const io = new Server({
      cors: {
        origin: process.env.CLIENT_ORIGIN
      },
      // path: "/api/socket/io",
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("join_room", async(roomId) => {
        console.log("Join the room: ", roomId);
        await validateMessage(roomId);
        socket.join(roomId);
      });
      
      socket.on("leave_room", (roomId) => {
        socket.leave(roomId);
      });
      
      socket.on("message", async ({ roomId, text }) => {
        await validateMessage(roomId);
        io.to(roomId).emit("message", { sender: socket.id, text });
      });
    });

    globalForIO.io = io;
  }

  return new Response("Socket server is running", { status: 200 });
}
