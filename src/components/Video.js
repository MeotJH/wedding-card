import React, { useState, useEffect, useRef } from 'react';
import './Video.css';

const Video = ({ onVideoEnd, isMuted }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const playerRef = useRef(null);

  // Effect for player initialization
  useEffect(() => {
    const handleVideoEnd = () => {
      setFadeOut(true);
      setTimeout(onVideoEnd, 1000); // Corresponds to the fade-out duration
    };

    const createPlayer = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'bTGIUz3qKcQ', // YouTube Shorts video ID
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 0, // Loop is disabled to allow onStateChange ENDED event to fire reliably
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          mute: isMuted ? 1 : 0, // Set initial mute state
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

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    const handleScroll = () => {
      handleVideoEnd();
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      window.onYouTubeIframeAPIReady = null;
    };
    // This effect should run only once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onVideoEnd]);

  // Effect for updating mute state
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.mute === 'function' && typeof playerRef.current.unMute === 'function') {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted]);

  return (
    <div className={`video-container ${fadeOut ? 'fade-out' : ''}`}>
      <div id="youtube-player"></div>
    </div>
  );
};

export default Video;