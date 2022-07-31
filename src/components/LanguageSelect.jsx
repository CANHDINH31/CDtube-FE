import React, { useState } from "react";
import styled from "styled-components";
import { Paper } from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const Container = styled.div`
  position: absolute;
  top: calc(100% + 30px);
  left: -150px;
  min-width: 260px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const DefaultLanguge = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  & > svg {
    color: #333;
  }
`;

const TextLanguage = styled.div`
  font-size: 14px;
  color: #333;
`;

const LangugeSelect = styled.div``;
const TitleLanguageSelect = styled.div`
  padding: 10px 16px;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid #eeeeee;
`;
const TextTitleLanguageSelect = styled.div``;
const ListLanguage = styled.div``;
const LanguageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  & > svg {
    font-size: 18px;
    color: #00a1d6;
  }
`;
const LanguageItemText = styled.div``;
const LanguageSelect = () => {
  const [isSelectLanguge, setIsSelectLanguge] = useState(false);
  return (
    <Container>
      <Paper elevation={3}>
        <Wrapper>
          {!isSelectLanguge && (
            <DefaultLanguge
              onClick={() => {
                setIsSelectLanguge(true);
              }}
            >
              <LanguageOutlinedIcon />
              <TextLanguage>Ngôn ngữ: Tiếng Việt</TextLanguage>
              <NavigateNextOutlinedIcon />
            </DefaultLanguge>
          )}

          {isSelectLanguge && (
            <LangugeSelect>
              <TitleLanguageSelect
                onClick={() => {
                  setIsSelectLanguge(false);
                }}
              >
                <KeyboardBackspaceOutlinedIcon />
                <TextTitleLanguageSelect>Chọn ngôn ngữ</TextTitleLanguageSelect>
              </TitleLanguageSelect>
              <ListLanguage>
                <LanguageItem>
                  <LanguageItemText>English</LanguageItemText>
                </LanguageItem>
                <LanguageItem>
                  <LanguageItemText>Bahasa Indonesia</LanguageItemText>
                </LanguageItem>
                <LanguageItem>
                  <LanguageItemText>Tiếng Việt</LanguageItemText>
                  <CheckOutlinedIcon />
                </LanguageItem>
                <LanguageItem>
                  <LanguageItemText>ภาษาไทย</LanguageItemText>
                </LanguageItem>
                <LanguageItem>
                  <LanguageItemText>Bahasa Melayu</LanguageItemText>
                </LanguageItem>
              </ListLanguage>
            </LangugeSelect>
          )}
        </Wrapper>
      </Paper>
    </Container>
  );
};

export default LanguageSelect;
