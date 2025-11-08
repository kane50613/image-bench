export function HelloWorld() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        fontSize: 32,
        fontWeight: 600,
        color: "white",
      }}
    >
      <svg
        width="75"
        viewBox="0 0 75 65"
        fill="white"
        style={{ margin: "0 75px" }}
      >
        <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
      </svg>
      <div style={{ marginTop: 40 }}>Hello, World</div>
    </div>
  );
}
