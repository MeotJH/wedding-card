import React, { useEffect } from 'react';
import './Rain.css';

const Rain = () => {
  useEffect(() => {
    const rainContainer = document.querySelector('.rain-container');

    let drops = '';
    for (let i = 0; i < 100; i++) {
      const left = Math.floor(Math.random() * window.innerWidth);
      const top = Math.floor(Math.random() * window.innerHeight * 2) - window.innerHeight;
      const animationDelay = Math.random() * -20;
      const animationDuration = Math.random() * 5 + 2;

      drops += `
        <div 
          class="drop" 
          style="left: ${left}px; top: ${top}px; animation-delay: ${animationDelay}s; animation-duration: ${animationDuration}s;"
        ></div>
      `;
    }

    if (rainContainer) {
        rainContainer.innerHTML = drops;
    }
  }, []);

  return <div className="rain-container"></div>;
};

export default Rain;
