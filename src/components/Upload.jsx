import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

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
  min-height: 500px;
  background-color: white;
  color: #333;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border-radius: 10px;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const WrapInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid hsla(0, 0%, 60%, 0.3);
  color: #333;
  outline: none;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  width: 100%;
`;

const Desc = styled.textarea`
  border: 1px solid hsla(0, 0%, 60%, 0.3);
  color: #333;
  outline: none;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  resize: none;
`;

const Label = styled.label`
  font-size: 14px;
`;

const PreAvatar = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;
const ImgAvatar = styled.img`
  width: 240px;
  height: 180px;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 20px;
  box-shadow: 2px 2px #888888;
`;

const Upload = ({ setIsOpenUpload }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
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

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
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
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) {
      console.log("loi");
    } else {
      const res = await axios.post("/videos", {
        ...inputs,
      });
      setIsOpenUpload(false);
      res.status === 200 && navigate(`/video/${res.data._id}`);
    }
  };
  const handleCloseModal = () => {
    setIsOpenUpload(false);
    deleteFile(inputs.videoUrl);
    deleteFile(inputs.imgUrl);
    setImgPerc(0);
    setVideoPerc(0);
    setImg(undefined);
    setInputs({});
  };
  const handleCloseImgPreView = () => {
    deleteFile(inputs.imgUrl);
    setImgPerc(0);
    setVideoPerc(0);
    setImg(undefined);
    setInputs((prev) => {
      return { ...prev, imgUrl: "" };
    });
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  return (
    <Container
      onClick={() => {
        setIsOpenUpload(false);
      }}
    >
      <Wrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Close onClick={handleCloseModal}>
          <CloseOutlinedIcon />
        </Close>
        <Title>Tải video lên</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          <>
            <LinearProgress value={videoPerc} variant="determinate" />
          </>
        ) : (
          <WrapInput>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </WrapInput>
        )}
        <Input
          type="text"
          placeholder="Tiêu đề"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Mô tả"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Label>Ảnh nền:</Label>
        {imgPerc > 0 ? (
          imgPerc === 100 ? (
            <PreAvatar>
              <CloseOutlinedIcon
                onClick={handleCloseImgPreView}
                style={{
                  position: "absolute",
                  right: 50,
                  color: "red",
                  cursor: "pointer",
                }}
              />
              <ImgAvatar src={inputs.imgUrl} />
            </PreAvatar>
          ) : (
            <LinearProgress value={imgPerc} variant="determinate" />
          )
        ) : (
          <WrapInput>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </WrapInput>
        )}
        {videoPerc === 0 ? (
          <Button variant="contained" size="medium" disabled>
            Phải chọn video tải lên
          </Button>
        ) : videoPerc < 100 ? (
          <Button variant="contained" size="medium">
            Load video: {videoPerc} %
          </Button>
        ) : (
          <Button onClick={handleUpload} variant="contained" size="medium">
            Upload
          </Button>
        )}
      </Wrapper>
    </Container>
  );
};

export default Upload;
