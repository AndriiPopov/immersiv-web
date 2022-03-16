import API from "api/axios.config";

class ProjectService {
    getProject(id) {
        return API.get(`/projects${id ? "/" + id : ""}`);
    }

    getProjectByUrl(id) {
        return API.get(`/projects/url/${id}`);
    }

    getFeaturedProject() {
        return API.get(`/projects/__featured__`);
    }
    saveProject(id, data) {
        return API.put(`/projects/${id}`, data);
    }
    createProject(data) {
        return API.post(`/projects`, data);
    }
    deleteProject(id) {
        return API.delete(`/projects/${id}`);
    }
}

export default new ProjectService();
