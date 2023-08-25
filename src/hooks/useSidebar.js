import { useSelector } from "react-redux";
import { selectSidebar } from "../store/sidebar/sidebar.selector";

const useSidebar = () => {
   return useSelector(selectSidebar);
};
export default useSidebar;