import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
// import AuthProvider from "react-auth-kit/AuthProvider";
// import createStore from "react-auth-kit/createStore";

function App() {
  // const store = createStore({
  //   authName: "_auth",
  //   authType: "cookie",
  //   cookieDomain: window.location.hostname,
  //   cookieSecure: window.location.protocol === "https:",
  // });

  return (
    // <AuthProvider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
