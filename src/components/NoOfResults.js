function NoOfResults({ moviesLength }) {
  return (
    <p className="num-results">
      Found <strong>{moviesLength}</strong> results
    </p>
  );
}

export default NoOfResults;
