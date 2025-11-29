import { useState } from "react";
import PropTypes from "prop-types";

import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};
const startContainerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

function StarRating({
  maxRating = 10,
  color = "#fcc419",
  size = 48,
  defaultRating = 0,
  onSetRating = () => {},
}) {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [hoverEnabled, setHoverEnabled] = useState(true);

  const ratingStyle = {
    fontSize: `${size / 1.5}px`,
    lineHeight: "1px",
    margin: 0,
    color,
  };

  const onStarClick = (index) => {
    if (rating === index) {
      setHoverEnabled(false);
      setHoverRating(0);
    }
    setRating((prevIndex) => (prevIndex === index ? 0 : index));
    onSetRating((prevIndex) => (prevIndex === index ? 0 : index));
  };

  const onStarHover = (index) => {
    if (!hoverEnabled) return;
    setHoverRating(index);
  };
  const enableHover = () => {
    if (hoverEnabled) return;
    setHoverEnabled(true);
  };

  return (
    <div style={containerStyle} onMouseOver={enableHover}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            handleStarClick={() => onStarClick(i + 1)}
            handleStarHover={() => onStarHover(i + 1)}
            resetHoverRating={() => setHoverRating(0)}
            fullStar={hoverRating ? hoverRating > i : rating > i}
            color={color}
            size={size}
          >
            {i + 1}
          </Star>
        ))}
      </div>
      <p style={ratingStyle}>{hoverRating ? hoverRating : rating || 0}</p>
    </div>
  );
}

export default StarRating;
