import { useState } from 'react';
import axios from 'axios';
import '../App.css';

const UrlStats = () => {
  const [shortCode, setShortCode] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetStats = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStats(null);

    try {
      const response = await axios.get(`/shorten/${shortCode}/stats`);
      setStats(response.data.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('URL not found');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch statistics');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="stats-section">
        <h2>URL Statistics</h2>
        
        <form onSubmit={handleGetStats} className="stats-form">
          <div className="input-group">
            <input
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="Enter short code"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Get Statistics'}
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {stats && (
          <div className="stats-details">
            <h3>Statistics for {stats.shortCode}</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Original URL</span>
                <span className="stat-value">
                  <a href={stats.url} target="_blank" rel="noopener noreferrer">
                    {stats.url}
                  </a>
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Short Code</span>
                <span className="stat-value">{stats.shortCode}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Created At</span>
                <span className="stat-value">
                  {new Date(stats.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Last Updated</span>
                <span className="stat-value">
                  {new Date(stats.updatedAt).toLocaleString()}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Accesses</span>
                <span className="stat-value highlight">{stats.accessCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlStats; 