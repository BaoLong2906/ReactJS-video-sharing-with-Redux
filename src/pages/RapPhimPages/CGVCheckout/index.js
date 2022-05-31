import CGVCheckoutCSS from "./CGVCheckoutCSS.css"
import CGVNavHeader from "../../../components/CGVcomponents/CGVNavHeader";
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import SeatAPI from '../../../api/CGVapi/SeatAPI';
import { Redirect, Route, useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
//import CGVTicket from "../../../components/CGVcomponents/CGVTicket";
import { deleteALLSeatPicked } from "../../../actions/CGVactions/seatAction";

let CGVCheckout = (props) => {
  
  let [ ticketListState, setTicketListState ] = useState('');

  let listSeatPicked = localStorage.getItem('listseat').split(",");
  let maSuatChieu = localStorage.getItem('MaSuatChieu');
  let maPhongChieu = localStorage.getItem('MaPhongChieu');

  let totalMoney = listSeatPicked.length * 50000;

  let history = useHistory();
  let deleteALLSeatPickedAction = deleteALLSeatPicked();
  let dispatch = useDispatch();
  let hanldeOnClickComeBack = () => {
    dispatch(deleteALLSeatPickedAction);
    history.goBack();
  }

  let inputRef = useRef('');
  

  let handleOnClickBuy = () => {
    if (inputRef.current.value === "") {
      alert("không được để trường số điện thoại trống");
      return;
    }
    console.log(inputRef.current.value)
    SeatAPI.requestBuyTicket(
      localStorage.getItem('MaCN'), 
      listSeatPicked, 
      maSuatChieu, 
      inputRef.current.value, 
      localStorage.getItem("MaNhanVien"), 
      (result) => {
        if (result.isSuccess === true) {
          history.push('/cgv/print-ticket');

        }
    });
    
  }

  return (
    <>
    <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    <CGVNavHeader/>
    <div className="grid-container-checkout">
        <div>Mã suất chiếu: <strong>{maSuatChieu}</strong></div>
        <div>Mã phòng chiếu: <strong>{maPhongChieu}</strong></div>
        <div>Những ghế chọn là:</div>
    {listSeatPicked.map((seat) => {

      return (
        <>
        <div className="grid-ticket-item">
          
        {seat}
        </div>
        
        </>
      );
    }
    )}
    <div>Tổng tiền: <strong> {totalMoney} VNĐ</strong></div>
    <div>SĐT của khách hàng:</div>
    <input type={"text"} placeholder={"số điện thoại của khách hàng"} ref={inputRef}/>
    <Button onClick={handleOnClickBuy}>In vé</Button>
    <Button onClick={hanldeOnClickComeBack}>Quay lại</Button>
    </div>
    
    </>
  );
}

export default CGVCheckout;