import { useEffect, useRef, useState } from "react";

// Sprite imports
import PixelIdle from "./sprite/PixelIdle";
import PixelRun from "./sprite/PixelRun";
import PixelJump from "./sprite/PixelJump";
import { getSprite } from "./sprite/SpriteController";

export default function Player({ x = 50, y = 50 }) {
  const spriteRef = useRef(null);

  // Player physics state
  const [state, setState] = useState({
    x,
    y,
    vx: 0,
    vy: 0,
    onGround: false,
  });

  const keys = useRef({
    left: false,
    right: false,
    jump: false,
  });

  // Movement constants
  const SPEED = 2.2;
  const JUMP_FORCE = -7;
  const GRAVITY = 0.35;
  const GROUND_Y = 300; // Temporary ground until we add tiles

  // Handle keyboard input
  useEffect(() => {
    const down = (e) => {
      if (e.key === "ArrowLeft") keys.current.left = true;
      if (e.key === "ArrowRight") keys.current.right = true;
      if (e.key === "ArrowUp") keys.current.jump = true;
    };

    const up = (e) => {
      if (e.key === "ArrowLeft") keys.current.left = false;
      if (e.key === "ArrowRight") keys.current.right = false;
      if (e.key === "ArrowUp") keys.current.jump = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Main physics + movement loop
  useEffect(() => {
    const loop = () => {
      setState((prev) => {
        let { x, y, vx, vy, onGround } = prev;

        // Horizontal movement
        if (keys.current.left) vx = -SPEED;
        else if (keys.current.right) vx = SPEED;
        else vx *= 0.8; // friction

        // Jumping
        if (keys.current.jump && onGround) {
          vy = JUMP_FORCE;
          onGround = false;
        }

        // Gravity
        vy += GRAVITY;

        // Apply physics
        x += vx;
        y += vy;

        // TEMPORARY ground collision
        if (y >= GROUND_Y) {
          y = GROUND_Y;
          vy = 0;
          onGround = true;
        }

        return { x, y, vx, vy, onGround };
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }, []);

  // Select correct sprite animation
  const SpriteComponent = {
    idle: PixelIdle,
    run: PixelRun,
    jump: PixelJump,
  }[getSprite(state)];

  return (
    <div
      ref={spriteRef}
      style={{
        position: "absolute",
        transform: `translate(${state.x}px, ${state.y}px)`,
        imageRendering: "pixelated",
        pointerEvents: "none",
      }}
    >
      <SpriteComponent />
    </div>
  );
}
