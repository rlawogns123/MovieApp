import React from "react";
import ReactPlayer from "react-player";

import styled from "styled-components";

type TrailerProps = {
  trailerKey: string;
  open: string | boolean;
  onClose: () => void;
};

const TrailerModal = ({ trailerKey, open, onClose }: TrailerProps) => {
  if (!open) return null;
  return (
    <div onClick={onClose}>
      <div className="modalContainer">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width="100%"
          height="100%"
          playing
          controls
        />
      </div>
    </div>
  );
};

export default TrailerModal;
