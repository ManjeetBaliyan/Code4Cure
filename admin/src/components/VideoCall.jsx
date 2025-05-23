import React, { useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { useNavigate } from 'react-router-dom';

function VideoCall({ roomUrl, token }) {
  const navigate = useNavigate();

  useEffect(() => {
    const frame = DailyIframe.createFrame({
      showLeaveButton: true,
      iframeStyle: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: '0',
        zIndex: 9999,
      },
    });

    // 1. Append to document.body instead of relying on component DOM
    if (frame.iframe instanceof Node) {
      document.body.appendChild(frame.iframe);
    }

    // 2. Load (not join) to show prebuilt UI
    frame.join({ url: `${roomUrl}?t=${token}` });

    // 3. Redirect on leave
    frame.on('left-meeting', () => {
      frame.destroy();
      navigate('/doctor-dashboard');
    });

    return () => {
      frame.leave();
      frame.destroy();
      if (frame.iframe && frame.iframe.remove) {
        frame.iframe.remove();
      }
    };
  }, [roomUrl, token, navigate]);

  return null; // We don't need to render anything in the DOM
}

export default VideoCall;
