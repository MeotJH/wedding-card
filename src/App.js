import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MediaController from './components/MediaController';
import Invitation from './components/Invitation';
import Guestbook from './components/Guestbook';
import Rain from './components/Rain';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPreparation, setShowPreparation] = useState(false);
  const [playMedia, setPlayMedia] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [skipCount, setSkipCount] = useState(0);
  const [skipButtonPosition, setSkipButtonPosition] = useState({ bottom: 20, right: 20 });
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log(e));
      }
    }
  }, [isMuted]);

  const handleVideoEnd = useCallback(() => {
    setPlayMedia(false);
    setShowInvitation(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log(e));
    }
  }, []);

  const handleStart = (muted) => {
    setIsMuted(muted);
    setShowWelcome(false);
    setShowPreparation(true);
    
    // 3초 후 준비 화면에서 동영상으로 전환
    setTimeout(() => {
      setShowPreparation(false);
      setPlayMedia(true);
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Router>
      <div className={`App ${showInvitation ? 'invitation-visible' : ''}`}>
        <Rain />
        <audio ref={audioRef} src="/assets/background-music.mp3" loop />
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
        <Routes>
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/" element={
            <>
              {showWelcome ? (
                <div className="welcome-container">
                  <p className="main-quote">사랑에 기한이 있다면</p>
                  <p className="main-quote">만년으로 하고 싶다</p>
                  <div className="couple-intro">
                    <p className="couple-names">진한 ❤️ 수경</p>
                    <p className="couple-message">우리만의 영원을 시작합니다</p>
                  </div>
                  <p className="invitation-question">우리의 이야기를 시작하시겠어요?</p>
                  <p className="noti-message">(수락하면 음성이 나와요)</p>
                  <div className="button-group">
                    <button className="start-button" onClick={() => handleStart(false)}>네</button>
                    <button className="start-button" onClick={() => handleStart(true)}>아니오</button>
                  </div>
                </div>
              ) : showPreparation ? (
                <div className="preparation-container">
                  <div className="preparation-content">
                    <div className="loading-spinner"></div>
                    <p className="preparation-message">잠시만요, 특별한 순간을 준비하고 있어요...</p>
                  </div>
                </div>
              ) : playMedia ? (
                <div className="video-wrapper">
                  <MediaController
                    onVideoEnd={handleVideoEnd}
                    isMuted={isMuted}
                    play={playMedia}
                    videoSrc="/assets/intro-video.mp4" 
                  />
                  {playMedia && <button
                    className="skip-button"
                    style={skipButtonPosition}
                    onClick={handleSkipClick}>
                    건너뛰기
                  </button>}
                </div>
              ) : (
                showInvitation && 
                <>
                  <Invitation />
                  <button onClick={toggleMute} className="mute-button">
                    {isMuted ? "Unmute" : "Mute"}
                  </button>
                </>
              )}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
