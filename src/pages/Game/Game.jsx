import Player from "../../game/player/Player";
import TileRenderer from "../../game/level/TileRenderer";
import "./Game.css";

export default function Game() {
  return (
    <div className="game-container">
      <TileRenderer />
      <Player />
    </div>
  );
}
