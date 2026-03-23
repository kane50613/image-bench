import { Star } from "lucide-react";

export function Ecommerce() {
  const products = [
    {
      name: "Wireless Headphones",
      price: "$299.00",
      rating: "4.8",
      color: "#f87171",
    },
    {
      name: "Smart Fitness Watch",
      price: "$199.50",
      rating: "4.5",
      color: "#60a5fa",
    },
    {
      name: "Mechanical Keyboard",
      price: "$149.99",
      rating: "4.9",
      color: "#34d399",
    },
    {
      name: "Ultra HD Monitor",
      price: "$499.00",
      rating: "4.7",
      color: "#a78bfa",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#f3f4f6",
        padding: "24px",
        fontFamily: "'Geist', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          backgroundColor: "#ffffff",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <span style={{ fontSize: "24px", fontWeight: 700, color: "#111" }}>TechStore</span>
        <div style={{ display: "flex", gap: "16px" }}>
          <span style={{ fontSize: "16px", color: "#4b5563" }}>Categories</span>
          <span style={{ fontSize: "16px", color: "#4b5563" }}>Deals</span>
          <span style={{ fontSize: "16px", color: "#4b5563" }}>Cart (3)</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "16px",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {products.map((p) => (
          <div
            key={p.name}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "48%",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "160px",
                backgroundColor: p.color,
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1f2937",
                  marginBottom: "6px",
                }}
              >
                {p.name}
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: "#059669",
                    fontWeight: 700,
                  }}
                >
                  {p.price}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Star size={16} fill="currentColor" color="#fbbf24" />
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>{p.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
