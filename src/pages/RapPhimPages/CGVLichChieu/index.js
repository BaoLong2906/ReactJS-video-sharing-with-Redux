import CGVNavHeader from "../../../components/CGVcomponents/CGVNavHeader";
import { Button, Form } from 'react-bootstrap';
import { useRef, useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router";
import CGVLichChieuCSS from '../../../pages/RapPhimPages/CGVLichChieu/CGVLichChieuCSS.css'
import CGVCardMovie from '../../../components/CGVcomponents/CGVCardMovie';
import PhimAPI from '../../../api/CGVapi/PhimAPI';

let CGVLichChieu = (props) => {
  let history = useHistory();
  let branch = localStorage.getItem('MaCN');
  let goAbroad;
  let optionID;
    if (branch === "HQ") {
      optionID = 1;
    }
    if (branch === "CN1") {
      optionID = 2;
    }
    if (branch === "CN2") {
      optionID = 3;
    }

    let handleOnChangeOption = (event) => {
      optionID = event.target.value;
      if (optionID == 1) {
        goAbroad = "HQ";
      }
      if (optionID == 2) {
        goAbroad = "CN1";
      }
      if (optionID == 3) {
        goAbroad = "CN2";
      }
      console.log(optionID)
      console.log(goAbroad)
      localStorage.setItem('MaCN', goAbroad);
      history.go(0);
    }

  let [phimListState, setPhimListState] = useState('');

  useEffect(() => {
    PhimAPI.requestPhimListByDateTime(localStorage.getItem('MaCN'), (result) => {
      setPhimListState(result.movies);
    });
  }, [])
  
  if (localStorage.getItem('MaChucVu') == null) {
    return (
      <>
      Hãy đăng nhập rồi quay lại
      </>
    );
  }

  if (localStorage.getItem('MaChucVu') !== 'NVBH') {
    return (
      <>
      Bạn không có thẩm quyền này.
      </>
    );
  }

  
  return (
    <>
    <CGVNavHeader/>
    <div className="grid-container">
      { Object.values(phimListState).map((phim) => {
        let movieID = phim.MaPhim;
        if( localStorage.getItem('MaCN') == 'CN2' && !phim.MaPhim.includes('_02')){
          movieID = phim.MaPhim + "_02";
        }
        console.log(movieID)
        return (
        <div className="grid-item" key={phim.MaSuatChieu}> 
          <CGVCardMovie imageLink={phim.HinhAnh} movieName={phim.TenPhim} movieID={movieID}/>
        </div>
        );
      })}
    </div>
    <Form.Select aria-label="Default select example" onChange={handleOnChangeOption} defaultValue={optionID}>
          <option value="1">HQ</option>
          <option value="2">Vincom Đà Nẵng</option>
          <option value="3">Big C Đà Nẵng</option>
      </Form.Select>

    </>
  );
}

export default CGVLichChieu;