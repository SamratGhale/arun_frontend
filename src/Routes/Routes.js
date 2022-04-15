import React from "react"
import AuthProtect from "../misc/AuthProtect"
import DashboardLayout from "../misc/Layout"
import Home from "../views/home"
import { routes } from './path'
const Routes = {
    path: '*',
    layout: DashboardLayout,
    routes: [
        {
            exact: true,
            path: routes.app,
            isAdminPage: false,
            guard: AuthProtect,
            heading: "Home",
            component: (props) => {
                return <Home {...props} />
            }
        }
    ]
}

export default Routes;