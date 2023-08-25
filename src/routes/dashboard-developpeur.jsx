import { useState } from 'react';
import Sidebar from "../components/sidebar.component";
import Topbar from "../components/topbar.component";
import { Route, Routes } from 'react-router-dom';
import DEVELOPPEUR_ROUTES from '../constants/developpeur-routes';
import useUser from '../hooks/useUser';

const DashboardDeveloppeur = () => {
   const [isSidebar, setIsSidebar] = useState(true);
   const { userInfo: {firstName, lastName, jobTitle} } = useUser();
   return (
      <div className="app">
         <Sidebar isSidebar={isSidebar} routes={DEVELOPPEUR_ROUTES} firstName={firstName} lastName={lastName} jobTitle={jobTitle} />
         <main className="main-dashbord-content" >
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
               {
                  DEVELOPPEUR_ROUTES.map((item, index) => {
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

export default DashboardDeveloppeur;