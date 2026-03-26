export function SocialPost() {
  const posts = [
    {
      user: "Sarah Jenkins",
      handle: "@sjenkins",
      time: "2h",
      content:
        "Just deployed our new rendering pipeline! The performance gains are absolutely incredible. Seeing a 40% reduction in TTFB across all endpoints.",
      likes: "1.2K",
      comments: "34",
      showIcons: true,
    },
    {
      user: "Mike Chen",
      handle: "@mike_codes",
      time: "4h",
      content:
        "Is anyone else obsessed with how clean the Satori APIs are? Moving our open graph image generation to Edge has been a game changer for our latency.",
      likes: "856",
      comments: "12",
    },
    {
      user: "Design Daily",
      handle: "@designdaily",
      time: "7h",
      content:
        "Remember to check your contrast ratios! Accessibility isn't an afterthought, it's a fundamental part of good software design.",
      likes: "4.5K",
      comments: "128",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#15202b",
        padding: "40px",
        fontFamily: "'Geist', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          flex: 1,
        }}
      >
        {posts.map((post, i) => (
          <div
            key={post.user}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#192734",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid #38444d",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "28px",
                  backgroundColor: `hsl(${i * 60 + 200}, 70%, 50%)`,
                  marginRight: "16px",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {post.user}
                </span>
                <span style={{ fontSize: "18px", color: "#8899a6" }}>
                  {post.handle} · {post.time}
                </span>
              </div>
            </div>

            <span
              style={{
                fontSize: "22px",
                color: "#ffffff",
                lineHeight: "1.5",
                marginBottom: "20px",
                whiteSpace: "pre-wrap",
              }}
            >
              {post.content}
              {post.showIcons && " 🚀🔥"}
            </span>

            <div style={{ display: "flex", gap: 24, color: "#8899a6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                💬<span style={{ fontSize: "18px" }}>{post.comments}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                🔁
                <span style={{ fontSize: "18px" }}>
                  {Math.floor(Number.parseInt(post.likes, 10) / 4)}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                ❤️
                <span style={{ fontSize: "18px" }}>{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
