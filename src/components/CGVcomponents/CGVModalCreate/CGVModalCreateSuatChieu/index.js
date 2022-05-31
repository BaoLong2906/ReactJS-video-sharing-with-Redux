import { Container, Row, Col, Image, Tab, Tabs, Button, Dropdown, Modal, Form, Table } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect, Route, useHistory } from "react-router";
import SuatChieuAPI from "../../../../api/CGVapi/SuatChieuAPI";
import PhongChieuAPI from '../../../../api/CGVapi/PhongChieuAPI';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

let CGVModalCreateSuatChieu = () => {
  const [show, setShow] = useState(false);

  let maPhongChieu;
  let slots;
  let [maSuatChieuState, setMaSuatChieuState] = useState('');
  let [thoiGianBatDauState, setThoiGianBatDauState] = useState('');
  let [thoiGianKetThucState, setThoiGianKetThucState] = useState('');
  let [giaVeState, setGiaVeState] = useState('');
  let [maPhimState, setMaPhimState] = useState('');

  let [maPhongChieuListState, setMaPhongChieuListState] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();

  useEffect(() => {
    PhongChieuAPI.requestAllPhongChieuList(localStorage.getItem('MaCN'), (result) => {
      setMaPhongChieuListState(result.phongchieus);
    });
  }, []);

  let handleOnClickCreateNewSuatChieu = () => {
    if (maSuatChieuState === '' ||
        thoiGianBatDauState === '' ||
        thoiGianKetThucState === '' ||
        giaVeState === '' || 
        maPhimState === ''
      ) {
      alert('Bạn đang để trống một trường nào đó !');
      return;
    }
    SuatChieuAPI.requestAddSuatChieu(localStorage.getItem('MaCN'),
    maSuatChieuState.replace(/<\/?[^>]+(>|$)/g, ""), 
    thoiGianBatDauState.replace(/<\/?[^>]+(>|$)/g, ""), 
    thoiGianKetThucState.replace(/<\/?[^>]+(>|$)/g, ""), 
    giaVeState.toString().replace(/<\/?[^>]+(>|$)/g, ""), 
    maPhimState.replace(/<\/?[^>]+(>|$)/g, ""),
    maPhongChieu,  
    (result) => {
     if (result.isSuccess === true) {
       history.go(0);
     }
   });;
  }

  let handleOnChange = (event) => {
    maPhongChieu = event.target.id;
    //slots = PhongChieuAPI.requestAllSlotByMaPhongChieu(maPhongChieu, localStorage.getItem('MaCN'));
    
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm suất chiếu mới
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập các thông tin của suất chiếu mới này</Modal.Title>
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
              data={giaVeState?.toString()}
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

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Phòng chiếu</th>
              <th>Chi nhánh</th>
            </tr>
          </thead>
          {Object.values(maPhongChieuListState)?.map((phongchieu) => {
              return (
                <>
                <PhongChieuRadioCheckBox 
                  phongchieu={phongchieu}
                  callback={handleOnChange}
                />
                </>
              );
            })}
        </Table>


        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnClickCreateNewSuatChieu}>Tạo một suất chiếu mới</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

let PhongChieuRadioCheckBox = ({phongchieu, callback}) => {

  return (
    <>
        <tbody>
          <tr>
            <td>
            <Form.Check 
              type={`radio`}
              id={phongchieu.MaPhongChieu}
              label={phongchieu.MaPhongChieu}
              name="group1"
              value={phongchieu.MaPhongChieu}
              onChange={callback}
            />
            </td>
            <td>{phongchieu.MaCN}</td>
          </tr>
          
        </tbody>
    </>
  );
}


export default CGVModalCreateSuatChieu;