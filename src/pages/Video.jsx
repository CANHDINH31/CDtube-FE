import React from "react";
import styled from "styled-components";
import VideoPlayer from "../components/VideoPlayer";
import VideoRecommend from "../components/VideoRecommend";

const Container = styled.div`
  flex: 1;
  background-color: #fafafa;
  padding: 20px 20px;
  min-height: calc(100vh - 64px);
  display: flex;
  gap: 14px;
`;

const Video = () => {
  return (
    <Container>
      <VideoPlayer />
      <VideoRecommend />
    </Container>
  );
};

export default Video;
