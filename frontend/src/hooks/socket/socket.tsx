import { createConsumer } from "@rails/actioncable"

const SERVER_URL = `${import.meta.env.VITE_BACK_END_BASE_URL}/cable`; // Change this to your WebSocket server URL
export const cable = createConsumer(`${SERVER_URL}?userAgent=${navigator.userAgent}`);
