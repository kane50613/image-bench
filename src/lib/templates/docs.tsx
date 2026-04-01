const primaryColor = "#00689c";
const primaryTextColor = "#ffffff";
const site = "image-bench.kane.tw";
const title = "Image Bench";
const description = "Image Bench is a site for showcasing different image rendering tools.";
const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={40} height={40}>
    <defs>
      <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="59.7" y1="8.6" x2="59.7" y2="128">
        <stop offset="0" stop-color="#ffa944" />
        <stop offset="1" stop-color="#f30" />
      </linearGradient>
      <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="90.7" y1="0" x2="90.7" y2="73.7">
        <stop offset="0" stop-color="#ff3535" />
        <stop offset="1" stop-color="#d71d36" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      d="M114.3 14.1c1.1.9 3.2 2.7 4.2 4.5s.9 3.5.8 4.8-.4 2.3-2 4.3c-1.7 2-4.7 5-12.8 13.7-8.1 8.8-21.4 23.4-35.3 38.4s-28.6 30.5-36.4 38.7-8.8 8.8-10 9.2-2.5.4-4.1 0-3.5-1.2-6.5-3.8-7.1-6.9-9.4-10S.1 108.8.1 107c0-1.7.4-3.4 5.3-8.6s14.3-13.9 30.5-28.9c16.1-14.9 39-36.1 51-47.2s13.2-12 14.7-12.7 3.2-1.1 4.8-.9 2.8 1 3.9 1.9a32 32 0 0 1 2.5 2.1l.4.5z"
    />
    <path
      fill="url(#b)"
      d="M79 .5C65.3 3.1 46.9 23.4 56.8 36.3c3.3 4.3 5.1 6.7 9.3 9.7 10.2 7.3 39.1 31 53.1 26.9 12-3.5 9.4-16.9 5.6-25.8-1.3-3-25.7-52.8-45.8-46.6"
    />
  </svg>
);

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
              color: "#c2c2c2",
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
