import React, { lazy, Suspense, useEffect, Fragment } from "react";
import { pagePath } from "./path";
import Routes from "./Routes";
import { Switch, Route } from "react-router-dom";
import DefaultAuth from '../misc/defaultAuth';
import Home from "../views/home";
const routes = [
  {
    exact: true,
    path: pagePath.app.login,
    component: lazy(() => import("../views/login")),
  },
  {
    exact: true,
    path: pagePath.app.signup,
    component: lazy(() => import("../views/signup")),
  },
  Routes,
  /*
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("../Views/Error/page404")),
  },
  {
    exact: true,
    path: pagePath.app.waitForApproval,
    component: lazy(() => import("../Views/Error/Waitforapprove")),
  },
  */
];

function RouteProgress(props) {
  return <Route {...props} />;
}

export const renderRoutes = (routes = []) => {
  return (
    <Suspense fallback={<Home />}>
      <Switch>
        {routes.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard || DefaultAuth;
          const Layout = route.layout || Fragment;
          const isAdminPage = route.isAdminPage;
          console.log(routes)

          return (
            <RouteProgress
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard isAdminPage={isAdminPage}>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

export default routes;