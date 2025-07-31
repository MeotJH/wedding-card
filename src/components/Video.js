import React, { useState, useEffect, useRef } from 'react';
import './Video.css';

const Video = ({ onVideoEnd }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    // Load the YouTube IFrame Player API script
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'bTGIUz3qKcQ', // YouTube Shorts video ID
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          mute: 1, // Mute the video to allow autoplay on mobile
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              handleVideoEnd();
            }
          },
        },
      });
    };

    const handleVideoEnd = () => {
      setFadeOut(true);
      setTimeout(onVideoEnd, 1000); // Corresponds to the fade-out duration
    };

    const handleScroll = () => {
      setFadeOut(true);
      setTimeout(onVideoEnd, 1000);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [onVideoEnd]);

  return (
    <div className={`video-container ${fadeOut ? 'fade-out' : ''}`}>
      <div id="youtube-player"></div>
    </div>
  );
};

export default Video;