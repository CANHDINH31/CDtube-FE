import { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Search from "./pages/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import Auth from "./components/Auth";
import Channel from "./pages/Channel";
import Error from "./pages/Error";
import NotSupport from "./pages/NotSupport";

const Container = styled.div``;

const WrapBrowser = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
`;
const WrapNotSupport = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: none;
  @media (min-width: 1200px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
`;
const ScrollToTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: #fff;
  z-index: 1;

  &:hover {
    border: none;
    background-color: #00a1d6;
    & > svg {
      color: white;
    }
  }
`;

function App() {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [isOpenAuth, setIsOpenAuth] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    //cleanup function

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Container className="App">
      <WrapBrowser>
        <BrowserRouter>
          <NavBar
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
            setIsOpenAuth={setIsOpenAuth}
          />
          {showGoToTop && (
            <ScrollToTop
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <KeyboardDoubleArrowUpOutlinedIcon />
            </ScrollToTop>
          )}

          <Wrapper>
            {isOpenMenu && <Menu />}
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={<Home type="random" name="Trang chủ" />}
                />
                <Route
                  path="trends"
                  element={<Home type="trend" name="Thịnh hành" />}
                />
                <Route
                  path="subscriptions"
                  element={<Home type="sub" name="Kênh đăng kí" />}
                />
                <Route path="search" element={<Search />} />

                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
                <Route path="channel">
                  <Route path=":id" element={<Channel />} />
                </Route>
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </Wrapper>
          {isOpenAuth && <Auth setIsOpenAuth={setIsOpenAuth} />}
        </BrowserRouter>
      </WrapBrowser>
      <WrapNotSupport>
        <NotSupport />
      </WrapNotSupport>
    </Container>
  );
}

export default App;
