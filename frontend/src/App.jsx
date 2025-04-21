import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import UrlShortener from './components/UrlShortener';
import UrlManagement from './components/UrlManagement';
import UrlStats from './components/UrlStats';
import Redirect from './components/Redirect';
import NotFound from './components/NotFound';
import './App.css';

// Configure axios to use the proxy
axios.defaults.baseURL = '/api';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>URL Shortener</h1>
          <nav>
            <Link to="/">Shorten URL</Link>
            <Link to="/manage">Manage URLs</Link>
            <Link to="/stats">View Statistics</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<UrlShortener />} />
            <Route path="/manage" element={<UrlManagement />} />
            <Route path="/stats" element={<UrlStats />} />
            <Route path="/:shortCode" element={<Redirect />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
