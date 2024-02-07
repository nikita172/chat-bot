import React, { useEffect, useRef } from 'react';
import check from "../../assets/images/check.svg"
import './scrollAnimation.css'; // Import your CSS file for styling

const ScrollAnimation = ({ data }) => {
  const elementsRef = useRef([]);
  useEffect(() => {
    const handleScroll = () => {
      elementsRef.current.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const middleOfPage = windowHeight / 1.5;

        if (elementPosition < middleOfPage) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='scrollAnimation'>
      <div ref={(el) => (elementsRef.current[0] = el)} className="hidden">
        <img src={check} />
        <p dangerouslySetInnerHTML={{ __html: data[0] }} />

      </div>
      <div ref={(el) => (elementsRef.current[1] = el)} className="hidden">
        <img src={check} />
        <p dangerouslySetInnerHTML={{ __html: data[1] }} />
      </div>
      <div ref={(el) => (elementsRef.current[2] = el)} className="hidden">
        <img src={check} />
        <p dangerouslySetInnerHTML={{ __html: data[2] }} />
      </div>
    </div>
  );
};

export default ScrollAnimation;
