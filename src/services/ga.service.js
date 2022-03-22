import API from "api/axios.config";

class GAService {
    getGA(projectId, data) {
        return API.post(`/ga/${projectId}`, data);
    }
}

export default new GAService();
