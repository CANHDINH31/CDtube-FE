import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CardMedia, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { convertTime, convertViewMethodA } from "../utils";

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

const Duration = styled.div``;

const Wrap = styled.div`
  object-fit: cover;
  object-position: center;
  display: flex;
  align-items: center;
  height: 90px;
  width: 140px;
  border-radius: 5px;
`;

const CardVideoRecommend = ({ video }) => {
  const [channel, setChannel] = useState({});
  const [duration, setDuration] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  useEffect(() => {
    const getDuration = () => {
      const media = new Audio(video.videoUrl);
      media.onloadedmetadata = function () {
        setDuration(convertTime(media.duration));
      };
    };
    getDuration();
  }, [video._id]);

  return (
    <Container>
      <Link to={`/video/${video._id}`}>
        <Wrap style={{ position: "relative" }}>
          <Duration
            style={{
              position: "absolute",
              bottom: "5px",
              right: "2px",
              color: "white",
              fontWeight: "400",
              fontSize: "12px",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "1px 2px",
              borderRadius: "2px",
            }}
          >
            {duration}
          </Duration>

          <CardMedia
            component="img"
            src={video.imgUrl}
            className={classes.img}
            sx={{ objectFit: "cover", objectPosition: "center" }}
          />
        </Wrap>
      </Link>

      <Description>
        <Link to={`/video/${video._id}`}>
          <Typography
            sx={{
              fontSize: "0.9rem",
              minHeight: "1.8rem",
              color: "#333",
              fontWeight: "700",
            }}
            className={classes.title}
          >
            {video.title}
          </Typography>
        </Link>
        <Link to={`/channel/${channel._id}`}>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <CardMedia
              component="img"
              src={channel.img}
              sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Typography sx={{ color: "#999", fontSize: "12px" }}>
              {channel.name}
            </Typography>
          </Box>
        </Link>

        <Typography sx={{ color: "#999", fontSize: "12px" }}>
          {convertViewMethodA(video.views)} lượt xem - {format(video.createdAt)}
        </Typography>
      </Description>
    </Container>
  );
};

export default CardVideoRecommend;

const useStyles = makeStyles({
  img: {
    objectFit: "contain",
    width: "140px",
    height: "90px",
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
});
