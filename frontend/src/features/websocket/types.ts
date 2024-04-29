export interface WSConnection {
  url: string; // Connection status
  accessToken: string; // Array of messages received
  userAgent: string; // Error message, if any
}

export interface WebSocketState {
  isConnected: boolean; // Connection status
  // channels: WSChannel[];
  error: string | null; // Error message, if any
}
