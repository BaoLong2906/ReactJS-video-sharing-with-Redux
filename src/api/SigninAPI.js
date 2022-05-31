import axios from 'axios';
import axiosClient from './axiosClient';
import { REACT_APP_API_URL } from './axiosClient';

class SigninAPI {

  static requestAuthWithEmailAndPassword = (email, password, callback) => {
      
    //axios.get("http://localhost:5000/",{ok: 'ok'});

      axios.post(REACT_APP_API_URL + "/login", { email, password })
      .then(res => {

          console.log("đã nhận json data từ server thông qua requestAuthWithEmailAndPassword !");
          //console.log(res);
          console.log(res.data);

          // nếu không tồn tại trường báo lỗi errorLogin
          if (!res.data.errorLogin) {
              localStorage.setItem('accessToken', res.data.accessToken);
              localStorage.setItem('refreshToken', res.data.refreshToken);
              localStorage.setItem('username', res.data.username);
              localStorage.setItem('userid', res.data.id);
              localStorage.setItem('role', res.data.role);
              localStorage.setItem('profileurl', res.data.profileurl);
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