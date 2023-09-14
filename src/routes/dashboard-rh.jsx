import { useState } from 'react'; // Import useState hook from React
import Sidebar from "../components/sidebar.component"; // Import Sidebar component
import Topbar from "../components/topbar.component"; // Import Topbar component
import RH_ROUTES from "../constants/rh-routes"; // Import RH_ROUTES from constants
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes components from React Router
import useUser from '../hooks/useUser'; // Import custom hook useUser

const DashboardRH = () => {
   const [isSidebar, setIsSidebar] = useState(true); // State to manage sidebar visibility
   const { userInfo: {firstName, lastName, jobTitle} } = useUser(); // Get user information from custom hook useUser

   return (
      <div className="app">
         {/* Render the Sidebar component with user info and routes */}
         <Sidebar isSidebar={isSidebar} routes={RH_ROUTES} firstName={firstName} lastName={lastName} jobTitle={jobTitle} /> 
         <main className="main-dashbord-content">
         {/* Render the Topbar component with setIsSidebar function */}
            <Topbar setIsSidebar={setIsSidebar} />  
            <Routes>
               {
                  RH_ROUTES.map((item, index) => {
                     if (index === 0)
                        return <Route key={item.path} index element={<item.component />} />; // Render the first route as an index route
                     return <Route key={item.path} path={item.path} element={<item.component />} />; // Render other routes with their respective components
                  }
                  )
               }
            </Routes>
         </main>
      </div>
   );
};

export default DashboardRH;
