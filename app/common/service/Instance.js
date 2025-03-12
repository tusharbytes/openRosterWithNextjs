import Cookies from "js-cookie";

const { default: axios } = require("axios");

const token = Cookies.get("access_token")
console.log(token)

const instance = axios.create({
    baseURL: "https://roaster.shopifystudio.xyz/api/",
    headers: {
        "Authorization": `Bearer ${token}`
    }
});
export default instance