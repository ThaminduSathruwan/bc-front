import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import useScreenWidth from './useScreenWidth';
import './Carousel.css';

interface CarouselProps {
  children: React.ReactNode;
}

const BlockCarousel: React.FC<CarouselProps> = ({ children }) => {
  const [active, setActive] = useState(-1);
  const count = React.Children.count(children);
  const screenWidth = useScreenWidth();
  
  const MAX_VISIBILITY = screenWidth > 768 ? 3 : 1;
  
  useEffect(() => {
    setActive((prevActive) => {
      if (prevActive === -1 && count >= 1) {
        return count - 1;
      }
      else if (prevActive === count - 2 && count > 1) {
        return count - 1;
      }
      return prevActive;
    });
  } , [count]);

  return (
    <div className="carousel md:w-80 lg:w-80 w-40 lg:h-60 md:h-60 h-40">
      {active > 0 && (
        <button className="nav left md:text-lg lg:text-lg text-xs" onClick={() => setActive((i) => i - 1)}>
          <FaArrowLeft />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={({
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            "pointer-events": active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block"
          } as React.CSSProperties)}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className="nav right md:text-lg lg:text-lg text-xs" onClick={() => setActive((i) => i + 1)}>
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default BlockCarousel;
