import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const displayMenu = keyframes`
  from {
    opacity:0 ;
  }
  to {
    opacity:1 ;
  }
`;

const Container = styled.div`
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  left: 0;
  border-right: 1px solid #eeeeee;
  animation: ${displayMenu} 0.3s linear;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ListItem = styled.div``;
const Develop = styled.div`
  cursor: pointer;
  padding-bottom: 10px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  &:hover {
    color: #00a1d6;
  }
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  padding: 16px 24px;
  cursor: pointer;
  &:hover {
    background: rgba(76, 147, 255, 0.2);
    font-weight: 600;
  }
`;

const Text = styled.div`
  margin-top: 4px;
  text-align: center;
  font-size: 14px;
`;

const Hr = styled.div`
  border: 1px solid #eeeeee;
`;
const Menu = () => {
  const [select, setSelect] = useState("home");

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <Wrapper>
        <ListItem>
          <Link to="/">
            <Item
              onClick={() => setSelect("home")}
              style={
                select === "home"
                  ? { background: "rgba(76, 147, 255, 0.2)", fontWeight: 600 }
                  : {}
              }
            >
              <HomeOutlinedIcon />
              <Text>
                Trang <br />
                chủ
              </Text>
            </Item>
          </Link>
          <Link to="/trends">
            <Item
              onClick={() => setSelect("trends")}
              style={
                select === "trends"
                  ? { background: "rgba(76, 147, 255, 0.2)", fontWeight: 600 }
                  : {}
              }
            >
              <WhatshotOutlinedIcon />
              <Text>
                Thịnh <br /> hành
              </Text>
            </Item>
          </Link>
          {currentUser && (
            <Link to="/subscriptions">
              <Item
                onClick={() => setSelect("subscriptions")}
                style={
                  select === "subscriptions"
                    ? { background: "rgba(76, 147, 255, 0.2)", fontWeight: 600 }
                    : {}
                }
              >
                <SubscriptionsOutlinedIcon />
                <Text>
                  Đăng <br />
                  kí
                </Text>
              </Item>
            </Link>
          )}

          <Item
            onClick={() => setSelect("setting")}
            style={
              select === "setting"
                ? { background: "rgba(76, 147, 255, 0.2)", fontWeight: 600 }
                : {}
            }
          >
            <SettingsOutlinedIcon />
            <Text>
              Cài <br /> đặt
            </Text>
          </Item>
          <Hr />
        </ListItem>
        <a
          href="https://www.facebook.com/profile.php?id=100004406117069"
          target="_blank"
        >
          <Develop>
            © 2022 <br />
            Developed <br /> by <br />
            CDTube
          </Develop>
        </a>
      </Wrapper>
    </Container>
  );
};

export default Menu;
