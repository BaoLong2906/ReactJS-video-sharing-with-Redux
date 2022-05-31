import axios from 'axios';
import axiosClient from './axiosClient';
import { BE_RAPPHIM_API_URL } from './axiosClient';

class PhimAPI {

  static requestPhimList = (branch, callback) => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //let curentTime = date+' '+time; 
    console.log(date);
    axios.post(BE_RAPPHIM_API_URL + '/phim/get-list-phim', {date: date, branch: branch}).then((res) => {
      console.log("đã nhận json data từ server thông qua requestPhimList !");
          //console.log(res);
          console.log(res.data);
          callback(res.data);
    });
  }

  static requestPhimListByDateTime = (branch, callback) => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //let curentTime = date+' '+time; 
    console.log(date);
    axios.post(BE_RAPPHIM_API_URL + '/phim/get-list-phim-by-date-time', {date: date, branch: branch}).then((res) => {
      console.log("đã nhận json data từ server thông qua requestPhimListByDateTime !");
          //console.log(res);
          console.log(res.data);
          callback(res.data);
    });
  }

  static requestSuatChieuByPhimIdAndDate = (branch, movieID, date, callback) => {
    axios.post(BE_RAPPHIM_API_URL + '/phim/get-suat-chieu-by-movieid-and-date', {date: date, movieID: movieID, branch: branch}).then((res) => {
      console.log("đã nhận json data từ server thông qua requestSuatChieuByPhimIdAndDate !");
      console.log(res.data);
      callback(res.data);
    });
  }

  static requestUpdatePhim = (branch, MaPhim, TenPhim, Mota, NhaSX, NgayKhoiChieu, NgayKetThuc, QuocGia, DaoDien, HinhAnh, ThoiLuong, MaCN, callback) => {
    axios.post(BE_RAPPHIM_API_URL + '/phim/update-phim', {
      MaPhim: MaPhim,
      TenPhim: TenPhim,
      Mota: Mota,
      NhaSX: NhaSX,
      NgayKhoiChieu: NgayKhoiChieu,
      NgayKetThuc: NgayKetThuc,
      QuocGia: QuocGia,
      DaoDien: DaoDien,
      HinhAnh: HinhAnh,
      ThoiLuong: ThoiLuong,
      MaCN: MaCN,
      branch: branch
    }).then((res) => {
      console.log("đã nhận json data từ server thông qua requestUpdatePhim !");
      console.log(res.data);
      callback(res.data);
    });
  }

  static requestInsertPhim = (branch, MaPhim, TenPhim, Mota, NhaSX, NgayKhoiChieu, NgayKetThuc, QuocGia, DaoDien, HinhAnh, ThoiLuong, MaCN, callback) => {
    axios.post(BE_RAPPHIM_API_URL + '/phim/insert-phim', {
      MaPhim: MaPhim,
      TenPhim: TenPhim,
      Mota: Mota,
      NhaSX: NhaSX,
      NgayKhoiChieu: NgayKhoiChieu,
      NgayKetThuc: NgayKetThuc,
      QuocGia: QuocGia,
      DaoDien: DaoDien,
      HinhAnh: HinhAnh,
      ThoiLuong: ThoiLuong,
      MaCN: MaCN,
      branch: branch
    }).then((res) => {
      console.log("đã nhận json data từ server thông qua requestInsertPhim !");
      console.log(res.data);
      callback(res.data);
    });
  }

}

export default PhimAPI;