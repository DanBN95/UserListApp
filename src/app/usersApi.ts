import axios from "axios";
import { USERS_BASE_URL } from "../../config";

const usersApi = axios.create({
    baseURL: USERS_BASE_URL,
    timeout: 6 * 1000
});

export default usersApi;