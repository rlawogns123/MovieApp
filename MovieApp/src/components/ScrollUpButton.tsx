import React, { useEffect, useState } from "react";

import styled from "styled-components";

type Props = {};

const ScrollUpButton = (props: Props) => {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 1000 ? setIsScroll(true) : setIsScroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // return isScroll ? (
  //   <ScrollUpWrapper>
  //     <button onClick={scrollToTop}>TOP</button>
  //   </ScrollUpWrapper>
  // ) : (
  //   <></>
  // );

  return (
    isScroll && (
      <ScrollUpWrapper>
        <button onClick={scrollToTop}>TOP</button>
      </ScrollUpWrapper>
    )
  );
};

export default ScrollUpButton;

const ScrollUpWrapper = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;

  button {
    font-weight: bold;
    font-size: 15px;
    padding: 10px 10px;
    border: 1px solid white;
    border-radius: 35%;
    background-color: #000;
    color: #fff;
    outline: none;
    cursor: pointer;
  }
`;
