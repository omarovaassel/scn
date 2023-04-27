import React from 'react';
import { Outlet } from "react-router-dom";

import s from "./MainLayout.module.scss";
import Navigation from './Navigation/Navigation';

function MainLayout() {
  return (
    <div className={s.layout}>
        <Navigation />
        <div>
            <Outlet />
        </div>
    </div>
  );
}

export default MainLayout;