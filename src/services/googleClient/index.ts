import { Client } from "@googlemaps/google-maps-services-js";
import axios from "axios";

const axiosInstance = axios.create({
    timeout: 10000,
    headers: {
        "Accept-Encoding": "gzip",
    },
});

const googleClient = new Client({ axiosInstance });

export { googleClient };