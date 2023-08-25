import Acceuil from "../components/directeur/accueil.component";
import Demandes from "../components/directeur/demandes.component";
import MesConges from "../components/mes-conges.component";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

const DIRECTEUR_ROUTES = [
   {
      name: 'Accueil',
      layout: '/dashboard-dr',
      path: '/',
      component: Acceuil,
      icon: HomeOutlinedIcon
   },
   {
      name: 'Demandes de congé',
      layout: '/dashboard-dr',
      path: '/demandes',
      component: Demandes,
      icon: HailOutlinedIcon
   },
   {
      name: 'Mes demandes',
      layout: '/dashboard-dr',
      path: '/mes-demandes',
      component: MesConges,
      icon: FormatListBulletedOutlinedIcon
   }
];

export default DIRECTEUR_ROUTES;