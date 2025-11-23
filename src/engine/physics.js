export function applyPhysics(player, keys, constants) {
  let { x, y, vx, vy, onGround } = player;
  const { speed, jumpForce, gravity, friction } = constants;

  // Horizontal movement
  if (keys.left) vx = -speed;
  else if (keys.right) vx = speed;
  else vx *= friction;

  // Jump
  if (keys.jump && onGround) {
    vy = -jumpForce;
    onGround = false;
  }

  // Gravity always applies unless antigravity mode
  vy += gravity;

  return { x, y, vx, vy, onGround };
}
