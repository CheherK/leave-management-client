// This main.js file serves as the entry point for your React application and sets up various configurations and providers to ensure smooth operation, routing, and state management.

import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM from the client package
import App from './App.jsx'; // Import the main App component
import './index.css'; // Import a CSS file
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import { Provider } from 'react-redux'; // Import Provider for Redux state management
import store from "./store/store"; // Import the Redux store configuration
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider for displaying notifications

// Render the React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Enable strict mode for development */}
    <Provider store={store}>
      {/* Provide the Redux store to the application */}
      <BrowserRouter>
        {/* Set up client-side routing */}
        <SnackbarProvider>
          {/* Provide the SnackbarProvider for displaying notifications */}
          <App />
          {/* Render the main App component */}
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

/*
import { BrowserRouter } from 'react-router-dom';: The BrowserRouter component is imported from the 'react-router-dom' library, which is used for client-side routing in your React application.


import { Provider } from 'react-redux';: The Provider component is imported from the 'react-redux' library. It's used to provide your Redux store to the React application, enabling state management.


import store from "./store/store";: This imports the Redux store configuration from the "./store/store" file. Ensure that the path is correct relative to your project structure.


import { SnackbarProvider } from 'notistack';: The SnackbarProvider component is imported from the 'notistack' library, which is used for displaying notifications in your application.


ReactDOM.createRoot(document.getElementById('root')).render(...): This code uses ReactDOM.createRoot to create a root for rendering your React application. It renders the application within a strict mode (<React.StrictMode>) to catch potential issues and improve performance.


Inside the root, the Provider component wraps your application, providing access to the Redux store. The BrowserRouter sets up client-side routing, and the SnackbarProvider wraps your App component to enable notifications.


Finally, your App component is rendered within this structure, serving as the entry point for your React application.

*/
