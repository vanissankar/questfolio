import { useEffect, useState } from "react";

export default function useKeyboard() {
  const [keys, setKeys] = useState({
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    const handleDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") setKeys((k) => ({ ...k, left: true }));
      if (e.key === "ArrowRight" || e.key === "d") setKeys((k) => ({ ...k, right: true }));
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") setKeys((k) => ({ ...k, jump: true }));
    };

    const handleUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") setKeys((k) => ({ ...k, left: false }));
      if (e.key === "ArrowRight" || e.key === "d") setKeys((k) => ({ ...k, right: false }));
      if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") setKeys((k) => ({ ...k, jump: false }));
    };

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return keys;
}
