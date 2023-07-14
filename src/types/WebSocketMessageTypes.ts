import { Server, Socket } from "socket.io";
import { GetFirstParamFromFunction, Merge } from "../utils/TypeUtils";
import { NextApiResponse } from "next";

export type ServerReceiverEvents = {
  "subscribe-message": (data: { id: string }) => void;
  "unsubscribe-message": (data: { id: string }) => void;
};
export type ServerReceiverEventsArgs = {
  [K in keyof ServerReceiverEvents]: GetFirstParamFromFunction<
    ServerReceiverEvents[K]
  >;
};
export type ServerSenderEvents = {
  "new-message": (data: { id: string; message: string }) => void;
};
export type ServerSenderEventsArgs = {
  [K in keyof ServerSenderEvents]: GetFirstParamFromFunction<
    ServerSenderEvents[K]
  >;
};

export type WebSocketEvents = Merge<ServerReceiverEvents, ServerSenderEvents>;
export type SocketServer = NextApiResponse["socket"] & {
  server?: { io?: Server; ioContext?: ServerContext; ioVersion?: string };
};
export type StoppedSocketServer = NextApiResponse["socket"] & {
  server: { io?: Server; ioContext?: ServerContext; ioVersion?: string };
};
export type RunningSocketServer = NextApiResponse["socket"] & {
  server: { io: Server; ioContext: ServerContext; ioVersion: string };
};
export type ServerContext = {
  messageContext: Map<
    string,
    Set<Socket<ServerReceiverEvents, ServerSenderEvents>>
  >;
};
export type PostMessageData<T extends keyof ServerSenderEvents> = {
  type: T;
  content: GetFirstParamFromFunction<ServerSenderEvents[T]>;
};
export type PostMessagesContent = {
  [K in keyof ServerSenderEvents]: PostMessageData<K>["content"];
};
