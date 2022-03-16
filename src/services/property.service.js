import API from "api/axios.config";

class PropertyService {
    getProperty(projectId, id) {
        return API.get(`/properties/${projectId}/${id ? "/" + id : ""}`);
    }
    saveProperty(projectId, id, data) {
        return API.put(`/properties/${projectId}/${id}`, data);
    }
    createProperty(projectId, data) {
        return API.post(`/properties/${projectId}`, data);
    }
    deleteProperty(projectId, id) {
        return API.delete(`/properties/${projectId}/${id}`);
    }
    saveStatus(projectId, id, data) {
        return API.put(`/properties/${projectId}/status/${id}`, data);
    }
}

export default new PropertyService();
