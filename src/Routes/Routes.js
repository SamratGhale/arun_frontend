import React from "react"
import AuthProtect from "../misc/AuthProtect"
import Admin from "../modules/admin"
import DashboardLayout from "../misc/Layout"
import Room from '../modules/rooms'
import Home from "../views/home"
import { pagePath, routes } from './path'
import Users from "../modules/users"
import RoomDetails from "../modules/rooms/details"
const Routes = {
    path: '*',
    layout: DashboardLayout,
    routes: [
        {
            exact: true,
            path: pagePath.app.rooms,
            isAdminPage: false,
            guard: AuthProtect,
            heading: "Rooms",
            component: (props) => {
                return <Room {...props} />
            }
        },
        {
            exact: true,
            path: routes.app,
            isAdminPage: false,
            guard: AuthProtect,
            heading: "Home",
            component: (props) => {
                return <Home {...props} />
            }
        },
        {
            exact: true,
            path: routes.admin,
            isAdminPage: true,
            guard: AuthProtect,
            heading: "Admin",
            component: (props) => {
                return <Admin {...props} />
            }
        },
        {
            exact: true,
            path: pagePath.admin.users,
            isAdminPage: true,
            guard: AuthProtect,
            heading: "Users",
            component: (props) => {
                return <Users {...props} />
            }
        },
        {
            exact: true,
            path: pagePath.app.roomDetails,
            isAdminPage: false,
            guard: AuthProtect,
            heading: "Room Details",
            component: (props) => {
                return <RoomDetails {...props} />
            }
        },
    ]
}

export default Routes;