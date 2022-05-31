import axios from 'axios';
import { REACT_APP_API_URL } from '../api/axiosClient';

let http =  axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json"
    }
});

class UploadFilesService {
    upload(file, onUploadProgress) {
      let formData = new FormData();
  
      formData.append("file", file);
  
      return http.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    }
  
    getFiles() {
      return http.get("/files");
    }
}
  
  
export default new UploadFilesService();