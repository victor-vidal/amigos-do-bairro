import { apiUrl } from "../utils/apiUrl";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";


const getComplaintCategories = async (token) => {
    const response = await fetchWithTimeout(`${apiUrl}/complaints/categories`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (response.ok) return await response.json();;
    return null;
};

export { getComplaintCategories };
