import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Invitation.css';
import Slider from "react-slick";

const Invitation = () => {
  const sections = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.current.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.current.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <div className="initial-card-container">
        <div className="card main-card" ref={el => sections.current[0] = el}>
          <p className="quote">우리 두사람 이야기에 영감을 준 영화처럼</p>
          <div className="divider"></div>
          <p className="quote">사랑에 유통기한을 정해야 한다면,</p>
          <p className="quote">만 년으로 하고 싶다.</p>
          <p className="quote-left">- 영화 '중경삼림' -</p>
          <div className="divider"></div>
        </div>
        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="chevron"></div>
          <div className="chevron"></div>
        </div>
      </div>
      <div className="chungking-theme">
        <div className="card location-section" ref={el => sections.current[1] = el}>
          <div className="divider"></div>
          <h2>김진한 · 김수경</h2>
          <p className="date">2025년 12월 25일</p>
          <div className="divider"></div>
          <p className="invitation-message">
            저희 두 사람, 결혼합니다. 가족분들만 모시는 소규모 예식으로 소박하게 진행할 계획입니다. 직접 초대하여 인사드리지 못하는점 아쉽게 생각하고 있습니다. 이 글로나마 저희의 기쁨을 함께 나누고 축복해 주시면 감사하겠습니다.
          </p>
          <p className="invitation-message">부부 올림</p>        
        </div>

        <div className="card gallery-section" ref={el => sections.current[2] = el}>
          <h2>GALLERY</h2>
          <Slider {...settings}>
            <div><img src="./assets/couple1.jpg" alt="커플 사진 1" /></div>
            <div><img src="./assets/couple2.jpg" alt="커플 사진 2" /></div>
            <div><img src="./assets/couple3.jpg" alt="커플 사진 3" /></div>
            <div><img src="./assets/couple4.jpg" alt="커플 사진 4" /></div>
          </Slider>
        </div>

        <div className="card location-section" ref={el => sections.current[3] = el}>
          <h2>혼인 장소</h2>
          <p className="venue">후암거실</p>
          <p className="address">서울특별시 용산구 후암동 132-22</p>
          <p><a href="https://naver.me/FIf9vJPB" target="_blank" rel="noopener noreferrer" className="map-button">지도보기</a></p>
        </div>

        <div className="card contact-section" ref={el => sections.current[4] = el}>
          <h2>연락처</h2>
          <p>신랑 김진한: <a href="tel:010-1234-5678">010-4178-0430</a></p>
          <p>신부 김수경: <a href="tel:010-1234-5678">010-4441-5735</a></p>
        </div>

        <div 
          className="card guestbook-section" 
          ref={el => sections.current[5] = el}
          onClick={() => navigate('/guestbook')}
        >
          <div className="guestbook-icon">💖</div>
          <h3>당신의 한마디를 남겨주세요</h3>
          <p>소중한 분들의 축복이 우리의 행복이 됩니다</p>
          <div className="click-hint">
            <span>클릭하여 방명록 보기</span>
            <div className="arrow-container">
              <span className="arrow">→</span>
              <span className="arrow">→</span>
              <span className="arrow">→</span>
            </div>
          </div>
          
          <div className="floating-cta">
            <div className="cta-button">
              <span>방명록에 축복 남기기</span>
              <div className="button-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invitation;
