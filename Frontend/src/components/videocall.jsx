// components/VideoCall.jsx
import React, { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

function VideoCall({ roomUrl, token }) {
  const containerRef = useRef(null);
  const [captionsOn, setCaptionsOn] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const frame = DailyIframe.createFrame({
      showLeaveButton: true,
      iframeStyle: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        border: '0',
      },
    });

    frame.join({ url: `${roomUrl}?t=${token}` });

    // Clear any existing content just to be safe
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(frame.iframe);
    containerRef.current.callFrame = frame;

    return () => {
      frame.leave();
      frame.destroy();
    };
  }, [roomUrl, token]);

  const toggleCaptions = async () => {
    const frame = containerRef.current.callFrame;
    if (!frame) return;

    try {
      await frame.setTranscription({ startTranscription: !captionsOn });
      setCaptionsOn(!captionsOn);
    } catch (error) {
      console.error('Failed to toggle transcription:', error);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'black',
      }}
    >
      <button
        onClick={toggleCaptions}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10000,
          padding: '0.5rem 1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        {captionsOn ? 'Turn Captions Off' : 'Turn Captions On'}
      </button>
    </div>
  );
}

export default VideoCall;
