import { TILE_SIZE } from "../constants";
import level1 from "./level1";

export default function TileRenderer() {
  return (
    <>
      {level1.map((row, r) =>
        row.split("").map((c, cIndex) => {
          if (c === ".") return null;

          return (
            <div
              key={r + "-" + cIndex}
              style={{
                position: "absolute",
                left: cIndex * TILE_SIZE,
                top: r * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                background: "#3a2a0f",
                border: "2px solid #2b1c08",
                boxSizing: "border-box",
              }}
            />
          );
        })
      )}
    </>
  );
}
