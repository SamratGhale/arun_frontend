const server_URL = process.env.REACT_APP_API_SERVER
const base_URL = server_URL + '/api/v1'

module.exports = {
    USER:  base_URL + '/users',
    ROLES: base_URL + '/Roles',
    ROOM:  base_URL + '/Room',
    APPLY: base_URL + '/Apply',
}