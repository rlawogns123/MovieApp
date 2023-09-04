import React from "react";
import SearchBar from "@/pages/Search/components/SearchBar";
import { Link } from "react-router-dom";

import styled from "styled-components";

type Props = {};

const Header = (props: Props) => {
  return (
    <HeaderContainer>
      <HomeLink to={"/"}>
        <h2 style={{ textDecoration: "none" }}>Movie App</h2>
      </HomeLink>
      <NavLinkContainer>
        <NavbarLink to={"/popular"}>
          <h2>Popular</h2>
        </NavbarLink>
        <NavbarLink to={"/top_rated"}>
          <h2>Top Rated</h2>
        </NavbarLink>
        <NavbarLink to={"/upcoming"}>
          <h2>Upcoming</h2>
        </NavbarLink>
      </NavLinkContainer>
      <SearchBar />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HomeLink = styled(Link)`
  margin-left: 3rem;
  font-size: 2rem;
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
  font-size: 2rem;
  font-weight: 300;
  &:hover {
    transform: translateY(-5px);
  }
`;
