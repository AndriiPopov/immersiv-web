import API from "api/axios.config";

class ProjectService {
    signUrl(isVideo) {
        return API.get("/utils/sign-s3", { params: { isVideo: !!isVideo } });
    }
}

export default new ProjectService();
