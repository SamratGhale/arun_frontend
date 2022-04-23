const server_URL = process.env.REACT_APP_API_SERVER
const base_URL = server_URL + '/api/v1'

module.exports = {
    USER: base_URL + '/users',
    ROOM: base_URL + '/room',
    APPLICATION: base_URL + '/application',
    APPLY: base_URL + '/Apply',
    ROOM_IMAGES: server_URL + '/room_images',
}