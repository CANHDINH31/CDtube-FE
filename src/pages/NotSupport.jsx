import React from "react";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";

const Container = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  margin: 0;
  padding: 0;
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  background-image: linear-gradient(
    to right top,
    #0f1011,
    #031120,
    #00112e,
    #000e39,
    #120541
  );
`;

function NotSupport() {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.supperMan}>
        <img
          src="http://pngimg.com/uploads/superman/superman_PNG9.png"
          alt=""
        />
      </div>
      <div className={classes.title}>Not Support</div>
      <p className={classes.p}>Only display on PC</p>
    </Container>
  );
}

export default NotSupport;

const useStyles = makeStyles({
  supperMan: {
    "&>img": {
      width: 150,
      transform: "rotate(45deg)",
      position: "absolute",
      top: "55",
      animation: `$animationSupperman 6s infinite linear`,
    },
  },
  title: {
    color: "#Fff",
    fontSize: 50,
    marginTop: 40,
    fontFamily: "'Pacifico', cursive",
  },

  p: {
    fontSize: 22,
    color: "#fff",
    fontFamily: "'Pacifico', cursive",
  },
  button: {
    marginTop: 30,
    padding: "10px 30px",
    border: 0,
    background: "#880000",
    color: "#fff",
    fontSize: 18,
    letterSpacing: 2,
    outline: "none",
    cursor: "pointer",
    borderRadius: 10,
    transition: ".3s all",
    fontFamily: "'Pacifico', cursive",

    "&:hover": {
      background: "#660000",
    },
    "&:active": {
      transform: "translate(-5px,5px)",
    },
  },
  "@keyframes animationSupperman": {
    "0%": {
      left: 0,
      top: "55%",
    },
    "10%": {
      top: "53%",
    },
    "20%": {
      top: "58%",
    },
    "30%": {
      top: "53%",
    },
    "40%": {
      top: "58%",
    },
    "50%": {
      top: "53%",
    },
    "60%": {
      top: "58%",
    },
    "70%": {
      top: "53%",
    },
    "80%": {
      top: "58%",
    },
    "90%": {
      top: "53%",
    },
    "100%": {
      left: "110%",
      top: "55%",
    },
  },
});
