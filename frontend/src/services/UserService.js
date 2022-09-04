import { api } from "./Api";


const getUsers = async () => {
    const response = await api.get("/users");

    if (response.status === 200) return response.data;
    return;
};

const updateUser = async (id, data) => {
    const response = await api.patch(`/users/${id}`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.status === 200) return response.data;
    return;
};

const createUser = async (data) => {
    const response = await api.post(`/users`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.status === 201) return response.data;
    return;
}

export { getUsers, updateUser, createUser };
