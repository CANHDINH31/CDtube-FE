import React, { useRef, useState } from "react";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailIcon,
  EmailShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  LineShareButton,
  LineIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WeiboShareButton,
  WeiboIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { fontWeight } from "@mui/system";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const Wrapper = styled.div`
  width: 600px;
  background-color: white;
  color: #333;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 400;
  color: #333;
  align-items: center;
`;
const Text = styled.div``;

const WrapShare = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
const ItemText = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #333;
`;

const WrapCoppy = styled.div`
  margin-top: 30px;
  border: 1px solid hsla(0, 0%, 60%, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 25px;
`;
const Input = styled.input`
  flex: 1;
  border: none;
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;
function ShareModal({ setIsOpenModalShare }) {
  const [isCoppied, setIsCoppied] = useState(false);
  const path = window.location.href;
  const inputRef = useRef();
  const handleCopy = () => {
    setIsCoppied(true);
    navigator.clipboard.writeText(inputRef.current.value);
  };
  return (
    <Container>
      <Wrapper>
        <Header>
          <Text>Chia sẻ</Text>
          <CloseOutlinedIcon onClick={() => setIsOpenModalShare(false)} />
        </Header>
        <WrapShare>
          <Item>
            <FacebookShareButton url={`${path}`}>
              <FacebookIcon size={45} round={true} />
            </FacebookShareButton>
            <ItemText>Facebook</ItemText>
          </Item>

          <Item>
            <EmailShareButton url={`${path}`}>
              <EmailIcon size={45} round={true} />
            </EmailShareButton>
            <ItemText>Email</ItemText>
          </Item>

          <Item>
            <LinkedinShareButton url={`${path}`}>
              <LinkedinIcon size={45} round={true} />
            </LinkedinShareButton>
            <ItemText>Linkedin</ItemText>
          </Item>

          <Item>
            <LineShareButton url={`${path}`}>
              <LineIcon size={45} round={true} />
            </LineShareButton>
            <ItemText>Line</ItemText>
          </Item>

          <Item>
            <TelegramShareButton url={`${path}`}>
              <TelegramIcon size={45} round={true} />
            </TelegramShareButton>
            <ItemText>Telegram</ItemText>
          </Item>

          <Item>
            <TwitterShareButton url={`${path}`}>
              <TwitterIcon size={45} round={true} />
            </TwitterShareButton>
            <ItemText>Twitter</ItemText>
          </Item>

          <Item>
            <ViberShareButton url={`${path}`}>
              <ViberIcon size={45} round={true} />
            </ViberShareButton>
            <ItemText>Viber</ItemText>
          </Item>

          <Item>
            <WeiboShareButton url={`${path}`}>
              <WeiboIcon size={45} round={true} />
            </WeiboShareButton>
            <ItemText>Weibo</ItemText>
          </Item>

          <Item>
            <WhatsappShareButton url={`${path}`}>
              <WhatsappIcon size={45} round={true} />
            </WhatsappShareButton>
            <ItemText>Whatsapp</ItemText>
          </Item>
        </WrapShare>

        <WrapCoppy>
          <Input value={path} ref={inputRef} />
          {isCoppied ? (
            <Button onClick={handleCopy}>Đã sao chép</Button>
          ) : (
            <Button onClick={handleCopy}>Sao chép</Button>
          )}
        </WrapCoppy>
      </Wrapper>
    </Container>
  );
}

export default ShareModal;
