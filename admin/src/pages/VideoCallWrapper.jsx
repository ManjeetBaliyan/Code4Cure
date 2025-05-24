import { useLocation, useNavigate } from 'react-router-dom';
import VideoCall from '../components/videocall'; // Adjust the import path as necessary

function VideoCallWrapper() {
  const { state } = useLocation();
  const { roomUrl, roomToken, appointmentId } = state || {};

  

  if (!roomUrl || !roomToken) return <p>Missing call details</p>;

  return <VideoCall roomUrl={roomUrl} roomToken={roomToken} appointmentId={appointmentId} />;
}

export default VideoCallWrapper;