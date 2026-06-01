import React from "react";

export type Product = {
  name: string;
  price: string;
  status: "DISPONÍVEL" | "INDISPONÍVEL";
  img: string;
};

export default function ProductCard({ name, price, status, img }: Product) {
  const available = status === "DISPONÍVEL";

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "45px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)")}
    >
      <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
        <img src={img} alt={name} style={{ maxHeight: "100%", objectFit: "contain" }} />
      </div>

      <h3 style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a1a", marginBottom: "8px", lineHeight: 1.3 }}>
        {name}
      </h3>

      <p style={{ fontWeight: 900, fontSize: "20px", color: "#1a1a1a", marginBottom: "8px" }}>
        {price}
      </p>

      <span style={{
        fontSize: "11px",
        fontWeight: 900,
        letterSpacing: "0.15em",
        color: available ? "#CCFF00" : "#ef4444",
      }}>
        {status}
      </span>
    </div>
  );
}