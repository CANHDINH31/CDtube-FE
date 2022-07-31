import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Button from "@mui/material/Button";
import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { auth, provider, app } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import {
  deleteObject,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import LinearProgress from "@mui/material/LinearProgress";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
`;

const Wrapper = styled.div`
  background-color: #fff;
  height: 100%;
  min-width: 500px;
  border-radius: 10px;
  padding: 32px 32px;
  display: flex;
  flex-direction: column;
`;

const HeaderIcon = styled.div`
  display: flex;
  justify-content: space-between;
  & > svg {
    font-size: 20px;
    color: #333;
  }
`;

const Title = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  color: #333;
  font-size: 24px;
  font-weight: 700;
`;

const Error = styled.div`
  margin-top: 20px;
  color: red;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

const Message = styled(Error)`
  color: green;
`;

const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  gap: 20px;
`;
const UserName = styled.input`
  height: 44px;
  padding: 0 16px;
  font-weight: 700;
  border: 1px solid hsla(0, 0%, 60%, 0.3);
  color: #333;
  border-radius: 4px;
  &:focus {
    outline: 1px solid #00a1d6;
  }
`;
const ChannelName = styled.input`
  height: 44px;
  padding: 0 16px;
  font-weight: 700;
  border: 1px solid hsla(0, 0%, 60%, 0.3);
  color: #333;
  border-radius: 4px;
  &:focus {
    outline: 1px solid #00a1d6;
  }
`;
const PassWord = styled.input`
  height: 44px;
  padding: 0 16px;
  font-weight: 700;
  border: 1px solid hsla(0, 0%, 60%, 0.3);
  color: #333;
  border-radius: 4px;
  &:focus {
    outline: 1px solid #00a1d6;
  }
`;

const RePassWord = styled.input`
  height: 44px;
  padding: 0 16px;
  font-weight: 700;
  border: 1px solid hsla(0, 0%, 60%, 0.3);
  color: #333;
  border-radius: 4px;
  &:focus {
    outline: 1px solid #00a1d6;
  }
`;

const Label = styled.label`
  color: #333;
  font-weight: 700;
`;

const WrapInputImg = styled.div`
  height: 44px;
  padding: 0 16px;
  border: 1px solid hsla(0, 0%, 60%, 0.3);
  display: flex;
  align-items: center;
`;
const InputImg = styled.input``;

const LoginMore = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Text = styled.div`
  display: flex;
  justify-content: center;
  color: #999;
  font-size: 14px;
`;

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const TextFooter = styled.div`
  color: #999;
  font-size: 16px;
  font-weight: 500;
`;

const PreAvartar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ImgAvartar = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  box-shadow: 2px 2px #888888;
`;

const Auth = ({ setIsOpenAuth }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [channelname, setChannelname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [imgPerc, setImgPerc] = useState(0);
  const [inputImg, setInputImg] = useState(undefined);
  const [fireBaseImg, setFireBaseImg] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            setIsOpenAuth(false);
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  const deleteFile = (file) => {
    const storage = getStorage(app);
    const desertRef = ref(storage, file);

    deleteObject(desertRef)
      .then(() => {
        console.log("delete successful");
      })
      .catch((error) => {
        console.log("delete failure");
      });
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFireBaseImg({ img: downloadURL });
        });
      }
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!username || !password) {
      setError("Bạn cần nhập đầy đủ các trường");
    } else {
      dispatch(loginStart());
      try {
        const res = await axios.post("/auth/signin", { username, password });
        if (res.data.status === 200) {
          dispatch(loginSuccess(res.data));
          setIsOpenAuth(false);
        } else {
          setError(res.data.message);
        }
      } catch (error) {
        dispatch(loginFailure());
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!channelname || !username || !password || !rePassword) {
      setError("Bạn cần nhập đầy đủ các trường");
    } else if (password !== rePassword) {
      setError("Mật khẩu nhập lại không khớp");
    } else {
      const res = await axios.post("/auth/signup", {
        name: channelname,
        username,
        password,
        ...fireBaseImg,
      });
      if (res.data.status === 200) {
        setMessage(res.data.message);
        setError("");
        setChannelname("");
        setUsername("");
        setPassword("");
        setRepassword("");
        setInputImg("");
        setImgPerc(0);
        setIsLogin(true);
      } else {
        setError(res.data.message);
      }
    }
  };

  const handleCloseAuth = () => {
    setIsOpenAuth(false);
    deleteFile(fireBaseImg.img);
    setImgPerc(0);
    setFireBaseImg({});
    setInputImg(undefined);
  };

  const handleCloseImgPreView = () => {
    deleteFile(fireBaseImg.img);
    setImgPerc(0);
    setFireBaseImg({});
    setInputImg(undefined);
  };

  useEffect(() => {
    inputImg && uploadFile(inputImg);
  }, [inputImg]);

  return (
    <Container
      onClick={() => {
        setIsOpenAuth(false);
      }}
    >
      <Wrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <HeaderIcon>
          <ArrowBackIosNewOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          />
          <CloseOutlinedIcon
            onClick={handleCloseAuth}
            style={{ cursor: "pointer" }}
          />
        </HeaderIcon>
        {isLogin ? <Title>Đăng Nhập</Title> : <Title>Đăng Kí</Title>}
        {message && (
          <Message>
            <span>{message}</span>
            <CloseOutlinedIcon onClick={() => setMessage(false)} />
          </Message>
        )}
        {error && (
          <Error>
            <span>{error}</span>
            <CloseOutlinedIcon onClick={() => setError(false)} />
          </Error>
        )}

        <Form>
          {!isLogin && (
            <ChannelName
              placeholder="Tên kênh"
              value={channelname}
              onChange={(e) => setChannelname(e.target.value)}
              required
            />
          )}
          <UserName
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <PassWord
            placeholder="Mật khẩu"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="on"
          />
          {!isLogin && (
            <RePassWord
              placeholder="Nhập lại mật khẩu"
              value={rePassword}
              type="password"
              onChange={(e) => setRepassword(e.target.value)}
              required
              autoComplete="on"
            />
          )}
          {!isLogin && (
            <>
              <Label>Chọn ảnh đại diện</Label>
              {imgPerc > 0 ? (
                imgPerc === 100 ? (
                  <PreAvartar>
                    <CloseOutlinedIcon
                      onClick={handleCloseImgPreView}
                      style={{
                        position: "absolute",
                        right: 30,
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                    <ImgAvartar src={fireBaseImg.img} />
                  </PreAvartar>
                ) : (
                  <LinearProgress variant="determinate" value={imgPerc} />
                )
              ) : (
                <WrapInputImg>
                  <InputImg
                    type="file"
                    accept="image/*"
                    onChange={(e) => setInputImg(e.target.files[0])}
                    required
                  />
                </WrapInputImg>
              )}
            </>
          )}

          {isLogin ? (
            <Button
              variant="contained"
              sx={{ marginTop: "10px", height: "44px" }}
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ marginTop: "10px", height: "44px" }}
              onClick={handleSignup}
            >
              Đăng kí
            </Button>
          )}
        </Form>
        {isLogin && (
          <LoginMore>
            <Text>Hoặc đăng nhập bằng cách khác ?</Text>
            <Button
              variant="contained"
              color="info"
              sx={{ borderRadius: "20px", height: "44px" }}
            >
              Đăng nhập bằng Facebook
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: "20px", height: "44px" }}
              onClick={signInWithGoogle}
            >
              Đăng nhập bằng Google
            </Button>
          </LoginMore>
        )}
        {isLogin ? (
          <Footer>
            <TextFooter>
              Chưa đăng kí tài khoản ?{" "}
              <span
                style={{
                  color: "#00a1d6",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsLogin(false);
                }}
              >
                Đăng kí
              </span>
            </TextFooter>
          </Footer>
        ) : (
          <Footer>
            <TextFooter>
              Đã có tài khoản ?{" "}
              <span
                style={{
                  color: "#00a1d6",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsLogin(true);
                }}
              >
                Đăng nhập
              </span>
            </TextFooter>
          </Footer>
        )}
      </Wrapper>
    </Container>
  );
};

export default Auth;
