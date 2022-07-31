import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import ActionAreaCard from "../components/Card";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

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

const Search = ({ type, name }) => {
  const [videos, setVideos] = useState([]);

  const query = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
      console.log(res.data);
    };
    document.title = query.substring(3).split("%20").join(" ") + " - Youtube";
    fetchData();
  }, [query]);

  return (
    <Container>
      <Title>Tìm kiếm : {videos.length} kết quả</Title>
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
    </Container>
  );
};

export default Search;
