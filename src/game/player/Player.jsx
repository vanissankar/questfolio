import { useEffect, useRef, useState } from "react";

// Sprite components
import PixelIdle from "./sprite/PixelIdle";
import PixelRun from "./sprite/PixelRun";
import PixelJump from "./sprite/PixelJump";
import { getSprite } from "./sprite/SpriteController";

// Collision engine
import { resolveCollision } from "../engine/collision";

export default function Player({ startX = 50, startY = 50 }) {
  const spriteRef = useRef(null);

  // Player state (position, velocity, grounded)
  const [state, setState] = useState({
    x: startX,
    y: startY,
    vx: 0,
    vy: 0,
    onGround: false,
  });

  // Input tracking
  const keys = useRef({
    left: false,
    right: false,
    jump: false,
  });

  // Movement physics constants
  const SPEED = 2.4;
  const JUMP_FORCE = -7.5;
  const GRAVITY = 0.35;

  // Input handler
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

  // Main update loop
  useEffect(() => {
    const loop = () => {
      setState((prev) => {
        let { x, y, vx, vy, onGround } = prev;

        // Left / right
        if (keys.current.left) vx = -SPEED;
        else if (keys.current.right) vx = SPEED;
        else vx *= 0.8; // friction

        // Jump
        if (keys.current.jump && onGround) {
          vy = JUMP_FORCE;
          onGround = false;
        }

        // Apply gravity
        vy += GRAVITY;

        // Perform tile collision
        return resolveCollision({
          x,
          y,
          vx,
          vy,
          onGround,
        });
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }, []);

  // Select appropriate sprite based on state
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
