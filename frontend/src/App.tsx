import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./App.css";
import { useWebSocketWithAuth } from "./features/websocket";
import { ShareVideosPage } from './pages/ShareVideo';
import { HomePage } from './pages/Home';

const About: React.FC = () => <div>About</div>;
const Contact: React.FC = () => <div>Contact</div>;
const NotFound: React.FC = () => <div>404 Not Found</div>;

function App() {
  useWebSocketWithAuth();

  return (
    <Router>
      <Routes>
        {/* Define your routes */}

        <Route path="/" element={<HomePage />} />
        <Route path="/share-youtube" element={<ShareVideosPage />} />
        <Route path="/contact" element={<Contact />} />
        {/* Handle 404 routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
