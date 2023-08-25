import Acceuil from "../components/developer/accueil.component";
import MesConges from "../components/mes-conges.component";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

const DEVELOPPEUR_ROUTES = [
   {
      name: 'Accueil',
      layout: '/dashboard-dev',
      path: '/',
      component: Acceuil,
      icon: HomeOutlinedIcon
   },
   {
      name: 'Mes demandes',
      layout: '/dashboard-dev',
      path: '/mes-demandes',
      component: MesConges,
      icon: FormatListBulletedOutlinedIcon
   }
];

export default DEVELOPPEUR_ROUTES;