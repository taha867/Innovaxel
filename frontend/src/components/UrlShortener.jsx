import { useState } from 'react';
import axios from 'axios';
import '../App.css';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting URL:', url);
    
    try {
      // Ensure URL has protocol
      let formattedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = 'https://' + url;
      }

      console.log('Sending request to backend with URL:', formattedUrl);
      const response = await axios.post('/shorten', { url: formattedUrl });
      console.log('Response from backend:', response.data);
      
      setShortenedUrls([response.data.data, ...shortenedUrls]);
      setUrl('');
      setError('');
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.error || 'Failed to shorten URL. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten (e.g., example.com)"
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {error && <p className="error">{error}</p>}
      
      <div className="url-list">
        <h2>Your Shortened URLs</h2>
        {shortenedUrls.map((shortUrl) => (
          <div key={shortUrl.id} className="url-item">
            <p>Original: {shortUrl.url}</p>
            <p>Short: <a href={`/s/${shortUrl.shortCode}`} target="_blank" rel="noopener noreferrer">
              {window.location.origin}/s/{shortUrl.shortCode}
            </a></p>
            <p>Access Count: {shortUrl.analytics?.accessCount || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlShortener; 