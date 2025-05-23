import { useLocation , useNavigate} from 'react-router-dom';
import VideoCall from '../components/videocall'; // Adjust the import path as necessary

function VideoCallWrapper() {
  const { state } = useLocation();
  const { roomUrl, token } = state || {};

  if (!roomUrl || !token) return <p>Missing call details</p>;

  return <VideoCall roomUrl={roomUrl} token={token} />;
}

export default VideoCallWrapper;