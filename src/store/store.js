import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./root-reducer";
import logger from 'redux-logger';
// eslint-disable-next-line no-undef
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
   Boolean
);

const store = configureStore({
   reducer: rootReducers,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleWares),
});

export default store;