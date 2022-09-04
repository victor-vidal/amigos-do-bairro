import axios from "axios";


const api = axios.create({
    baseURL: "https://6314e8cdfa82b738f75084b1.mockapi.io/api/v1",
    timeout: 60000,
    timeoutErrorMessage: "Request timeout"
});

export { api };
