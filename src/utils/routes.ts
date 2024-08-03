interface RouteTypes {
    [key: string]: string;
}
const routes: RouteTypes = {
    GET_ALL_USERS: "/api/users?category=all",
    GET_TEAM_USERS: "/api/users?category=team",
    GET_MEMBER_USERS: "/api/users?category=member",
}

export default routes;