import React, { useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { dislike, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { convertViewMethodB } from "../utils";
import ShareModal from "./ShareModal";
const Container = styled.div`
  margin-top: 10px;
`;
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #030303;
`;
const Info = styled.div`
  margin-top: 6px;
  font-size: 0.9rem;
  color: rgba(3, 3, 3, 0.9);
  font-weight: 600;
`;

const Desc = styled.textarea`
  width: 100%;
  margin-top: 6px;
  font-size: 0.9rem;
  letter-spacing: 0.0025rem;
  color: rgba(3, 3, 3, 0.6);
  text-align: justify;
  font-weight: 500;
  overflow: hidden;
  outline: none;
  border: none;
  resize: none;
  background-color: transparent;
`;

const More = styled.div`
  margin-top: 6px;
  font-size: 0.9rem;
  color: rgba(3, 3, 3, 0.9);
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #00a1d6;
  }
`;
const Icon = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 60px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: rgba(3, 3, 3, 0.9);
  cursor: pointer;
`;

const Subscribe = styled.div`
  margin-top: 24px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: max-content;
  padding: 6px 12px;
  border-radius: 4px;
  gap: 100px;
`;
const WrapperDesc = styled.div`
  display: flex;
  gap: 10px;
`;
const DescSub = styled.div``;
const TitleChannel = styled.div`
  font-size: 0.9rem;
  color: rgba(3, 3, 3, 0.9);
  font-weight: 600;
`;
const CounterSub = styled.div`
  font-size: 0.8rem;
  color: rgba(3, 3, 3, 0.9);
`;
const ChannelImage = styled.img`
  object-fit: cover;
  object-position: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const VideoDescription = ({ currentVideo, channel, currentUser }) => {
  const [viewMore, setViewMore] = useState(true);
  const [isOpenModalShare, setIsOpenModalShare] = useState(false);

  const isLike = currentVideo?.likes.includes(currentUser?._id);
  const isDislike = currentVideo?.dislikes.includes(currentUser?._id);

  const dispatch = useDispatch();

  const hanldeLike = async () => {
    if (currentUser?._id) {
      await axios.post(`/users/like/${currentVideo?._id}`, {
        isLike,
        isDislike,
      });
      dispatch(like(currentUser._id));
    } else {
      alert("Bạn cần đăng nhập để like video");
    }
  };
  const hanldeDisLike = async () => {
    if (currentUser?._id) {
      await axios.post(`/users/dislike/${currentVideo?._id}`, {
        isLike,
        isDislike,
      });
      dispatch(dislike(currentUser._id));
    } else {
      alert("Bạn cần đăng nhập để dislike video");
    }
  };

  const handleSub = async () => {
    if (currentUser?._id) {
      currentUser?.subscribedUsers.includes(channel?._id)
        ? await axios.put(`/users/unsub/${channel?._id}`)
        : await axios.put(`/users/sub/${channel?._id}`);

      dispatch(subscription(channel?._id));
    } else {
      alert("Bạn cần đăng nhập để đăng kí kênh");
    }
  };

  const handleShare = () => {
    setIsOpenModalShare(true);
  };
  return (
    <Container>
      <Title>{currentVideo?.title}</Title>
      <Info>
        {convertViewMethodB(currentVideo?.views)} lượt xem &nbsp; &nbsp;{" "}
        {format(currentVideo?.createdAt)} &nbsp; &nbsp;★ CDTube Entertainment
      </Info>

      <Desc
        rows={!viewMore ? currentVideo?.desc.match(/\n/g)?.length + 1 : 2}
        disabled
        value={currentVideo?.desc}
      ></Desc>
      {currentVideo?.desc.match(/\n/g)?.length + 1 > 2 && (
        <More onClick={() => setViewMore(!viewMore)}>
          {viewMore ? "Xem thêm" : "Rút gọn"}
        </More>
      )}

      <Icon>
        <Item onClick={hanldeLike}>
          {currentVideo?.likes.includes(currentUser?._id) ? (
            <ThumbUpIcon />
          ) : (
            <ThumbUpOutlinedIcon />
          )}
          {currentVideo?.likes?.length > 1
            ? currentVideo?.likes?.length + " likes"
            : currentVideo?.likes?.length + " like"}
        </Item>
        <Item onClick={hanldeDisLike}>
          {currentVideo?.dislikes.includes(currentUser?._id) ? (
            <ThumbDownIcon />
          ) : (
            <ThumbDownOffAltOutlinedIcon />
          )}

          {currentVideo?.dislikes?.length > 1
            ? currentVideo?.dislikes?.length + " dislikes"
            : currentVideo?.dislikes?.length + " dislike"}
        </Item>
        <Item onClick={handleShare}>
          <ShareOutlinedIcon />
          Share
        </Item>
      </Icon>
      <Subscribe>
        <WrapperDesc>
          <ChannelImage src={channel.img} />
          <DescSub>
            <Link to={`/channel/${channel._id}`}>
              <TitleChannel>{channel.name}</TitleChannel>
            </Link>
            <CounterSub>
              {convertViewMethodB(channel.subscribers)} Subscribers
            </CounterSub>
          </DescSub>
        </WrapperDesc>
        <Button
          variant="contained"
          size="medium"
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
      </Subscribe>

      {isOpenModalShare && (
        <ShareModal setIsOpenModalShare={setIsOpenModalShare} />
      )}
    </Container>
  );
};

export default VideoDescription;
