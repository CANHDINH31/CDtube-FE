import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  postCommentFailure,
  startPostComment,
} from "../redux/commentSlice";
import axios from "axios";

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;
const ImgChannel = styled.img`
  object-fit: cover;
  object-position: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const InputWrapper = styled.div`
  flex: 1;
`;
const TextArea = styled.textarea`
  resize: none;
  padding: 4px 20px;
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 1px solid #909090;
  background-color: transparent;
  font-size: 14px;
  &:focus {
    border-bottom: 2px solid #333;
  }
`;

const GroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 6px;
`;

const PostComment = ({ currentVideo }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const textAreaRef = useRef();

  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handlePostComment = async () => {
    dispatch(startPostComment());
    try {
      await axios.post(`/comments`, {
        desc: content,
        videoId: currentVideo._id,
      });
      const res = await axios.get(`/comments/${currentVideo?._id}`);
      dispatch(getComments(res.data));
      setContent("");
      textAreaRef.current.focus();
    } catch (error) {
      dispatch(postCommentFailure());
    }
  };

  return (
    <Container>
      <ImgChannel src={currentUser?.img} />
      <InputWrapper>
        <TextArea
          ref={textAreaRef}
          placeholder="Viết bình luận ......"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <GroupButton>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => {
              setContent("");
              textAreaRef.current.focus();
            }}
          >
            Clear
          </Button>
          <Button variant="contained" size="small" onClick={handlePostComment}>
            Bình Luận
          </Button>
        </GroupButton>
      </InputWrapper>
    </Container>
  );
};

export default PostComment;
