import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = (token?: string) => {
    if(!socket) {
        socket = io(process.env.NEXT_PUBLIC_CLIENT_ORIGIN || 'http://localhost:4000', {
            auth: { token }
        });
    } else if(!socket.connected) {
        socket.connect();
    }

    return socket;
}