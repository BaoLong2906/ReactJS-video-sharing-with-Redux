import CGVAdminQuanlySuatChieuCSS from './CGVAdminQuanlySuatChieuCSS.css'
import CGVAdminNav from '../../../../components/CGVcomponents/CGVAdminNav';
import CGVModalEditAndDeleteSuatChieu from '../../../../components/CGVcomponents/CGVModalEditAndDelete/CGVModalEditAndDeleteSuatChieu';
import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SuatChieuAPI from "../../../../api/CGVapi/SuatChieuAPI";
import CGVModalCreateSuatChieu from '../../../../components/CGVcomponents/CGVModalCreate/CGVModalCreateSuatChieu';

let CGVAdminQuanLySuatChieu = () => {

  let [suatChieuListState, setSuatChieuListState] = useState([]);

  useEffect(() => {
    SuatChieuAPI.requestAllSuatChieuList(localStorage.getItem('MaCN'), (result) => {
      setSuatChieuListState(result.suatchieus);
    })
  }, []);

  return (
    <>
    <CGVAdminNav/>

    <div className='grid-container'>
        <div className='grid-item-1'>
          <CGVModalCreateSuatChieu />
        </div>
    </div>

    <div className='grid-container'>
        <div className='grid-item-1'>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã suất chiếu</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Gía vé</th>
            <th>Mã Phim</th>
          </tr>
          </thead>
          <tbody>
            {Object.values(suatChieuListState).map(suatchieu => {
              let thoiGianBatBauClearForm = suatchieu.ThoiGianBatDau.replace('Z', '').replace('T', ' ');
              let day1 = new Date(thoiGianBatBauClearForm);
              let dateNgayKhoiChieu = day1.toLocaleDateString() + ' ' + day1.toLocaleTimeString();
            
              let thoiGianKetThucClearForm = suatchieu.ThoiGianKetThuc.replace('Z', '').replace('T', ' ');
              let day2 = new Date(thoiGianKetThucClearForm);
              let dateNgayKetThuc = day2.toLocaleDateString() + ' ' + day2.toLocaleTimeString();

              return (
                <>
                  <tr>
                    <td>{suatchieu.MaSuatChieu}</td>
                    <td>{dateNgayKhoiChieu}</td>
                    <td>{dateNgayKetThuc}</td>
                    <td>{suatchieu.GiaVe}</td>
                    <td>{suatchieu.MaPhim}</td>
                    <td>
                      <CGVModalEditAndDeleteSuatChieu
                        MaSuatChieu={suatchieu.MaSuatChieu}
                        ThoiGianBatDau={dateNgayKhoiChieu}
                        ThoiGianKetThuc={dateNgayKetThuc}
                        GiaVe={suatchieu.GiaVe}
                        MaPhim={suatchieu.MaPhim}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default CGVAdminQuanLySuatChieu;