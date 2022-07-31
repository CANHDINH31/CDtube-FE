import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DetailComment from "./DetailComment";
import PostComment from "./PostComment";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../redux/commentSlice";

const Container = styled.div`
  margin-top: 20px;
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: #333;
  font-weight: 500;
`;

const CountCommnent = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 10px;
  color: #030303;
  font-weight: 400;
  font-size: 1.2rem;
`;
const GroupDetailComment = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const WrapButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const Comment = ({ currentVideo, currentUser }) => {
  const comments = useSelector((state) => state.comment.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/comments/${currentVideo?._id}`);
      dispatch(getComments(res.data));
    };
    fetchComments();
  }, [currentVideo?._id]);

  return (
    <Container>
      {!currentUser && <Message>Bạn cần đăng nhập để bình luận</Message>}
      <CountCommnent>
        {comments?.length ? comments?.length : "0"} bình luận
      </CountCommnent>
      {currentUser && <PostComment currentVideo={currentVideo} />}
      <GroupDetailComment>
        {comments?.map((comment) => (
          <DetailComment key={comment?._id} comment={comment} />
        ))}
      </GroupDetailComment>
      {/* <WrapButton>
        <Button variant="outlined">Hiển thị thêm</Button>
      </WrapButton> */}
      {/* // update later */}
    </Container>
  );
};

export default Comment;
