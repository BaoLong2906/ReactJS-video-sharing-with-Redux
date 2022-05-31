import CGVPickSeatCSS from './CGVPickSeatCSS.css';
import CGVNavHeader from "../../../components/CGVcomponents/CGVNavHeader";
import { Button, Form } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import SeatAPI from '../../../api/CGVapi/SeatAPI';
import { Redirect, Route, useHistory, useParams } from "react-router";
import CGVSeat from "../../../components/CGVcomponents/CGVSeat";
import { useDispatch, useSelector } from "react-redux";

let CGVPickSeat = (props) => {

  let [seatListState, setSeatListState] = useState('');
  let ListSeatPickedState = useSelector(state => state.seatReducer.ListSeatPicked);
  let urlParams = useParams();
  let history = useHistory();
  let masuatchieu = urlParams.masuatchieu;

  useEffect(() => {
    SeatAPI.requestSeatListByMaSuatChieu(localStorage.getItem('MaCN'), masuatchieu, (result) => {
      setSeatListState(result.seat);
    });
  }, [])

  let handleOnClick = () => {
    if (localStorage.getItem('listseat') === undefined || localStorage.getItem('listseat') === "") {
      alert('cart của bạn đang trống, không thể checkout !');
      return;
    }
    history.push("/cgv/checkout");
  }

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
    <div className='grid-container-screen'>
      <div className='grid-screen'>Screen</div>
    </div>
    <div className='grid-container-seat'>
    {Object.values(seatListState).map((seat) => {
        return (
          <>
          <CGVSeat MaSlot={seat.MaSlot} TrangThaiSlot={seat.TrangThaiSlot} MaSlotTheoSuatChieu={seat.MaSlotTheoSuatChieu}/>
          </>
        )
    })}
    </div>
    
    <div className='grid-bottom'>
      <div className='grid-text1'>Explain:</div>
      <div className='grid-explain-uncheck-seat'></div>
      <div className='grid-text2'>Ghế còn trống</div>
      <div className='grid-explain-checked-seat'></div>
      <div className='grid-text3'>Ghế đã được mua</div>
      <div className='grid-explain-chose-seat'></div>
      <div className='grid-text4'>Ghế đang chọn</div>
      <div className='grid-button'><Button onClick={handleOnClick}>Checkout</Button></div>
    </div>
    </>
  );
}

export default CGVPickSeat;