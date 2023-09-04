import React from "react";

import { Link } from "react-router-dom";

import PopularMovie from "@/pages/Home/components/PopularMovie";
import TopRatedMovie from "@/pages/Home/components/TopRatedMovie";
import UpcomingMovie from "@/pages/Home/components/UpcomingMovie";

import styled from "styled-components";

type Props = {};

export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  vote_count: number;
  vote_average: number;
  backdrop_path: string;
  release_date: string;
}

const Home = (props: Props) => {
  return (
    <HomeContainer>
      <KategorieWrapper>
        <h3>PopularMovie</h3>
        <NavbarLink to={"/popular"}>전체 보기</NavbarLink>
      </KategorieWrapper>
      <PopularMovie />
      <KategorieWrapper>
        <h3>Top Rated</h3>
        <NavbarLink to={"/top_rated"}>전체 보기</NavbarLink>
      </KategorieWrapper>
      <TopRatedMovie />
      <KategorieWrapper>
        <h3>Upcoming</h3>
        <NavbarLink to={"/upcoming"}>전체 보기</NavbarLink>
      </KategorieWrapper>
      <UpcomingMovie />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  margin-left: 2rem;
`;

const KategorieWrapper = styled.div`
  margin-left: 1rem;
  width: 95%;
  display: flex;
  justify-content: space-between;
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
`;
