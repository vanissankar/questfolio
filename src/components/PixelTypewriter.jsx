import { useState, useEffect, useRef } from "react";

const PixelTypewriter = ({ text = "", speed = 40 }) => {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);   // DOES NOT RESET ON RE-RENDER
  const intervalRef = useRef(null);

  console.log("TEXT RECEIVED:", text);

  useEffect(() => {
    // Reset correctly when text changes
    setDisplayed("");
    indexRef.current = 0;

    intervalRef.current = setInterval(() => {
      const i = indexRef.current;

      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        indexRef.current += 1;
      } else {
        clearInterval(intervalRef.current);
      }
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, speed]);

  return (
    <p style={{ fontFamily: "monospace", whiteSpace: "pre-line" }}>
      {displayed}
    </p>
  );
};

export default PixelTypewriter;
