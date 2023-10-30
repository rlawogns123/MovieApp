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
    <ModalWrapper onClick={onClose}>
      <Player>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width="100%"
          height="100%"
          playing
          controls
        />
      </Player>
    </ModalWrapper>
  );
};

export default TrailerModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Player = styled.div`
  position: absolute;
  top: 52%;
  left: 50%;
  height: 800px;
  width: 100%;
  max-width: 1100px;
  transform: translate(-50%, -50%);
`;
