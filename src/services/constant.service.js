import API from "api/axios.config";

class ConstantService {
    getConstant() {
        return API.get(`/constant`);
    }
    saveConstant(data) {
        return API.put(`/constant`, data);
    }
}

export default new ConstantService();
