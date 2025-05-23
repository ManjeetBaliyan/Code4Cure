// components/VideoCall.js
import React, { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

function VideoCall({ roomUrl, token }) {
    const callFrameRef = useRef(null);
    const [captionsOn, setCaptionsOn] = useState(false);
    const [callFrame, setCallFrame] = useState(null);

    console.log('VideoCall component rendered with roomUrl:', roomUrl, 'and token:', token);
    

    useEffect(() => {
        const frame = DailyIframe.createFrame({
            iframeStyle: {
                position: 'relative',
                width: '100%',
                height: '100%',
                border: '0',
                borderRadius: '1rem',
            },
        });

        frame.join({ url: `${roomUrl}?t=${token}` });

        callFrameRef.current.appendChild(frame.iframe);
        callFrameRef.current.callFrame = frame;
        setCallFrame(frame);

        return () => {
            frame.leave();
        };
    }, [roomUrl, token]);

    const toggleCaptions = async () => {
        if (!callFrame) return;

        try {
            if (captionsOn) {
                await callFrame.transcription().stop();
            } else {
                await callFrame.transcription().start({ language: 'en' });
            }
            setCaptionsOn(!captionsOn);
        } catch (error) {
            console.error('Failed to toggle transcription:', error);
        }
    };

    return (
        <div className="w-full h-screen relative bg-black">
            <div ref={callFrameRef} className="w-full h-full" />
            <button
                onClick={toggleCaptions}
                className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
            >
                {captionsOn ? 'Turn Captions Off' : 'Turn Captions On'}
            </button>
        </div>
    );
}


export default VideoCall;
