import { useState } from 'react'; // Import useState hook from React
import Sidebar from "../components/sidebar.component"; // Import Sidebar component
import Topbar from "../components/topbar.component"; // Import Topbar component
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes components from react-router-dom
import DIRECTEUR_ROUTES from '../constants/directeur-routes'; // Import DIRECTEUR_ROUTES (array of routes)
import useUser from '../hooks/useUser'; // Import useUser custom hook

const DashboardDirecteur = () => {
   const [isSidebar, setIsSidebar] = useState(true); // Initialize isSidebar state
   const { userInfo: { firstName, lastName, jobTitle } } = useUser(); // Get user information using the useUser hook

   return (
      <div className="app">
         {/* Sidebar */}
         <Sidebar isSidebar={isSidebar} routes={DIRECTEUR_ROUTES} firstName={firstName} lastName={lastName} jobTitle={jobTitle} />

         {/* Main Content */}
         <main className="main-dashbord-content">
            {/* Topbar */}
            <Topbar setIsSidebar={setIsSidebar} />

            {/* Router Configuration */}
            <Routes>
               {/* Map DIRECTEUR_ROUTES to Route components */}
               {
                  DIRECTEUR_ROUTES.map((item, index) => {
                     if (index === 0)
                        return <Route key={item.path} index element={<item.component />} />;
                     return <Route key={item.path} path={item.path} element={<item.component />} />;
                  })
               }
            </Routes>
         </main>
      </div>
   );
};

export default DashboardDirecteur;

/**
The DashboardDirecteur component represents the dashboard for users with the role of "DIRECTEUR."

It uses the useState hook to manage the isSidebar state, which controls whether the sidebar is visible or hidden.

The user information (first name, last name, job title) is obtained using the useUser custom hook, and it is used to customize the sidebar's content.

The component structure consists of a sidebar, topbar, and the main content area. The sidebar (Sidebar component) displays navigation links based on the DIRECTEUR_ROUTES configuration.

The topbar (Topbar component) provides user interaction elements such as color mode toggle, notifications, settings, and a logout button.

The Routes component from react-router-dom is used to define the routing configuration based on the DIRECTEUR_ROUTES array. Each route is associated with a specific component and path.

The DashboardDirecteur component serves as the main layout for users with the "DIRECTEUR" role, allowing them to navigate through the application's features and access relevant information.

 */