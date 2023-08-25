import { useSelector } from "react-redux";
import { selectUser } from "../store/user/user.selector";

const useUser = () => {
   return useSelector(selectUser);
}
export default useUser;