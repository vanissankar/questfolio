export function handleCollision(player, level) {
  // For now — simple ground
  const groundY = 300;

  if (player.y + player.vy >= groundY) {
    return {
      ...player,
      y: groundY,
      vy: 0,
      onGround: true,
    };
  }

  return player;
}
