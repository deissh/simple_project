import axios, { Axios } from 'axios';

interface payRequest {
    cc_number: number;
    cc_owner: string;
    cc_exp_date: string;
    cc_cvv: number;
    amount: number;
}

interface payResponse {
    requestId: string;
    amount: number;
}

class Api {
    private client: Axios;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
        });
    }

    public async pay(data: payRequest): Promise<payResponse> {
        console.log(data);
        const req = await this.client.post('/pay', data);
        // todo: response mapping && validation
        return req.data;
    }
}

const BASE_URL = 'http://localhost:2233';
export const api = new Api(BASE_URL);