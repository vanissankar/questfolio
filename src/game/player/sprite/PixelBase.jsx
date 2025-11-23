export default function PixelBase({ pixels, scale = 4 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(12, ${scale}px)`,
        gridTemplateRows: `repeat(12, ${scale}px)`,
        width: 12 * scale,
        height: 12 * scale,
        imageRendering: "pixelated",
      }}
    >
      {pixels.map((c, i) => (
        <div key={i} style={{ background: c || "transparent" }} />
      ))}
    </div>
  );
}
