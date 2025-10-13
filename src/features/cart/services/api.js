import { httpClient } from '../../../lib/axios';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

class ProductsService {
    #endPoint = 'https://api.escuelajs.co/api/v1/products'

    async getAll() {
        await sleep(1000);
        const response = await httpClient.get(this.#endPoint);
        return response.data
    }

    async getById(id) {
        await sleep(1000);
        const response = await httpClient.get(`${this.#endPoint}?id=${id}`);
        return response.data
    }

    // async create(payload) {
    //     const response = await httpClient.post(this.#endPoint, payload);
    //     return response.data
    // }

    // async update(id, payload) {
    //     const response = await httpClient.put(`${this.#endPoint}/${id}`, payload);
    //     return response.data
    // }

    // async delete(id) {
    //     const response = await httpClient.delete(`${this.#endPoint}/${id}`);
    //     return response.data
    // }

}

export default new ProductsService();