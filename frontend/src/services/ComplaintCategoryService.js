import { api } from "./Api";


const getComplaintCategories = async (token) => {
    const response = await api.get("/categories");

    if (response.status === 200) return response.data;
    return;
};

export { getComplaintCategories };
