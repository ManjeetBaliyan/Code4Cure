import { useLocation } from 'react-router-dom';
import VideoCall from '../components/videocall';

function VideoCallWrapper() {
  const { state } = useLocation();
  const { roomUrl, roomToken , appointmentId} = state || {};

  if (!roomUrl || !roomToken) return <p>Missing call details</p>;

  return <VideoCall roomUrl={roomUrl} roomToken={roomToken} appointmentId = {appointmentId}/>;
}

export default VideoCallWrapper;
