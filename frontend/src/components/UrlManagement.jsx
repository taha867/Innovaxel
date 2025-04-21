import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const UrlManagement = () => {
  const [shortCode, setShortCode] = useState('');
  const [urlData, setUrlData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  const handleRetrieve = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setUrlData(null);

    try {
      const response = await axios.get(`/shorten/${shortCode}`);
      setUrlData(response.data.data);
      setSuccess('URL retrieved successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to retrieve URL');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newUrl) {
      setError('Please enter a new URL');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let formattedUrl = newUrl;
      if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
        formattedUrl = 'https://' + newUrl;
      }

      await axios.put(`/shorten/${shortCode}`, { url: formattedUrl });
      setSuccess('URL updated successfully!');
      setNewUrl('');
      // Refresh the URL data
      const response = await axios.get(`/shorten/${shortCode}`);
      setUrlData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update URL');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this URL?')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.delete(`/shorten/${shortCode}`);
      setSuccess('URL deleted successfully!');
      setUrlData(null);
      setShortCode('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="management-section">
        <h2>Manage Short URLs</h2>
        
        <form onSubmit={handleRetrieve} className="retrieve-form">
          <div className="input-group">
            <input
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="Enter short code"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Retrieve URL'}
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {urlData && (
          <div className="url-details">
            <div className="url-info">
              <h3>URL Details</h3>
              <p><strong>Original URL:</strong> {urlData.url}</p>
              <p><strong>Short Code:</strong> {urlData.shortCode}</p>
              <p><strong>Created At:</strong> {new Date(urlData.createdAt).toLocaleString()}</p>
              <p><strong>Access Count:</strong> {urlData.analytics?.accessCount || 0}</p>
            </div>

            <div className="management-actions">
              <form onSubmit={handleUpdate} className="update-form">
                <div className="input-group">
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Enter new URL"
                    required
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update URL'}
                  </button>
                </div>
              </form>

              <button 
                onClick={handleDelete} 
                className="delete-button"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete URL'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlManagement; 