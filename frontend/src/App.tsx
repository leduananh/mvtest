import { Routes, Route } from "react-router-dom";

import "./App.css";
import { useWebSocketWithAuth } from "./features/websocket";
import { ShareVideosPage } from "./pages/ShareVideo";
import { HomePage } from "./pages/Home";
import { SignUpPage } from "./pages/SignUp";
import config from "./app/config";
import { LoginPage } from "./pages/Login";

const NotFound: React.FC = () => <div>404 Not Found</div>;

function App() {
  useWebSocketWithAuth();
  return (
    <Routes>
      <Route path={config.ROUTES.HOME} element={<HomePage />} />
      <Route path={config.ROUTES.VIDEO_SHARE} element={<ShareVideosPage />} />
      <Route path={config.ROUTES.REGISTER} element={<SignUpPage />} />
      <Route path={config.ROUTES.LOGIN} element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
