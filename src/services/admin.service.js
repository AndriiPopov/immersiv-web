import API from "api/axios.config";

class AdminService {
    getAdmin() {
        return API.get(`/admins`);
    }

    createAdmin(data) {
        return API.post(`/admins`, data);
    }

    deleteAdmin(id) {
        return API.delete(`/admins/${id}`);
    }
}

export default new AdminService();
