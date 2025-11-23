export function getSprite(state) {
  if (!state.onGround) return "jump";
  if (Math.abs(state.vx) > 1) return "run";
  return "idle";
}
