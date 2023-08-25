import { useState } from 'react';
import Sidebar from "../components/sidebar.component";
import Topbar from "../components/topbar.component";
import RH_ROUTES from "../constants/rh-routes";
import { Route, Routes } from 'react-router-dom';
import useUser from '../hooks/useUser';

const DashboardRH = () => {
   const [isSidebar, setIsSidebar] = useState(true);
   const { userInfo: {firstName, lastName, jobTitle} } = useUser();

   return (
      <div className="app">
         <Sidebar isSidebar={isSidebar} routes={RH_ROUTES} firstName={firstName} lastName={lastName} jobTitle={jobTitle} />
         <main className="main-dashbord-content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
               {
                  RH_ROUTES.map((item, index) => {
                     if (index === 0)
                        return <Route key={item.path} index element={<item.component />} />;
                     return <Route key={item.path} path={item.path} element={<item.component />} />;
                  }
                  )
               }
            </Routes>
         </main>
      </div>
   );
};

export default DashboardRH;