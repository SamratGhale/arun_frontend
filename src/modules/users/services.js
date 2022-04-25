import { USER } from "../../constants/Api";
import axios from 'axios';
import { saveUser, saveUserToken, saveUserPermissions, getToken, logOutUser } from '../../misc/sessionManager';

const accessToken = getToken();


export async function getAllUsers() {
    try {
        const res = await axios.get(USER, {
            headers: {
                'access_token': accessToken
            }
        });
        return res;
    }
    catch (err) {
        throw err;
    }
}


function toFormData(o) {
    return Object.entries(o).reduce((d, e) => (d.append(...e), d), new FormData())
}

export async function login(data) {
    return new Promise((resolve, reject) => {
        axios.post(USER + '/login', data)
            .then((res) => {
                saveUser(res.data);
                saveUserToken(res.data.token);
                resolve({ sucess: true, status: 200, data: res.data })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

export async function signup(data) {
    return new Promise((resolve, reject) => {
        axios.post(USER + '/register', data)
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

export async function refreshInfo() {
    return new Promise((resolve, reject) => {
        axios.get(USER + `/auth/${accessToken}`)
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

export async function updateUser(id, data) {
    return new Promise((resolve, reject) => {
        axios.post(USER + `/${id}/update`, data, {
            headers: {
                'access_token': accessToken
            }
        })
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

export async function getAllusers() {
    return new Promise((resolve, reject) => {
        axios.get(USER, {
            headers: {
                'access_token': accessToken
            }
        })
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

export async function changeProfilePic(data) {
    return new Promise((resolve, reject) => {
        axios.post(USER + `/changeprofile`, data, {
            headers: {
                'access_token': accessToken
            }
        })
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

export async function archiveUser(id) {
    return new Promise((resolve, reject) => {
        axios.delete(USER + `/${id}`, {
            headers: {
                'access_token': accessToken
            }
        })
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

export async function registerUser(id) {
    return new Promise((resolve, reject) => {
        axios.put(USER + `/approve/${id}`,{}, {
            headers: {
                'access_token': accessToken
            }
        })
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            })
            .catch((err) => {
                reject(err);
            })
    });
}