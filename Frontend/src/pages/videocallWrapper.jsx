import { useLocation } from 'react-router-dom';
import VideoCall from '../components/VideoCall';

function VideoCallWrapper() {
  const { state } = useLocation();
  const { roomUrl, token } = state || {};

  if (!roomUrl || !token) return <p>Missing call details</p>;

  return <VideoCall roomUrl={roomUrl} token={token} />;
}

export default VideoCallWrapper;
