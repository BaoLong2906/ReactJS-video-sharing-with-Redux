import { Container, Row, Col, Image, Tab, Tabs, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect, Route, useHistory } from "react-router";
import PhimAPI from "../../../../api/CGVapi/PhimAPI";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


let CGVModalEditAndDeletePhim = ({MaPhim, TenPhim, Mota, NhaSX, NgayKhoiChieu, NgayKetThuc, QuocGia, DaoDien, HinhAnh, ThoiLuong, MaCN}) => {
  
  const [show, setShow] = useState(false);

  let [maPhimState, setMaPhimState] = useState(MaPhim);
  let [tenPhimState, setTenPhimState] = useState(TenPhim);
  let [motaState, setMotaStae] = useState(Mota);
  let [nhaSXState, setNhaSXState] = useState(NhaSX);
  let [ngayKhoiChieuState, setNgayKhoiChieuState] = useState(NgayKhoiChieu);
  let [ngayKetThucState, setNgayKetThucState] = useState(NgayKetThuc);
  let [quocGiaState, setQuocGiaState] = useState(QuocGia);
  let [daoDienState, setDaoDienState] = useState(DaoDien);
  let [hinhAnhState, setHinhAnhState] = useState(HinhAnh);
  let [thoiLuongState, setThoiLuongState] = useState(ThoiLuong);
  let [maCNState, setMaCNState] = useState(MaCN);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();
  let handleOnClickUpdate = () => {
    PhimAPI.requestUpdatePhim(localStorage.getItem('MaCN'),
     maPhimState.replace(/<\/?[^>]+(>|$)/g, ""), 
     tenPhimState.replace(/<\/?[^>]+(>|$)/g, ""), 
     motaState.replace(/<\/?[^>]+(>|$)/g, ""), 
     nhaSXState.replace(/<\/?[^>]+(>|$)/g, ""), 
     ngayKhoiChieuState.replace(/<\/?[^>]+(>|$)/g, ""), 
     ngayKetThucState.replace(/<\/?[^>]+(>|$)/g, ""),
     quocGiaState.replace(/<\/?[^>]+(>|$)/g, ""),
     daoDienState.replace(/<\/?[^>]+(>|$)/g, ""),
     hinhAnhState.replace(/<\/?[^>]+(>|$)/g, ""),
     thoiLuongState.toString().replace(/<\/?[^>]+(>|$)/g, ""),
     maCNState.replace(/<\/?[^>]+(>|$)/g, ""), 
     (result) => {
      if (result.isSuccess === true) {
        history.go(0);
      }
    });
  }

  let handleOnClickDelete = () => {
    history.go(0);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sữa thông tin phim
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập các thông tin của bộ phim mới này</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <strong>Mã phim</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={maPhimState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setMaPhimState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Tên phim</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={tenPhimState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setTenPhimState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Mô tả</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={motaState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setMotaStae(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Nhà sản suất</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={nhaSXState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                let data = editor.getData();
                console.log( { event, editor, data } );
                setNhaSXState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
              
          />

          <strong>Ngày khởi chiếu</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={ngayKhoiChieuState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setNgayKhoiChieuState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Ngày kết thúc</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={ngayKetThucState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setNgayKetThucState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Quốc gia</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={quocGiaState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setQuocGiaState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Đạo diễn</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={daoDienState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setDaoDienState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Hình ảnh</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={hinhAnhState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setHinhAnhState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Thời lượng</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={thoiLuongState.toString()}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setThoiLuongState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Mã chi nhánh</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={maCNState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setMaCNState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnClickUpdate}>Cập nhật thông tin</Button>
          <Button variant="primary" onClick={handleOnClickDelete}>Xóa dòng này</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CGVModalEditAndDeletePhim;