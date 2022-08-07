import { apiUrl } from "../utils/apiUrl";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";


const signIn = async (username, password) => {
    const response = await fetchWithTimeout(`${apiUrl}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (response.ok) return await response.json();
    return null;
};


const checkAuth = async (token) => {
    const response = await fetchWithTimeout(`${apiUrl}/auth/check`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (response.ok) return true;
    return false;
};


export { signIn, checkAuth };
