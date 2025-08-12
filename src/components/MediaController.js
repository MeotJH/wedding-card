import React, { useRef, useEffect, useState } from 'react';
import './MediaController.css';

const MediaController = ({ onVideoEnd, isMuted, play, videoSrc }) => {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (play) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
      });
    }
  }, [play]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleVideoEnd = () => {
    setFadeOut(true);
    setTimeout(onVideoEnd, 1000); // Corresponds to fade-out
  };

  return (
    <div className={`media-container ${fadeOut ? 'fade-out' : ''}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        onEnded={handleVideoEnd}
        muted={isMuted}
        playsInline
      />
    </div>
  );
};

export default MediaController;
