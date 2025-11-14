"use client";

export default function PDVLayout({ children }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {children}
    </div>
  );
}
