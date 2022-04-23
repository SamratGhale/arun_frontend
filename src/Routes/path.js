//function made for merging base and additional routes in a single path
function merge_path(base, sub_path) {
    return `${base}${sub_path}`;
}

export const routes = {
    root: "/",
    app:  "/app",
    admin:"/admin",
    rooms:"/rooms",
    applications:"/applications",
    user: "/user",
    error:"/error",
};

export const pagePath = {
    app: {
        login:           merge_path(routes.app, "/login"),
        signup:          merge_path(routes.app, "/signup"),
        rooms :          merge_path(routes.app, "/rooms"),
        roomDetails :    merge_path(routes.app, "/rooms/:id"),
        waitForApproval: merge_path(routes.app, "/waitforapproval"),
    },
    user: {
        postedRooms : merge_path(routes.employer, "/:id"),
        appliedRooms: merge_path(routes.employer, "/applications"),
    },
    admin: {
        users: merge_path(routes.admin, "/users"),
        rooms: merge_path(routes.admin, "/rooms"),
    },
};