import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/styles.scss";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import "antd/dist/antd.css";
import Login from "./pages/Login/Login";

import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import ProjectCreation from "./pages/ProjectCreation/ProjectCreation";
import UserManagement from "./pages/UserManagement/UserManagement";
import UserRegisterTemplate from "./templates/userRegisterTemplate/userRegisterTemplate";

export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="" element={<Login />}>
            <Route path="/login" element={<Login />} />
            <Route path="" element={<Home></Home>}>
              <Route path="/dashboard" element={<Dashboard></Dashboard>}>
                <Route path=":id"></Route>
              </Route>
              <Route
                path="/productManagement"
                element={<ProductManagement />}
              ></Route>
              <Route
                path="/taskManagement"
                element={<ProjectCreation />}
              ></Route>
              <Route
                path="/userManagement"
                element={<UserManagement />}
              ></Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="" />}></Route>
        </Routes>
      </HistoryRouter>
    </Provider>
  </div>
);
