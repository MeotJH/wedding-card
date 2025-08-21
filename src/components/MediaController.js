import React, { useRef, useEffect, useState } from 'react';
import './MediaController.css';

const MediaController = ({ onVideoEnd, isMuted, play, videoSrc }) => {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (play && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Video play failed:", error);
          // 재생 실패 시 다시 시도
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(e => console.log('Retry failed:', e));
            }
          }, 500);
        });
      }
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
        preload="auto"
      />
    </div>
  );
};

export default MediaController;
