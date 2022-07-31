import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CardVideoRecommend from "./CardVideoRecommend";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { filterUnique } from "../utils";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  color: #333;
`;
const VideoRecommend = () => {
  const [videos, setVideos] = useState();
  const [count, setCount] = useState(0);

  const buttonRef = useRef();

  const currentVideo = useSelector((state) => state.video.currentVideo);

  const handleLoadMore = () => {
    if (videos?.length < count) {
      const fetchData = async () => {
        const res = await axios.get("/videos/recommend");
        const result = [...videos, ...res.data.videos];
        setVideos(filterUnique(result));
      };
      fetchData();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        buttonRef.current.click();
      }
    };
    window.addEventListener("scroll", handleScroll);

    // cleanup function

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      const resVideo = await axios.get("/videos/recommend");
      const data = resVideo.data.videos.filter(
        (video) => video._id !== currentVideo._id
      );
      setVideos(data);
      setCount(resVideo.data.count);
    };
    fetchVideos();
  }, [currentVideo]);

  return (
    <Container>
      <Title>Đề xuất cho bạn</Title>
      {videos?.map((video) => (
        <CardVideoRecommend key={video._id} video={video} />
      ))}

      <Button
        variant="outlined"
        sx={{ display: "none" }}
        onClick={handleLoadMore}
        ref={buttonRef}
      >
        Hiển thị thêm
      </Button>
    </Container>
  );
};

export default VideoRecommend;
