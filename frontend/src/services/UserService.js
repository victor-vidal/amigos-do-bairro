import { apiUrl } from "../utils/apiUrl";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";


const getCurrentUser = async (token) => {
    const response = await fetchWithTimeout(`${apiUrl}/users/me`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (response.ok) return await response.json();
    return;
};

export { getCurrentUser };
