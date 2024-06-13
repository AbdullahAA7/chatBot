const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
        }}
      >
        <p
          style={{
            fontSize: "30px",
            textAlign: "center",
          }}
        >
          Created By{" "}
          <span style={{ color: "aqua", fontWeight: "bold" }}>
            Abdullah A.A
          </span>{" "}
          with ❤️
        </p>
      </div>
    </footer>
  );
};
export default Footer;
