import { useEffect, useState } from 'react';
import SeatAPI from '../../../api/CGVapi/SeatAPI';
import getThuTrongTuan from '../../../helper/GetThuTrongTuan';


let CGVTicket = ({maSuatChieu, maPhongChieu, maSlot}) => {
	// console.log(maSuatChieu + ' ' + maSlot)

  let [ticketState, setTicketState] = useState('');
  let ThoiGianBatDau;
  let ThoiGianKetThuc;
  let timeFrom;
  let timeTo;

  useEffect(() => {
    SeatAPI.requestPrintTicketByMaSlotAndMaSuatChieu(localStorage.getItem('MaCN'), maSlot, maSuatChieu, (result) => {
      console.log(result.tickets);
      setTicketState(result.tickets);
    });
  }, []);

  ThoiGianBatDau = ticketState[0]?.ThoiGianBatDau?.replace('Z', '').replace('T', ' ');
  console.log(ThoiGianBatDau)
  timeFrom = new Date(ThoiGianBatDau);
  ThoiGianBatDau = timeFrom?.toLocaleTimeString();

  ThoiGianKetThuc = ticketState[0]?.ThoiGianKetThuc?.replace('Z', '').replace('T', ' ');
  timeTo = new Date(ThoiGianKetThuc);
  ThoiGianKetThuc = timeTo?.toLocaleTimeString();

  return (
    <>
    <div class="ticket">
	<div class="left">
		<div class="image">
			<p class="admit-one">
				<span>ADMIT ONE</span>
				<span>ADMIT ONE</span>
				<span>ADMIT ONE</span>
			</p>
			<div class="ticket-number">
				<p>
          Ticket number: 
					{ticketState[0]?.MaSlotTheoSuatChieu + '_' + ticketState[0]?.MaSuatChieu}
				</p>
			</div>
		</div>
		<div class="ticket-info">
			<p class="date">
				<span>{getThuTrongTuan(ThoiGianBatDau)}</span>
				<span class="june-29">{getThuTrongTuan(ThoiGianBatDau) + ' ' + timeFrom?.getDate()}</span>
				<span>{timeFrom.getFullYear()}</span>
			</p>
			<div class="show-name">
				<h1>{ticketState[0]?.TenPhim}</h1>
				<h2>Phòng chiếu: {ticketState[0]?.MaPhongChieu} - Vị trí ghế: {ticketState[0]?.MaSlot}</h2>
			</div>
			<div class="time">
				{/* <p>8:00 PM <span>TO</span> 11:00 PM</p> */}
        <p>{ThoiGianBatDau} <span>TO</span> {ThoiGianKetThuc}</p>
				<p>Vị trí ghế ngồi <span>@</span> {ThoiGianBatDau}</p>
			</div>
			<p class="location"><span>{ticketState[0]?.DiaChi}</span>
				<span class="separator"><i class="far fa-smile"></i></span><span>Đà Nẵng, Việt Nam</span>
			</p>
		</div>
	</div>
	<div class="right">
		<p class="admit-one">
			<span>ADMIT ONE</span>
			<span>ADMIT ONE</span>
			<span>ADMIT ONE</span>
		</p>
		<div class="right-info-container">
			<div class="show-name">
				<h1>{ticketState[0]?.DiaChi}</h1>
			</div>
			<div class="time">
        <p>{ThoiGianBatDau} <span>TO</span> {ThoiGianKetThuc}</p>
				<p>DOORS <span>@</span> {ThoiGianBatDau}</p>
			</div>
			<div class="barcode">
				
			</div>
			<p class="ticket-number">
        Ticket number: 
				{ticketState[0]?.MaSlotTheoSuatChieu + '_' + ticketState[0]?.MaSuatChieu}
			</p>
		</div>
	</div>
</div>
    </>
  );
}

export default CGVTicket;