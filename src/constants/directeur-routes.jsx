import Acceuil from "../components/directeur/accueil.component"; // Import Accueil component
import Demandes from "../components/directeur/demandes.component"; // Import Demandes component
import MesConges from "../components/mes-conges.component"; // Import MesConges component
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; // Import HomeOutlinedIcon from MUI
import HailOutlinedIcon from '@mui/icons-material/HailOutlined'; // Import HailOutlinedIcon from MUI
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'; // Import FormatListBulletedOutlinedIcon from MUI

const DIRECTEUR_ROUTES = [
   {
      name: 'Accueil', // Route name
      layout: '/dashboard-dr', // Route layout
      path: '/', // Route path
      component: Acceuil, // Component associated with the route
      icon: HomeOutlinedIcon // Icon for the route
   },
   {
      name: 'Demandes de congé', // Route name
      layout: '/dashboard-dr', // Route layout
      path: '/demandes', // Route path
      component: Demandes, // Component associated with the route
      icon: HailOutlinedIcon // Icon for the route
   },
   {
      name: 'Mes demandes', // Route name
      layout: '/dashboard-dr', // Route layout
      path: '/mes-demandes', // Route path
      component: MesConges, // Component associated with the route
      icon: FormatListBulletedOutlinedIcon // Icon for the route
   }
];

export default DIRECTEUR_ROUTES;
/**
 * The DIRECTEUR_ROUTES configuration is an array of route objects that define the navigation routes available for users with the role of "DIRECTEUR" in your application.

Each route object consists of the following properties:

name: The name or label of the route, which is displayed in the sidebar navigation.

layout: The layout path for the route. It is used to specify the parent layout of the route within the dashboard. In this case, it's set to '/dashboard-dr' for routes specific to the "DIRECTEUR" dashboard.

path: The path of the route within the layout. It defines the URL path where the route can be accessed.

component: The React component associated with the route. When the route is accessed, this component is rendered in the main content area of the dashboard.

icon: The icon associated with the route, which is displayed next to the route name in the sidebar navigation. Icons are imported from Material-UI (MUI) and correspond to different shapes or symbols.

The DIRECTEUR_ROUTES configuration allows "DIRECTEUR" users to navigate between different sections of the dashboard, such as "Accueil" (Home), "Demandes de congé" (Leave Requests), and "Mes demandes" (My Requests). Each route is associated with a specific component for rendering the content related to that section.
 */