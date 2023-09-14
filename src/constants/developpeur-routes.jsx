import Acceuil from "../components/developer/accueil.component"; // Import Acceuil component
import MesConges from "../components/mes-conges.component"; // Import MesConges component
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; // Import HomeOutlinedIcon from Material-UI
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'; // Import FormatListBulletedOutlinedIcon from Material-UI

const DEVELOPPEUR_ROUTES = [
   {
      name: 'Accueil',
      layout: '/dashboard-dev',
      path: '/',
      component: Acceuil,
      icon: HomeOutlinedIcon // Icon for the "Accueil" route
   },
   {
      name: 'Mes demandes',
      layout: '/dashboard-dev',
      path: '/mes-demandes',
      component: MesConges,
      icon: FormatListBulletedOutlinedIcon // Icon for the "Mes demandes" route
   }
];

export default DEVELOPPEUR_ROUTES;
/**
 * The DEVELOPPEUR_ROUTES configuration defines the available routes and components specific to "Developpeur" users in your application.

It is an array of route objects, where each object represents a single route with the following properties:

name: The name of the route, which is typically displayed as the route title in the sidebar.

layout: The base layout or parent route under which this route is nested. In this case, it uses /dashboard-dev as the base layout.

path: The path or URL associated with the route. It defines the route's URL.

component: The React component that should be rendered when the route is navigated to.

icon: The icon associated with the route. It represents the icon displayed next to the route title in the sidebar.

In your configuration, there are two routes defined for "Developpeur" users:

Accueil Route:

name: "Accueil"
layout: "/dashboard-dev"
path: "/"
component: Acceuil component
icon: HomeOutlinedIcon
This route represents the "Accueil" section of the "Developpeur" dashboard.

Mes demandes Route:

name: "Mes demandes"
layout: "/dashboard-dev"
path: "/mes-demandes"
component: MesConges component
icon: FormatListBulletedOutlinedIcon
This route represents the "Mes demandes" section of the "Developpeur" dashboard.

The DEVELOPPEUR_ROUTES configuration allows "Developpeur" users to navigate between these two sections of their dashboard.
 */