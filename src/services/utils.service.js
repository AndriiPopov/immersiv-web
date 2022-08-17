import API from "api/axios.config";

class ProjectService {
    signUrl(isVideo, isLogo) {
        return API.get("/utils/sign-s3", {
            params: { isVideo: !!isVideo, isLogo: !!isLogo },
        });
    }
}

export default new ProjectService();
