import React from "react";
import SearchBar from "@/pages/Search/components/SearchBar";
import { Link } from "react-router-dom";

import styled from "styled-components";

type Props = {};

const Header = (props: Props) => {
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
