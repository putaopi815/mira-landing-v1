/** 1px 竖线，上下透明渐隐 */
export function VerticalFadeDivider() {
  return (
    <div
      style={{
        width: "1px",
        alignSelf: "stretch",
        minHeight: "100%",
        justifySelf: "center",
        background:
          "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22) 50%, transparent)",
      }}
      aria-hidden
    />
  );
}
