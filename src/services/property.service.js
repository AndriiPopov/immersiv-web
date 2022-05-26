import API from "api/axios.config";

class PropertyService {
    getProperty(projectId, id) {
        return API.get(`/properties/${projectId}/${id ? "/" + id : ""}`);
    }
    saveProperty(projectId, id, data) {
        return API.put(`/properties/${projectId}/${id}`, data);
    }
    createProperty(projectId, id) {
        return API.post(`/properties/${projectId}`, { id });
    }
    deleteProperty(projectId, ids) {
        return API.post(`/properties/${projectId}/delete`, { ids });
    }
    saveStatus(projectId, id, data) {
        return API.put(`/properties/${projectId}/status/${id}`, data);
    }
}

export default new PropertyService();
