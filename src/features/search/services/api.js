import { httpClient } from "../../../lib/axios";


class SearchProductsService {
    #endPoint = '/products';

    async search(title) {
        const response = await httpClient.get(this.#endPoint, {
            params: { title }
        });
        return response.data
    }
}

export default new SearchProductsService()