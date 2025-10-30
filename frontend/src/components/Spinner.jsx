import React from "react";

export default function Spinner({ size = 16, className = "" }) {
  const s = typeof size === 'number' ? `${size}px` : size;
  return (
    <span
      className={`inline-block border-2 border-white/50 border-t-white rounded-full animate-spin ${className}`}
      style={{ width: s, height: s }}
      aria-hidden="true"
    />
  );
}
