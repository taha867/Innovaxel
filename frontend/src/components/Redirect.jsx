import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Redirect = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(`/shorten/${shortCode}`);
        window.location.href = response.data.data.url;
      } catch (error) {
        navigate('/not-found');
      }
    };

    fetchOriginalUrl();
  }, [shortCode, navigate]);

  return <div>Redirecting...</div>;
};

export default Redirect; 