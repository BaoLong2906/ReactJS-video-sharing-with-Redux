import axios from 'axios';
import axiosClient from './axiosClient';
import { BE_RAPPHIM_API_URL } from './axiosClient';

class SuatChieuAPI {
  static requestAllSuatChieuList = (branch, callback) => {
    axios.post(BE_RAPPHIM_API_URL + '/suatchieu/get-list-suatchieu', {branch: branch}).then((res) => {
      console.log("đã nhận json data từ server thông qua requestAllSuatChieuList !");
          //console.log(res);
          console.log(res.data);
          callback(res.data);
    });
  }

  static requestUpdateSuatChieu = (branch, MaSuatChieu, ThoiGianBatDau, ThoiGianKetThuc, GiaVe, MaPhim, callback) => {
    axios.post(BE_RAPPHIM_API_URL + '/suatchieu/update-suatchieu', {
      MaSuatChieu: MaSuatChieu,
      ThoiGianBatDau: ThoiGianBatDau,
      ThoiGianKetThuc: ThoiGianKetThuc,
      GiaVe: GiaVe,
      MaPhim: MaPhim,
      branch: branch
    }).then((res) => {
      console.log("đã nhận json data từ server thông qua requestUpdateSuatChieu !");
      console.log(res.data);
      callback(res.data);
    });
  }

  static requestAddSuatChieu = (branch, MaSuatChieu, ThoiGianBatDau, ThoiGianKetThuc, GiaVe, MaPhim, MaPhongChieu, callback) => {
    axios.post(BE_RAPPHIM_API_URL + '/suatchieu/add-suatchieu', {
      MaSuatChieu: MaSuatChieu,
      ThoiGianBatDau: ThoiGianBatDau,
      ThoiGianKetThuc: ThoiGianKetThuc,
      GiaVe: GiaVe,
      MaPhim: MaPhim,
      MaPhongChieu: MaPhongChieu,
      branch: branch
    }).then((res) => {
      console.log("đã nhận json data từ server thông qua requestSuatChieu !");
      console.log(res.data);
      callback(res.data);
    });
  }

  static requestDeleteSuatChieuByMaSuatChieu = (branch, MaSuatChieu, callback) => {
    axios.post(BE_RAPPHIM_API_URL + '/suatchieu/delete-suatchieu-by-masuatchieu', {
      MaSuatChieu: MaSuatChieu,
      branch: branch
    }).then((res) => {
      console.log("đã nhận json data từ server thông qua requestDeleteSuatChieuByMaSuatChieu !");
      console.log(res.data);
      callback(res.data);
    });
  }

}

export default SuatChieuAPI;