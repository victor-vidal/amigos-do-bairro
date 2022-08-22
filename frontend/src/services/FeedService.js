import { apiUrl } from "../utils/apiUrl";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";


const getComplaintFeed = async (token) => {
    const response = await fetchWithTimeout(`${apiUrl}/complaints/`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (response.ok) return await response.json();;
    return null;
};

export { getComplaintFeed };
