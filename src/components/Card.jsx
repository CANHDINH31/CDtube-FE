import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { format } from "timeago.js";
import { convertTime, convertViewMethodA } from "../utils";
import styled from "styled-components";

const Duration = styled.div``;

export default function ActionAreaCard({ type, video }) {
  const classes = useStyles();

  const [channel, setChannel] = useState({});
  const [duaration, setDuration] = useState("");
  useEffect(() => {
    const getDuration = () => {
      const media = new Audio(video?.videoUrl);
      media.onloadedmetadata = function () {
        setDuration(convertTime(media.duration));
      };
    };
    getDuration();
  }, [video?._id]);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video?.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video?.userId]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "10px",
      }}
    >
      <CardActionArea sx={{ position: "relative" }}>
        <Duration
          style={{
            position: "absolute",
            top: "10px",
            right: "5px",
            color: "white",
            fontWeight: "500",
            fontSize: "14px",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "1px 2px",
            borderRadius: "2px",
          }}
        >
          {duaration}
        </Duration>
        <CardMedia
          component="img"
          height="140"
          width="100%"
          image={video?.imgUrl}
          alt="green iguana"
          className={classes.imgCard}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <CardContent className={classes.cardContent}>
          <CardMedia
            component="img"
            image={channel.img}
            alt="green iguana"
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <Box>
            <Typography
              className={classes.title}
              sx={{
                fontSize: "0.9rem",
                color: "#030303",
                fontWeight: "500",
              }}
            >
              {video?.title}
            </Typography>
            {type === "channel" ? (
              <></>
            ) : (
              <Typography variant="body2" className={classes.author}>
                {channel.name}
              </Typography>
            )}

            <Typography variant="body2" className={classes.view}>
              {convertViewMethodA(video?.views)} lượt xem -{" "}
              {format(video?.createdAt)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles({
  imgCard: {
    height: 203,
  },
  cardContent: {
    display: "flex",
    gap: 10,
  },

  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 1,
    "line-clamp": 1,
    "-webkit-box-orient": "vertical",
  },

  author: {
    color: "#606060",
  },
  view: {
    color: "#606060",
  },
});
