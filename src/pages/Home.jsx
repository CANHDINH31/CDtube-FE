import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import ActionAreaCard from "../components/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import { filterUnique } from "../utils";

const Container = styled.div`
  flex: 1;
  background-color: #fafafa;
  padding: 20px 80px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  padding-bottom: 10px;
`;

const Hr = styled.div`
  border: 1px solid #eeeeee;
  margin-bottom: 20px;
`;

const Home = ({ type, name }) => {
  const buttonRef = useRef();
  const [videos, setVideos] = useState([]);
  const [count, setCount] = useState(0);

  const handleLoadMore = () => {
    if (videos?.length < count) {
      const fetchData = async () => {
        const res = await axios.get(`/videos/${type}`);
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
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data.videos);
      setCount(res.data.count);
      document.title = name;
    };
    fetchData();
  }, [type]);

  return (
    <Container>
      <Title>{name}</Title>
      <Hr />
      <Grid container spacing={4}>
        {videos?.map((video, index) => (
          <Grid key={index} item xs={4}>
            <Link to={`/video/${video._id}`}>
              <ActionAreaCard video={video} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <div ref={buttonRef} onClick={handleLoadMore} style={{ display: "none" }}>
        LoadMore
      </div>
    </Container>
  );
};

export default Home;
