import { TILE_SIZE } from "../constants";
import level1 from "../level/level1";

export function isSolidTileAt(x, y) {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);

  if (row < 0 || row >= level1.length) return false;
  if (col < 0 || col >= level1[0].length) return false;

  return level1[row][col] === "G"; // ground tile
}

export function resolveCollision(state) {
  let { x, y, vx, vy, onGround } = state;

  // Horizontal
  if (vx > 0) {
    if (isSolidTileAt(x + 12, y + 6)) vx = 0;
  } else if (vx < 0) {
    if (isSolidTileAt(x, y + 6)) vx = 0;
  }

  // Apply X
  x += vx;

  // Vertical
  if (vy > 0) {
    if (isSolidTileAt(x + 6, y + 12)) {
      vy = 0;
      onGround = true;
    }
  } else if (vy < 0) {
    if (isSolidTileAt(x + 6, y)) {
      vy = 0;
    }
  }

  // Apply Y
  y += vy;

  return { x, y, vx, vy, onGround };
}
