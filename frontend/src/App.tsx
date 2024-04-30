import { Routes, Route } from "react-router-dom";

import "./App.css";
import { useWebSocketWithAuth } from "./features/websocket";
import { ShareVideosPage } from "./pages/ShareVideo";
import { HomePage } from "./pages/Home";
import { SignUpPage } from "./pages/SignUp";
import config from "./app/config";

const NotFound: React.FC = () => <div>404 Not Found</div>;

function App() {
  useWebSocketWithAuth();
  config;
  return (
    <Routes>
      <Route path={config.ROUTES.HOME} element={<HomePage />} />
      <Route path="/share-youtube" element={<ShareVideosPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
