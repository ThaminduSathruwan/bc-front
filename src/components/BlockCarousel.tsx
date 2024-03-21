import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Carousel.css';

interface CarouselProps {
  children: React.ReactNode;
}

const MAX_VISIBILITY = 3;

const BlockCarousel: React.FC<CarouselProps> = ({ children }) => {
  const [active, setActive] = useState(-1);
  const count = React.Children.count(children);
  
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
    <div className="carousel w-1/4" style={{"height": "100px"}}>
      {active > 0 && (
        <button className="nav left" onClick={() => setActive((i) => i - 1)}>
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
        <button className="nav right" onClick={() => setActive((i) => i + 1)}>
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default BlockCarousel;
