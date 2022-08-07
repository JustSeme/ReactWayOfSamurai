import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '94903ebe-57b5-4d2f-abcd-1ef2c44b023f'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    followRequest(id) {
        return instance.post(`follow/${id}`).then(response => response.data)
    },
    unfollowRequest(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    }
}