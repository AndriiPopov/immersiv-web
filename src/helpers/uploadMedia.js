import axios from "axios";
import toast from "react-hot-toast";
import utilsService from "services/utils.service";

const uploadMedia =
    (cb, isVideo, isLogo) =>
    async ({
        action,
        data,
        file,
        filename,
        headers,
        onError,
        onProgress,
        onSuccess,
        withCredentials,
    }) => {
        try {
            const res = await utilsService.signUrl(isVideo, isLogo);

            axios
                .put(res.data.signedRequest, file, {})
                .then((s3res) => {
                    cb({ url: res.data.url, thumbnail: res.data.thumbnail });
                    onSuccess(res.data.thumbnail);
                })
                .catch((err) => {
                    console.log(err.message);
                    onError();
                });
        } catch (error) {
            onError();
            toast.error(error.message);
        }
    };

export default uploadMedia;
