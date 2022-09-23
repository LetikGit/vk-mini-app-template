import axios from "axios";
import {API_DOMAIN} from "../../const";

export async function getUser(userId) {
    await axios.get(`${API_DOMAIN}/users/`, {
        params: {
            vkId: userId,
        },
        headers: {
            'X-VK-Params': window.location.search,
        },
    }).then((response) => {
        console.log(response.data.data)
    }).catch((err) => {
        console.error(err);
    });
}