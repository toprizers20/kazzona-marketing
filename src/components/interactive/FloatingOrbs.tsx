"use client";

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 300,
          height: 300,
          left: "10%",
          top: "20%",
          background: "rgba(252,74,26,0.06)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          left: "80%",
          top: "10%",
          background: "rgba(247,183,51,0.04)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 250,
          height: 250,
          left: "70%",
          top: "60%",
          background: "rgba(252,74,26,0.04)",
        }}
      />
    </div>
  );
}
