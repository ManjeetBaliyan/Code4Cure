// components/VideoCall.js
import React, { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

function VideoCall({ roomUrl, token }) {
    const callFrameRef = useRef(null);
    const [captionsOn, setCaptionsOn] = useState(true);

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

        return () => {
            frame.leave();
        };
    }, [roomUrl, token]);

    const toggleCaptions = async () => {
        const frame = callFrameRef.current.callFrame;
        if (!frame) return;

        try {
            await frame.setTranscription({ startTranscription: !captionsOn });
            setCaptionsOn(!captionsOn);
        } catch (error) {
            console.error("Failed to toggle transcription:", error);
        }
    };


    return (
        <div className="w-full h-screen relative bg-black">
            <div ref={callFrameRef} className="w-full h-full" />
            <button
                onClick={toggleCaptions}
                className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                {captionsOn ? 'Turn Captions Off' : 'Turn Captions On'}
            </button>
        </div>
    );
}

export default VideoCall;
