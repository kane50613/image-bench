export function AnalyticsDashboard() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      positive: true,
    },
    { title: "Active Users", value: "2,350", change: "+15.5%", positive: true },
    { title: "Bounce Rate", value: "42.3%", change: "-2.4%", positive: true },
    { title: "Server Load", value: "85%", change: "+12.2%", positive: false },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#f9fafb",
        padding: "24px",
        fontFamily: "'Geist', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            Overview
          </span>
          <span style={{ fontSize: "16px", color: "#6b7280" }}>
            Performance metrics for the last 30 days.
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        {metrics.map((m) => (
          <div
            key={m.title}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              {m.title}
            </span>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              {m.value}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: m.positive ? "#059669" : "#dc2626",
                }}
              >
                {m.change}
              </span>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "16px",
          }}
        >
          Audience Growth
        </span>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "flex-end",
            gap: "12px",
            height: "100%",
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const height = 20 + Math.sin(i * 0.5) * 40 + Math.random() * 30;
            return (
              <div
                key={`bar-key-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: there is no other indexes
                  i
                }`}
                style={{
                  display: "flex",
                  flex: 1,
                  height: `${height}%`,
                  backgroundColor: "#3b82f6",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                  opacity: 0.8 + Math.random() * 0.2,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
