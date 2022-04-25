import React from "react"
import AuthProtect from "../misc/AuthProtect"
import Admin from "../modules/admin/Rooms"
import DashboardLayout from "../misc/Layout"
import Room from '../modules/rooms'
import Home from "../views/home"
import { pagePath, routes } from './path'
import Users from "../modules/admin/Users"
import RoomDetails from "../modules/rooms/details"
import Profile from "../views/profile"
import Applications from "../modules/applications"
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
            path: pagePath.admin.rooms,
            isAdminPage: true,
            guard: AuthProtect,
            heading: "Admin Rooms",
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
        {
            exact: true,
            path: pagePath.app.profile,
            isAdminPage: false,
            guard: AuthProtect,
            heading: "Profile",
            component: (props) => {
                return <Profile {...props} />
            }
        },
        {
            exact: true,
            path: routes.applications,
            isAdminPage: false,
            guard: AuthProtect,
            heading: "Applications",
            component: (props) => {
                return <Applications{...props} />
            }
        },
    ]
}

export default Routes;