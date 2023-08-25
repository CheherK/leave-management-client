import Login from "./routes/Login";
import './App.css';
import { Route, Routes } from 'react-router';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import DashboardDirecteur from "./routes/dashboard-directeur";
import DashboardDeveloppeur from "./routes/dashboard-developpeur";
import RequireAuth from "./utils/require-auth";
import DashboardRH from "./routes/dashboard-rh";
import { useEffect } from "react";
import useUser from "./hooks/useUser";
import { GET_USER_BY_ID } from "../api/user-crud";
import axios from "../api/axios";
import { setUserInfo } from "./store/user/user.reducer";
import { useDispatch } from "react-redux";
import { useRef } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const { userInfo } = useUser();
  const dispatch = useDispatch();
  const apiCallMade = useRef(false); // To track whether the API call has been made

  useEffect(() => {
    if (!apiCallMade.current && userInfo?.id) {
      apiCallMade.current = true; // Mark the API call as made
      const fetchData = async () => {
        try {
          const response = await axios.get(GET_USER_BY_ID(userInfo.id));
          response.data != userInfo && dispatch(setUserInfo(response.data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [userInfo, dispatch]);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Login />} />
          {/* protected routes  */}
          <Route element={<RequireAuth />}>
            <Route path='dashboard-rh/*' element={<DashboardRH />} />
            <Route path='dashboard-dr/*' element={<DashboardDirecteur />} />
            <Route path='dashboard-dev/*' element={<DashboardDeveloppeur />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
