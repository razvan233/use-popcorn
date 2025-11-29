import InfoAttribute from "./InfoAttribute";

function MovieInfo({ infos }) {
  return (
    <div>
      {infos?.map((info, index) => (
        <InfoAttribute key={index} info={info} />
      ))}
    </div>
  );
}

export default MovieInfo;
