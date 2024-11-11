import React from "react";
import { Route, Routes, HashRouter } from 'react-router-dom';

import Landingpage from "../views/landingpage";
import UserRegister from "../views/userRegister";
import UserLogin from "../views/userLogin";
import UserArea from "../views/userArea";
import FindChallenges from "../views/findChallenges";
import UserAccount from "../views/userAccount";         
import UserFriendships from "../views/userFriendships"; 
import UserRanking from "../views/userRanking";         

function Rotas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/LandingPage" element={<Landingpage />} />
                <Route path="/userRegister" element={<UserRegister />} />
                <Route path="/userLogin" element={<UserLogin />} />
                <Route path="/userArea" element={<UserArea />} />
                <Route path="/findChallenges" element={<FindChallenges />} />
                <Route path="/userAccount" element={<UserAccount />} />            
                <Route path="/userFriends" element={<UserFriendships />} />     
                <Route path="/userRanking" element={<UserRanking />} />             
            </Routes>
        </HashRouter>
    );
}

export default Rotas;
