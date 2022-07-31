import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Upload from "./Upload";
import LanguageSelect from "./LanguageSelect";
import { logout } from "../redux/userSlice";
import { persistor } from "../redux/store";

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #fff;
  padding: 0 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  z-index: 1;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const LeftNavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  & > svg {
    font-size: 30px;
    color: #333;
  }
`;

const RightNavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  & > svg {
    font-size: 30px;
    color: #333;
  }
`;

const Brand = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: #00a1d6;
  font-family: "Pacifico", cursive;
`;

const Search = styled.div`
  min-width: 600px;
  padding: 4px 20px;
  border: 1px solid #999;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  & > svg {
    margin-left: 20px;
    font-size: 30px;
    color: #333;
  }
  &:focus-within {
    border: 1px solid #00a1d6;
  }
`;

const Input = styled.input`
  outline: none;
  font-size: 14px;
  flex: 1;
  border: none;
  padding: 0 20px;
  border-right: 1px solid #999;
  &:focus {
    border-right: 1px solid #00a1d6;
  }
`;

const Login = styled.div`
  border: 1px solid rgb(0, 161, 214);
  color: #00a1d6;
  font-weight: 400;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: rgba(76, 147, 255, 0.1);
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 700;
  color: #333;
  cursor: pointer;
`;

const AvatarChannel = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Language = styled.div`
  position: relative;
`;

const NavBar = ({ isOpenMenu, setIsOpenMenu, setIsOpenAuth }) => {
  const [isOpenLanguage, setIsOpenLanguge] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [q, setQ] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSearch = () => {
    navigate(`/search?q=${q}`);
  };

  const handleLogout = async () => {
    await persistor.purge();
    await dispatch(logout());
    await persistor.flush();
  };

  return (
    <>
      <Container>
        <Wrapper>
          <LeftNavBar>
            <MenuOutlinedIcon onClick={() => setIsOpenMenu(!isOpenMenu)} />

            <Link to="/">
              <Brand>CDTube</Brand>
            </Link>
          </LeftNavBar>

          <Search>
            <Input
              placeholder="Tìm kiếm ..."
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={handleSearch} />
          </Search>

          <RightNavBar>
            {currentUser && (
              <>
                <FileUploadOutlinedIcon onClick={() => setIsOpenUpload(true)} />
                <Language>
                  <MoreVertOutlinedIcon
                    onClick={() => {
                      setIsOpenLanguge(!isOpenLanguage);
                    }}
                  />
                  {isOpenLanguage && <LanguageSelect />}
                </Language>
              </>
            )}

            {currentUser ? (
              <User>
                <AvatarChannel
                  src={currentUser.img}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <Link to={`/channel/${currentUser._id}`}>
                  {currentUser.name}
                </Link>

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </User>
            ) : (
              <Login
                onClick={() => {
                  setIsOpenAuth(true);
                }}
              >
                Đăng nhập
              </Login>
            )}
          </RightNavBar>
        </Wrapper>
      </Container>
      {isOpenUpload && <Upload setIsOpenUpload={setIsOpenUpload} />}
    </>
  );
};

export default NavBar;
