import axios from 'axios';
import axiosClient from './axiosClient';
import { BE_RAPPHIM_API_URL } from './axiosClient';

class SigninAPI {

  static requestAuthWithEmailAndPassword = (email, password, branch, callback) => {
      

      axios.post(BE_RAPPHIM_API_URL + "/login", {email: email, password: password, branch: branch})
      .then(res => {

          console.log("đã nhận json data từ server thông qua requestAuthWithEmailAndPassword !");
          //console.log(res);
          console.log(res.data);

          // nếu không tồn tại trường báo lỗi errorLogin
          if (!res.data.errorLogin) {
              localStorage.setItem('accessToken', res.data.accessToken);
              localStorage.setItem('refreshToken', res.data.refreshToken);
              localStorage.setItem('username', res.data.username);
              localStorage.setItem('MaNhanVien', res.data.MaNhanVien);
              localStorage.setItem('MaChucVu', res.data.MaChucVu);
          }

          // nếu tồn tại trường báo lỗi errorLogin
          if (res.data.errorLogin) {
              alert(res.data.errorLogin);
              return;
          }
            
          callback("done");
      })    
  }

    
}


export default SigninAPI;