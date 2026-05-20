import { Server as HTTPServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

export interface WebSocketMessage {
  type: "product_update" | "product_delete" | "product_create" | "sale_update" | "testimonial_update" | "sync_request";
  data: any;
  timestamp: number;
}

let wss: WebSocketServer | null = null;
const clients = new Set<WebSocket>();

export function initializeWebSocket(server: HTTPServer) {
  wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws: WebSocket) => {
    console.log("[WebSocket] Client connected. Total clients:", clients.size + 1);
    clients.add(ws);

    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message);
        console.log("[WebSocket] Received:", data.type);
        // Handle incoming messages if needed
      } catch (error) {
        console.error("[WebSocket] Error parsing message:", error);
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("[WebSocket] Client disconnected. Total clients:", clients.size);
    });

    ws.on("error", (error: any) => {
      console.error("[WebSocket] Error:", error);
      clients.delete(ws);
    });
  });

  return wss;
}

export function broadcastUpdate(message: WebSocketMessage) {
  if (!wss) return;

  const payload = JSON.stringify(message);
  let successCount = 0;

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload, (error: any) => {
        if (error) {
          console.error("[WebSocket] Broadcast error:", error);
        } else {
          successCount++;
        }
      });
    }
  });

  console.log(`[WebSocket] Broadcasted ${message.type} to ${successCount}/${clients.size} clients`);
}

export function getConnectedClientsCount(): number {
  return clients.size;
}
