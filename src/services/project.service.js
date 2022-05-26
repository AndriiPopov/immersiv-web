import API from "api/axios.config";

class ProjectService {
    getProject(id) {
        return API.get(`/projects${id ? "/" + id : ""}`);
    }

    getProjectByUrl(id) {
        return API.get(`/projects/url/${id}`);
    }

    getFeaturedProject() {
        return API.get(`/projects/url/__featured__`);
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

    addMedia(id, data) {
        return API.post(`/projects/${id}/media`, data);
    }
    deleteMedia(id, mediaId) {
        return API.delete(`/projects/${id}/media/${mediaId}`);
    }
    moveMedia(id, mediaId, down) {
        return API.put(`/projects/${id}/media/${mediaId}`, null, {
            params: { down: down ? "true" : "false" },
        });
    }
}

export default new ProjectService();
