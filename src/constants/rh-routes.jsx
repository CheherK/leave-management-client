import Acceuil from "../components/rh/accueil.component";
import Demandes from "../components/rh/demandes.component";
import Utilisateurs from "../components/rh/utilisateurs.component";
import MesConges from "../components/mes-conges.component";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

const RH_ROUTES = [
   {
      name: 'Accueil',
      layout: '/dashboard-rh',
      path: '/',
      component: Acceuil,
      icon: HomeOutlinedIcon
   },
   {
      name: 'Demandes de congé',
      layout: '/dashboard-rh',
      path: '/demandes',
      component: Demandes,
      icon: HailOutlinedIcon
   },
   {
      name: 'Utilisateurs',
      layout: '/dashboard-rh',
      path: '/utilisateurs',
      component: Utilisateurs,
      icon: PeopleOutlinedIcon
   },
   {
      name: 'Mes demandes',
      layout: '/dashboard-rh',
      path: '/mes-demandes',
      component: MesConges,
      icon: FormatListBulletedOutlinedIcon
   }
];

export default RH_ROUTES;

/*
The RH_ROUTES configuration is an array of objects, where each object represents a route in the HR (Human Resources) dashboard.

Each route object has the following properties:

name: The name or label of the route (e.g., 'Accueil', 'Demandes de congé', 'Utilisateurs', 'Mes demandes').

layout: The layout or base path for the route (e.g., '/dashboard-rh').

path: The specific path for the route (e.g., '/', '/demandes', '/utilisateurs', '/mes-demandes').

component: The React component associated with the route (e.g., Acceuil, Demandes, Utilisateurs, MesConges).

icon: The MUI icon associated with the route (e.g., HomeOutlinedIcon, HailOutlinedIcon, PeopleOutlinedIcon, FormatListBulletedOutlinedIcon).

These route objects are used to define the navigation links and routing for the HR dashboard.

Each route corresponds to a specific page or functionality within the HR dashboard, and the component property specifies the React component to be rendered when the route is accessed.

The icon property specifies the icon to be displayed next to the navigation link for that route.

This configuration allows for easy management and customization of HR dashboard routes and their associated components and icons.

Overall, the RH_ROUTES configuration provides a structured way to define and manage the routes within the HR dashboard of your application.
*/