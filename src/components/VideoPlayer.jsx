import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchSuccess } from "../redux/videoSlice";
import Comment from "./Comment";
import VideoDescription from "./VideoDescription";
import VideoFrame from "./VideoFrame";

const Container = styled.div`
  flex: 3;
`;

const VideoPlayer = () => {
  const [channel, setChannel] = useState({});
  const { currentVideo } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);

        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        document.title = videoRes.data.title;
      } catch (error) {}
    };
    fetchData();
  }, [path, dispatch]);

  return (
    <Container>
      <VideoFrame currentVideo={currentVideo} />
      <VideoDescription
        currentVideo={currentVideo}
        channel={channel}
        currentUser={currentUser}
      />
      <Comment currentVideo={currentVideo} currentUser={currentUser} />
    </Container>
  );
};

export default VideoPlayer;
