import { Container, Row, Col, Image, Tab, Tabs, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect, Route, useHistory } from "react-router";
import SuatChieuAPI from "../../../../api/CGVapi/SuatChieuAPI";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


let CGVModalEditAndDeleteSuatChieu = ({MaSuatChieu, ThoiGianBatDau, ThoiGianKetThuc, GiaVe, MaPhim}) => {

  const [show, setShow] = useState(false);

  let [maSuatChieuState, setMaSuatChieuState] = useState(MaSuatChieu);
  let [thoiGianBatDauState, setThoiGianBatDauState] = useState(ThoiGianBatDau);
  let [thoiGianKetThucState, setThoiGianKetThucState] = useState(ThoiGianKetThuc);
  let [giaVeState, setGiaVeState] = useState(GiaVe);
  let [maPhimState, setMaPhimState] = useState(MaPhim);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();

  let handleOnClickUpdate = () => {
    SuatChieuAPI.requestUpdateSuatChieu(localStorage.getItem('MaCN'),
      maSuatChieuState.replace(/<\/?[^>]+(>|$)/g, ""),
      thoiGianBatDauState.replace(/<\/?[^>]+(>|$)/g, ""),
      thoiGianKetThucState.replace(/<\/?[^>]+(>|$)/g, ""),
      giaVeState.toString().replace(/<\/?[^>]+(>|$)/g, ""),
      maPhimState.replace(/<\/?[^>]+(>|$)/g, ""),
      (result) => {
        if (result.isSuccess === true) {
          history.go(0);
        }
      }
    );
  }

  let handleOnClickDelete = () => {
    SuatChieuAPI.requestDeleteSuatChieuByMaSuatChieu(localStorage.getItem('MaCN'),
    maSuatChieuState.replace(/<\/?[^>]+(>|$)/g, ""),
    (result) => {
      if (result.isSuccess === true) {
        history.go(0);
      }
    }
    );
  }

  return(
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
          <strong>Mã suất chiếu</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={maSuatChieuState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setMaSuatChieuState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Thời gian bất đầu</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={thoiGianBatDauState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setThoiGianBatDauState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Thời gian kết thúc</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={thoiGianKetThucState}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setThoiGianKetThucState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
          />

          <strong>Gía vé</strong>
          <CKEditor
              editor={ ClassicEditor }
              data={giaVeState.toString()}
              onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                let data = editor.getData();
                console.log( { event, editor, data } );
                setGiaVeState(data);
              } }
              onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                //console.log( 'Focus.', editor );
              } }
              
          />

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

export default CGVModalEditAndDeleteSuatChieu;