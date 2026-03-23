import { Globe2 } from "lucide-react";

const primaryColor = "#93C0A4";
const primaryTextColor = "#ffffff";
const site = "image-bench.kane.tw";
const title = "Image Bench";
const description = "Image Bench is a site for showcasing different image rendering tools.";
const icon = <Globe2 color="white" />;

export default function Docs() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#050505",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        color: "white",
        backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, transparent)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "60px",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            marginBottom: "40px",
            textWrap: "pretty",
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "white",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: "95%",
              letterSpacing: "-0.01em",
              lineClamp: 2,
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {description}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {icon}
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "white",
              opacity: 0.9,
            }}
          >
            {site}
          </span>
          <div style={{ flexGrow: 1 }} />
          <div
            style={{
              height: 4,
              width: 40,
              backgroundColor: primaryColor,
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: primaryTextColor,
              opacity: 0.8,
            }}
          >
            Documentation
          </span>
        </div>
      </div>
    </div>
  );
}
