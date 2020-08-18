import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://node-express-env.eba-cth7sfse.us-east-1.elasticbeanstalk.com/"
});

export default axiosInstance;