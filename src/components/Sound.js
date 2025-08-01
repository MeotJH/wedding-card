import React, { useEffect, useRef } from 'react';

const Sound = ({ isMuted, playing }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Stop and destroy player if playing is false
    if (!playing) {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      return;
    }

    const createPlayer = () => {
      // Ensure no existing player
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      playerRef.current = new window.YT.Player('music-player', {
        videoId: 'Yh87974T6hk',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: 'Yh87974T6hk', // Required for single video looping
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          mute: isMuted ? 1 : 0,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    };

    // Check if the YouTube IFrame API is ready
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      // If not ready, the API script will call this function once loaded
      // This assumes the script is already being loaded by Video.js
      // and handles the case where this component mounts after the API is ready.
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [playing, isMuted]);

  // Effect to handle mute state changes while playing
  useEffect(() => {
    if (playerRef.current && playing && typeof playerRef.current.mute === 'function' && typeof playerRef.current.unMute === 'function') {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted, playing]);

  return (
    <div style={{ display: 'none' }}>
      <div id="music-player"></div>
    </div>
  );
};

export default Sound;
