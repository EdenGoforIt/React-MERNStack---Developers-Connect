import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

export default () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style}>
      <BeatLoader color={"#36D7B7"} />
    </div>
  );
};
