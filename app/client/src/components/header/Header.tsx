import React, { useState, useEffect } from "react";
import SearchBar from "@/components/header/SearchBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/user/auth").then((res) => {
      if (res.data.isAuth === true) setFlag(true);
      else setFlag(false);
    });
  }, [flag]);

  const logoutFunc = (e: any) => {
    axios.get("/api/user/logout").then((res) => {
      if (res.data.success === true) {
        alert("로그아웃 되었습니다.");
        window.location.reload();
        setFlag(false);
      }
    });
  };

  return (
    <HeaderContainer>
      <HomeLink to={"/"}>
        <h3 style={{ textDecoration: "none" }}>Movie App</h3>
      </HomeLink>
      <NavLinkContainer>
        <NavbarLink to={"/popular"}>
          <h3>Popular</h3>
        </NavbarLink>
        <NavbarLink to={"/top_rated"}>
          <h3>Top Rated</h3>
        </NavbarLink>
        <NavbarLink to={"/upcoming"}>
          <h3>Upcoming</h3>
        </NavbarLink>
      </NavLinkContainer>
      <Right>
        <SearchBar />
        {flag ? (
          <LogoutBtn onClick={(e) => logoutFunc(e)}>로그아웃</LogoutBtn>
        ) : (
          <SigninLink to={"/signin"}>로그인</SigninLink>
        )}
      </Right>
    </HeaderContainer>
  );
};

export default Header;

const Right = styled.div`
  display: flex;
`;

const SigninLink = styled(Link)`
  margin-left: 15px;
  margin-top: 5px;
  text-decoration: none;
  color: white;
`;

const HeaderContainer = styled.header`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  z-index: 1;
  width: 100%;
  height: 3rem;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
`;

const HomeLink = styled(Link)`
  margin-left: 3rem;
  font-size: 1.5rem;
  font-weight: 300;
  color: white;
  text-decoration: none;
`;

const NavLinkContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 300;
  &:hover {
    transform: translateY(-5px);
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const LogoutBtn = styled.button`
  font-size: 1rem;
  border: 0;
  background-color: transparent;
  color: white;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;
