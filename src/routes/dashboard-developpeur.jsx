import { useState } from 'react';
import Sidebar from "../components/sidebar.component"; // Import Sidebar component
import Topbar from "../components/topbar.component"; // Import Topbar component
import { Route, Routes } from 'react-router-dom';
import DEVELOPPEUR_ROUTES from '../constants/developpeur-routes'; // Import DEVELOPPEUR_ROUTES configuration
import useUser from '../hooks/useUser'; // Import useUser hook

const DashboardDeveloppeur = () => {
   const [isSidebar, setIsSidebar] = useState(true); // State to manage sidebar visibility
   const { userInfo: {firstName, lastName, jobTitle} } = useUser(); // Fetch user information from the useUser hook

   return (
      <div className="app">
         {/* Sidebar component */}
         <Sidebar isSidebar={isSidebar} routes={DEVELOPPEUR_ROUTES} firstName={firstName} lastName={lastName} jobTitle={jobTitle} />
         <main className="main-dashbord-content" >
            {/* Topbar component */}
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
               {DEVELOPPEUR_ROUTES.map((item, index) => {
                  if (index === 0)
                     return <Route key={item.path} index element={<item.component />} />;
                  return <Route key={item.path} path={item.path} element={<item.component />} />;
               })}
            </Routes>
         </main>
      </div>
   );
};

export default DashboardDeveloppeur;

/**
 * The DashboardDeveloppeur component represents the dashboard for users with the role of "Developpeur" in your application.

It manages the layout of the dashboard, including the sidebar and top bar, as well as the rendering of content based on the selected routes.

Key components and functionalities of the DashboardDeveloppeur component:

Sidebar: The Sidebar component is responsible for rendering the sidebar navigation menu. It receives the following props:

isSidebar: A state variable that manages the visibility of the sidebar.

routes: The configuration of routes specific to "Developpeur" users.

firstName, lastName, and jobTitle: User information displayed in the sidebar.

Topbar: The Topbar component represents the top bar of the dashboard and provides various actions and settings. It receives the following prop:

setIsSidebar: A function to toggle the visibility of the sidebar.
Routes: The Routes component from React Router is used to define and render the routes associated with the "Developpeur" dashboard. It maps over the DEVELOPPEUR_ROUTES configuration to create route elements.

DEVELOPPEUR_ROUTES: The DEVELOPPEUR_ROUTES configuration is imported from the developpeur-routes file and defines the available routes and components for "Developpeur" users.

The DashboardDeveloppeur component allows "Developpeur" users to navigate between different sections of the dashboard, with each section associated with a specific route and component.
 */