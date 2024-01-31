import http from "./httpService";
import config from "./config.json";

export const loginService = data => {
    return http.post(`${config.api}/login`, data)
}
