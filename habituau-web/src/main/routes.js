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
import AdminLogin from "../views/adminLogin";   
import AdminArea from "../views/adminArea";
import ViewFiliais from "../views/viewFiliais";
import ViewAdmins from "../views/viewAdmins";
import ViewParceiros from "../views/viewPartners";
import ViewCategories from "../views/viewCategories";
import ViewChallenges from "../views/viewChallenges";
import ViewChallengeTasks from "../views/viewChallengeTasks";

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
                <Route path="/adminLogin" element={<AdminLogin />} /> 
                <Route path="/adminArea" element={<AdminArea />} /> 
                <Route path="/viewFiliais" element={<ViewFiliais />} /> 
                <Route path="/viewAdmins" element={<ViewAdmins />} />  
                <Route path="/viewPartners" element={<ViewParceiros />} />  
                <Route path="/viewCategories" element={<ViewCategories />} />  
                <Route path="/viewChallenges" element={<ViewChallenges />} />  
                <Route path="/viewChallengeTasks" element={<ViewChallengeTasks />} />
            </Routes>
        </HashRouter>
    );
}

export default Rotas;
