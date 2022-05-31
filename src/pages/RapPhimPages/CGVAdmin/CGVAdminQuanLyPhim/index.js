import CGVAdminQuanlyPhimCSS from './CGVAdminQuanlyPhimCSS.css'
import CGVAdminNav from '../../../../components/CGVcomponents/CGVAdminNav';
//import CGVModalEditPhim from '../../../../components/CGVcomponents/CGVModalEditPhim';
import CGVModalEditAndDeletePhim from '../../../../components/CGVcomponents/CGVModalEditAndDelete/CGVModalEditAndDeletePhim';
import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PhimAPI from "../../../../api/CGVapi/PhimAPI";
import CGVModalCreatePhim from '../../../../components/CGVcomponents/CGVModalCreate/CGVModalCreatePhim';

let CGVAdminQuanlyPhim = () => {

  let [phimListState, setPhimListState] = useState([]);

  useEffect(() => {
    PhimAPI.requestPhimList(localStorage.getItem('MaCN'), (result) => {
      setPhimListState(result.movies);
    })
  }, []);



    return (
      <>
      <CGVAdminNav/>

      <div className='grid-container'>
        <div className='grid-item-1'>
          <CGVModalCreatePhim/>
        </div>
      </div>

      <div className='grid-container'>
        {/* <CGVModalEditPhim/> */}
        <div className='grid-item-1'>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã phim</th>
            <th>Tên phim</th>
            <th>Mô tả</th>
            <th>NSX</th>
            <th>Ngày khởi chiếu</th>
            <th>Ngày kết thúc</th>
            <th>Quốc gia</th>
            <th>Đạo diễn</th>
            <th>Hình ảnh</th>
            <th>Thời lượng</th>
            <th>Mã chi nhánh</th>
          </tr>
          </thead>
          <tbody>
            {Object.values(phimListState).map(phim => {
              let NgayKhoiChieuClearForm = phim.NgayKhoiChieu.replace('Z', '').replace('T', ' ');
              let day1 = new Date(NgayKhoiChieuClearForm);
              let dateNgayKhoiChieu = day1.toLocaleDateString();
            
              let NgayKetThucClearForm = phim.NgayKetThuc.replace('Z', '').replace('T', ' ');
              let day2 = new Date(NgayKetThucClearForm);
              let dateNgayKetThuc = day2.toLocaleDateString();

              return (
                <>
                  <tr>
                    <td>{phim.MaPhim}</td>
                    <td>{phim.TenPhim}</td>
                    <td>{phim.Mota}</td>
                    <td>{phim.NhaSX}</td>
                    <td>{dateNgayKhoiChieu}</td>
                    <td>{dateNgayKetThuc}</td>
                    <td>{phim.QuocGia}</td>
                    <td>{phim.DaoDien}</td>
                    <td>{phim.HinhAnh}</td>
                    <td>{phim.ThoiLuong}</td>
                    <td>{phim.MaCN}</td>
                    <td>
                      <CGVModalEditAndDeletePhim
                        MaPhim={phim.MaPhim}
                        TenPhim={phim.TenPhim}
                        Mota={phim.Mota}
                        NhaSX={phim.NhaSX}
                        NgayKhoiChieu={dateNgayKhoiChieu}
                        NgayKetThuc={dateNgayKetThuc}
                        QuocGia={phim.QuocGia}
                        DaoDien={phim.DaoDien}
                        HinhAnh={phim.HinhAnh}
                        ThoiLuong={phim.ThoiLuong}
                        MaCN={phim.MaCN}
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
    )

}

export default CGVAdminQuanlyPhim;