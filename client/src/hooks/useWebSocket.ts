import { useEffect, useRef, useCallback } from "react";

export interface WebSocketMessage {
  type: "product_update" | "product_delete" | "product_create" | "sale_update" | "testimonial_update" | "sync_request";
  data: any;
  timestamp: number;
}

export function useWebSocket(onMessage?: ((message: WebSocketMessage) => void) | undefined) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const connect = useCallback(() => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log("[WebSocket] Connected");
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log("[WebSocket] Received:", message.type);
          if (onMessage) {
            onMessage(message);
          }
        } catch (error) {
          console.error("[WebSocket] Error parsing message:", error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("[WebSocket] Error:", error);
      };

      wsRef.current.onclose = () => {
        console.log("[WebSocket] Disconnected, attempting to reconnect...");
        // Attempt to reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      };
    } catch (error) {
      console.error("[WebSocket] Connection error:", error);
    }
  }, [onMessage]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  const send = useCallback((message: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  return { send, isConnected: wsRef.current?.readyState === WebSocket.OPEN };
}
