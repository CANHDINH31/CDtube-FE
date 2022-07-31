import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.video`
  width: 100%;
  max-height: calc(100vh - 84px);
  display: flex;
  align-items: center;
`;

const VideoFrame = ({ currentVideo }) => {
  useEffect(() => {
    const addView = async () => {
      await axios.put(`/videos/view/${currentVideo?._id}`);
    };
    addView();
  }, [currentVideo?._id]);
  return (
    <Container
      controls
      allowFullScreen
      src={currentVideo?.videoUrl}
      autoPlay={true}
      loop={true}
    ></Container>
  );
};

export default VideoFrame;
