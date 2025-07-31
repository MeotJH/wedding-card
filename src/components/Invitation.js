import React, { useState, useEffect, useRef } from 'react';
import './Invitation.css';
import Slider from "react-slick";

const Invitation = () => {
  const sections = useRef([]);

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
    <div className="chungking-theme">
      {/* Main card combining info and message */}
      <div className="card main-card" ref={el => sections.current[0] = el}>
        <div className="divider"></div>
        <p className="quote">우리의 사랑에 유통기한을 정해야 한다면,</p>
        <p className="quote">만 년으로 하고 싶다.</p>
        <p className="quote-left">-중경삼림-</p>
        <div className="divider"></div>
      </div>
      <div className="card location-section" ref={el => sections.current[1] = el}>
        <div className="divider"></div>
        <h2>김진한 · 김수경</h2>
        <p className="date">2025년 12월 25일</p>
        <div className="divider"></div>
        <p className="invitation-message">
          저희 두 사람, 결혼합니다.<br/>
          친족분들만 모시는 소규모 예식으로 소박하게 진행할 계획입니다. <br/>
          직접 초대하여 인사드리지 못하는점 아쉽게 생각하고 있습니다. <br/>
          이 글로나마 저희의 기쁨을 함께 나누고 축복해 주시면 감사하겠습니다. <br/>
        </p>
        <p className="invitation-message">부부 배상(夫婦拜上)</p>        
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
        <a href="https://naver.me/FIf9vJPB" target="_blank" rel="noopener noreferrer" className="map-button">지도보기</a>
      </div>

      <div className="card contact-section" ref={el => sections.current[4] = el}>
        <h2>연락처</h2>
        <p>신랑: <a href="tel:010-1234-5678">010-1234-5678</a></p>
        <p>신부: <a href="tel:010-1234-5678">010-1234-5678</a></p>
      </div>

      <div className="card guestbook-section" ref={el => sections.current[5] = el}>
        <h2>축하 메시지 남기기</h2>
        <p>하객들이 축하 메시지를 남길 수 있는 공간</p>
      </div>
    </div>
  );
};

export default Invitation;