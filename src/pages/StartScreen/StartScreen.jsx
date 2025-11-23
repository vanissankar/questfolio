import "./StartScreen.css";
import PixelTypewriter from "../../components/PixelTypewriter";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
  const navigate = useNavigate();

  const introText = `Welcome traveler...

I am Pixel Anis, the guardian of Questfolio.

Recruiters come here seeking the truth—
Can you overcome challenges?
Can you solve real problems?

If you are ready,
step forward and enter the Quest.`;

  return (
    <div className="start-screen crt">
      <div className="start-card pixel-glow">
        <PixelTypewriter text={introText} speed={30} />

        <button
          className="start-btn pixel-glow"
          onClick={() => navigate("/game")}
        >
          ENTER QUEST
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
