import Box from "./Box";
function ErrorMessage({ message }) {
  return (
    <Box>
      <p className="error">
        <span>❌</span> {message}
      </p>
    </Box>
  );
}

export default ErrorMessage;
