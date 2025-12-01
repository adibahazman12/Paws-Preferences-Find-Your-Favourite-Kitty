import { useRef, useEffect, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";
import confetti from "canvas-confetti";

export default function CatCard({ cat, onSwipe, stackIndex }) {
  const cardRef = useRef();
  const [swipeEffect, setSwipeEffect] = useState(null); // 'right' or 'left'

  const [{ x, y, rotate }, api] = useSpring(() => ({
    x: 0,
    y: stackIndex * -5, // slight peek for stack
    rotate: 0,
  }));

  const bind = useDrag(
    ({ down, movement: [mx, my], last }) => {
      if (last) {
        if (mx > 100) {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
          setSwipeEffect("right");
          setTimeout(() => {
            setSwipeEffect(null);
            onSwipe("right");
          }, 300);
        } else if (mx < -100) {
          setSwipeEffect("left");
          setTimeout(() => {
            setSwipeEffect(null);
            onSwipe("left");
          }, 300);
        } else {
          api.start({ x: 0, y: stackIndex * -5, rotate: 0 });
        }
      } else {
        api.start({ x: down ? mx : 0, y: down ? my + stackIndex * -5 : stackIndex * -5, rotate: down ? mx / 10 : 0 });
      }
    }
  );

  const overlayStyle = {
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "60px",
    pointerEvents: "none",
  };

  return (
    <animated.div
      {...bind()}
      ref={cardRef}
      style={{
        x,
        y,
        rotate,
        backgroundImage: `url(${cat})`,
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
        touchAction: "none",
        cursor: "grab",
      }}
    >
      {swipeEffect && (
        <div style={{ ...overlayStyle, color: swipeEffect === "right" ? "green" : "red" }}>
          {swipeEffect === "right" ? "🎉" : "❌"}
        </div>
      )}
    </animated.div>
  );
}
