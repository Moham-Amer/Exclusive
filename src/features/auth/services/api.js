import { httpClient } from '../../../lib/axios';
import { userStorage } from '../storage';

class AuthServices {
    #loginEndPoint = 'https://api.escuelajs.co/api/v1/auth/login'
    #signUpEndPoint = 'https://api.escuelajs.co/api/v1/users'
    #userEndPoint = 'https://api.escuelajs.co/api/v1/auth/profile'

    async signUp(payload) {
        const response = await httpClient.post(this.#signUpEndPoint, payload);
        return response.data;
    }

    async login(payload) {
        const response = await httpClient.post(this.#loginEndPoint, payload);
        return response.data;
    }

    async getMe() {
        const id = userStorage.get()
        const response = await httpClient.get(`${this.#userEndPoint}?id=${id}}`);
        return response.data;
    }
}

export default new AuthServices;