import axios from 'axios';
import axiosClient from './axiosClient';
import { BE_RAPPHIM_API_URL } from './axiosClient';

class PhongChieuAPI {
  static requestAllPhongChieuList = (branch, callback) => {
    axios.post(BE_RAPPHIM_API_URL + '/phongchieu/get-list-phongchieu', {branch: branch}).then((res) => {
      console.log("đã nhận json data từ server thông qua requestAllPhongChieuList !");
          //console.log(res);
          console.log(res.data);
          callback(res.data);
    });
  }

  // static requestAllSlotByMaPhongChieu = (MaPhongChieu, branch, callback) => {
  //   axios.post(BE_RAPPHIM_API_URL + '/phongchieu/get-list-slot-by-maphongchieu', {MaPhongChieu: MaPhongChieu, branch: branch}).then((res) => {
  //     console.log("đã nhận json data từ server thông qua requestAllSlotByMaPhongChieu !");
  //         //console.log(res);
  //         console.log(res.data);
  //         callback(res.data);
  //   });
  // }
}

export default PhongChieuAPI;