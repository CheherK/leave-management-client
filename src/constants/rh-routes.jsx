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