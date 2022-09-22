import { api } from "./Api";


const getComplaintFeed = async () => {
    const response = await api.get("/complaints");

    if (response.status === 200) return response.data;
    return;
};

const postComplaint = async (data) => {
    const response = await api.post("/complaints", data, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.status === 201) return response.data;
    return;
};

const resolveComplaint = async (complaintId) => {
    const response = await api.patch("/complaints/" + complaintId, {
        "resolved": true
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.status === 200;
};

export { getComplaintFeed, postComplaint, resolveComplaint };
