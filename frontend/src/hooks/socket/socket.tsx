import { createConsumer } from "@rails/actioncable"

const SERVER_URL = "http://localhost:3000/cable"; // Change this to your WebSocket server URL
export const cable = createConsumer(`${SERVER_URL}?userAgent=${navigator.userAgent}`);
