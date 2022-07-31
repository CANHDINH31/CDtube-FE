import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";
import ActionAreaCard from "../components/Card";
import Button from "@mui/material/Button";
import axios from "axios";
import { convertViewMethodB } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { subscription } from "../redux/userSlice";
import { filterUnique } from "../utils";

const Container = styled.div`
  flex: 1;
  background-color: #fafafa;
  padding: 40px 80px;
`;

const ChannelHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LeftChannel = styled.div`
  display: flex;
  gap: 20px;
`;
const ImgChannel = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 50%;
`;
const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const NameChannel = styled.div`
  font-size: 24px;
  color: #333;
  font-weight: 700;
`;

const InteractInfo = styled.div`
  display: flex;
`;
const SubInfo = styled.div`
  font-size: 14px;
  color: #999;
  padding-right: 10px;
  border-right: 1px solid #999;
`;
const LikeInfo = styled.div`
  font-size: 14px;
  color: #999;
  padding-left: 10px;
  padding-right: 10px;
  border-right: 1px solid #999;
`;

const ViewInfo = styled(LikeInfo)`
  border-right: unset;
`;

const RightChannel = styled.div``;

const Title = styled.div`
  margin-top: 80px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  padding-bottom: 10px;
`;

const Hr = styled.div`
  border: 1px solid #eeeeee;
  margin-bottom: 20px;
`;
const LoadMore = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Channel = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const buttonRef = useRef();

  const [channel, setChannel] = useState("");
  const [videos, setVideos] = useState([]);
  const [count, setCount] = useState(0);

  const path = useLocation().pathname.split("/")[2];

  const dispatch = useDispatch();

  const handleSub = async () => {
    currentUser?.subscribedUsers.includes(channel?._id)
      ? await axios.put(`/users/unsub/${channel?._id}`)
      : await axios.put(`/users/sub/${channel?._id}`);

    dispatch(subscription(channel?._id));
  };

  const handleLoadMore = () => {
    if (videos?.length < count) {
      const fetchData = async () => {
        const res = await axios.get(`/videos/video-channel/${channel._id}`);
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
    const fetchData = async () => {
      const resChannel = await axios.get(`/users/find/${path}`);
      const resVideos = await axios.get(
        `/videos/video-channel/${resChannel.data._id}`
      );
      setVideos(resVideos.data.videos);
      setChannel(resChannel.data);
      setCount(resVideos.data.count);
      document.title = resChannel.data.name + " - CDtube";
    };
    fetchData();
  }, [path]);

  return (
    <Container>
      <ChannelHeader>
        <LeftChannel>
          <ImgChannel
            src={channel.img}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <ChannelInfo>
            <NameChannel>{channel.name}</NameChannel>
            <InteractInfo>
              <SubInfo>
                <span style={{ color: "#333", fontWeight: "500" }}>
                  {convertViewMethodB(channel.subscribers)}
                </span>{" "}
                Người đăng kí
              </SubInfo>
              <LikeInfo>
                <span style={{ color: "#333", fontWeight: "500" }}>
                  {convertViewMethodB(channel.totalLikes)}
                </span>{" "}
                Lượt yêu thích
              </LikeInfo>
              <ViewInfo>
                <span style={{ color: "#333", fontWeight: "500" }}>
                  {convertViewMethodB(channel.totalViews)}
                </span>{" "}
                Lượt xem
              </ViewInfo>
            </InteractInfo>
          </ChannelInfo>
        </LeftChannel>
        <RightChannel>
          <Button
            variant="contained"
            size="large"
            sx={{ borderRadius: "20px" }}
            color={
              currentUser?.subscribedUsers?.includes(channel?._id)
                ? "success"
                : "primary"
            }
            onClick={handleSub}
          >
            {currentUser?.subscribedUsers?.includes(channel?._id)
              ? "Đã đăng kí"
              : "Đăng kí"}
          </Button>
        </RightChannel>
      </ChannelHeader>
      <Title>Video</Title>
      <Hr />
      <Grid container spacing={4}>
        {videos?.map((video) => (
          <Grid item xs={4} key={video._id}>
            <Link to={`/video/${video._id}`}>
              <ActionAreaCard type="channel" video={video} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <LoadMore>
        <Button
          variant="outlined"
          size="large"
          onClick={handleLoadMore}
          sx={{ display: "none" }}
          ref={buttonRef}
        >
          Hiển thị thêm
        </Button>
      </LoadMore>
    </Container>
  );
};

export default Channel;
