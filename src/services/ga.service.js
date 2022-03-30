import API from "api/axios.config";

class GAService {
    getGA(projectId, metrics, dimensions, period) {
        return API.post(`/ga/${projectId}`, {
            metrics,
            dimensions,
            start: period[0],
            finish: period[1],
        });
    }

    getAccessToken() {
        return API.get(`/ga/access-token`);
    }
}

export default new GAService();
