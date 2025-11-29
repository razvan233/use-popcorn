function InfoAttribute({ info }) {
  return (
    <p>
      <span>{info.emoji}</span>
      <span>{info.value}</span>
    </p>
  );
}

export default InfoAttribute;
