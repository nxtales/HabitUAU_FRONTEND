import React from "react";
import { Route, Routes, HashRouter } from 'react-router-dom';

import Landingpage from "../views/landingpage";
import UserRegister from "../views/userRegister";

function Rotas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/LandingPage" element={<Landingpage />} />
                <Route path="/userRegister" element={<UserRegister />} />
            </Routes>
        </HashRouter>
    );
}

export default Rotas;
