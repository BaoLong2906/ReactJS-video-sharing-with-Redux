import { useDispatch, useSelector } from "react-redux";
import { pickSeat, unpickSeat } from "../../../actions/CGVactions/seatAction";
import { useRef, useState, useEffect } from 'react';
import { saveMaPhongChieu } from '../../../actions/CGVactions/phimAction';


let CGVSeat = ({ TrangThaiSlot, MaSlot, MaSlotTheoSuatChieu }) => {
  
  let ListSeatPickedState = useSelector(state => state.seatReducer.ListSeatPicked);
  let [isPickState, setIsPickState] = useState(false);
  let color = {
    white: "rgba(255, 255, 255, 0.8)",
    red: "rgba(251, 0, 0, 0.8)",
    yellow: "rgba(255, 204, 0, 0.8)"
  }


  let dispatch = useDispatch();
  console.log(ListSeatPickedState);

  let pickSeatAction   = pickSeat(MaSlot);
  let unpickSeatAction = unpickSeat(MaSlot);

  let maPhongChieu = MaSlot.substring(0, 2);
  let saveMaPhongChieuAction = saveMaPhongChieu(maPhongChieu);
  dispatch(saveMaPhongChieuAction);

  let backgroundColor = color.white;
  if (TrangThaiSlot === 1) {
    backgroundColor = color.red;
  }
  if (isPickState === true) {
    backgroundColor = color.yellow;
  }
  

  let handleOnClick = () => {
    if (TrangThaiSlot === 1) {
      alert('Ghế này đã được đặt');
      return;
    }
    if (isPickState === false) {
      dispatch(pickSeatAction);
      setIsPickState(true);
      return;
    }
    dispatch(unpickSeatAction);
    setIsPickState(false);
  }

  return (
    <>
    <div 
      className='grid-seat'
      onClick={handleOnClick}
      style={{backgroundColor: backgroundColor}}
    >
      {MaSlot}
    </div>
    </>
  );
}

export default CGVSeat;