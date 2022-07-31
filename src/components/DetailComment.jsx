import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
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
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;
const WrapHeader = styled.div`
  display: flex;
  gap: 20px;
`;
const Name = styled.div`
  font-weight: 600;
  color: #030303;
  font-size: 0.9rem;
`;
const Date = styled.div`
  color: rgba(3, 3, 3, 0.6);
  font-size: 0.9rem;
`;
const Comment = styled.textarea`
  color: #030303;
  font-size: 0.9rem;
  background-color: transparent;
  resize: none;
  border: none;
  outline: none;
`;
const DetailComment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [comment.userId]);
  return (
    <Container>
      <ImgChannel src={channel?.img} />
      <Detail>
        <WrapHeader>
          <Name>{channel?.name}</Name>
          <Date>{format(comment?.createdAt)}</Date>
        </WrapHeader>
        <Comment
          defaultValue={comment?.desc}
          disabled
          rows={comment?.desc.match(/\n/g)?.length + 1}
        />
      </Detail>
    </Container>
  );
};

export default DetailComment;
