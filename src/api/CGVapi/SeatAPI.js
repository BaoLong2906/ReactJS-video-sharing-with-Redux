import axios from 'axios';
import axiosClient from './axiosClient';
import { BE_RAPPHIM_API_URL } from './axiosClient';

class SeatAPI {
    static requestSeatListByMaSuatChieu = (branch, masuatchieu, callback) => {
        axios.post(BE_RAPPHIM_API_URL + '/seat/get-list-seat-by-ma-suat-chieu', {masuatchieu: masuatchieu, branch: branch}).then((res) => {
          console.log("đã nhận json data từ server thông qua requestSeatListByMaSuatChieu !");
          console.log(res.data);
          callback(res.data);
        });
    }

    static requestBuyTicket = (branch, listseat, masuatchieu, sdtclient, manhanvien, callback) => {
      axios.post(BE_RAPPHIM_API_URL + '/seat/buy-seat', {listseat: listseat, masuatchieu: masuatchieu, sdtclient: sdtclient, manhanvien: manhanvien, branch: branch}).then((res) => {
        console.log("đã nhận json data từ server thông qua requestBuyTicket !");
        console.log(res.data);
        callback(res.data);
      });
    }

    static requestPrintTicketByMaSlotAndMaSuatChieu = (branch, MaSlot, MaSuatChieu, callback) => {
      axios.post(BE_RAPPHIM_API_URL + '/seat/print-ticket', {MaSlot: MaSlot, MaSuatChieu: MaSuatChieu, branch: branch}).then((res) => {
        console.log("đã nhận json data từ server thông qua requestPrintTicketByMaSlotAndMaSuatChieu !");
        console.log(res.data);
        callback(res.data);
      });
    }

    static requestFindSeatSold = (branch, callback) => {
      axios.post(BE_RAPPHIM_API_URL + '/seat/get-seat-sold', { branch: branch}).then((res) => {
        console.log("đã nhận json data từ server thông qua requestFindSeatSold !");
        console.log(res.data);
        callback(res.data);
      });
    }
}

export default SeatAPI;