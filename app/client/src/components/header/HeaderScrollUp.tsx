import React from "react";
import Header from "./Header";
import ScrollUpButton from "../ScrollUpButton";
import { Outlet } from "react-router";

type Props = {};

const HeaderScrollUp = (props: Props) => {
  return (
    <div>
      <Header />
      <ScrollUpButton />
      <Outlet />
    </div>
  );
};

export default HeaderScrollUp;
