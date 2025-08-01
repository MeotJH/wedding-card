import React, { useState, useCallback } from 'react';
import './App.css';
import Video from './components/Video';
import Invitation from './components/Invitation';
import Rain from './components/Rain';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sound from './components/Sound';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [skipCount, setSkipCount] = useState(0);
  const [skipButtonPosition, setSkipButtonPosition] = useState({ bottom: 20, right: 20 });
  const [skipVisible, setSkipVisible] = useState(false);

  const handleVideoEnd = useCallback(() => {
    setShowVideo(false);
    setShowInvitation(true);
    // Here you could start background music if you want, respecting the isMuted state.
  }, []);

  const handleStart = (muted) => {
    setIsMuted(muted);
    setShowWelcome(false);
    setShowVideo(true);

    // Show skip button after 3 seconds
    setTimeout(() => {
      setSkipVisible(true);
    }, 3000);
  };

  const handleSkipClick = () => {
    const newSkipCount = skipCount + 1;
    setSkipCount(newSkipCount);

    if (newSkipCount === 3) {
      toast.info("영상 왜 안봐!!", {
        className: 'cyberpunk-toast',
        bodyClassName: 'cyberpunk-toast-body',
        progressClassName: 'cyberpunk-toast-progress',
      });
      handleVideoEnd(); // End video after 3 skips
    } else {
      const newX = Math.floor(Math.random() * (window.innerWidth - 150));
      const newY = Math.floor(Math.random() * (window.innerHeight - 100));
      setSkipButtonPosition({ top: newY, left: newX });
    }
  };

  return (
    <div className={`App ${showInvitation ? 'invitation-visible' : ''}`}>
      <Rain />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {showWelcome ? (
        <div className="welcome-container">
          <p className="welcome-message">진한과 수경의 청첩장</p>
          <p className="welcome-message">확인해 보시겠어요?</p>
          <p className="noti-message">(수락하면 음성이 나와요)</p>
          <div className="button-group">
            <button className="start-button" onClick={() => handleStart(false)}>네</button>
            <button className="start-button" onClick={() => handleStart(true)}>아니오</button>
          </div>
        </div>
      ) : showVideo ? (
        <div className="video-wrapper">
          <Video onVideoEnd={handleVideoEnd} isMuted={isMuted} />
          <button
            className={`skip-button ${skipVisible ? '' : 'hide'}`}
            style={skipButtonPosition}
            onClick={handleSkipClick}>
            건너뛰기
          </button>
        </div>
      ) : (
        showInvitation && <Invitation />
      )}
      {showInvitation && <Sound isMuted={isMuted} playing={showInvitation} />}
    </div>
  );
}

export default App;