import API from "api/axios.config";

class ProjectService {
    signUrl() {
        return API.get("/utils/sign-s3");
    }
}

export default new ProjectService();
