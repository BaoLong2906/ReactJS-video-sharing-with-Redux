import { Container, Row, Col, Image, Tab, Tabs, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import CGVTabChonSuatChieuTheoNgay from './CGVTabChonSuatChieuTheoNgay';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect, Route, useHistory } from "react-router";

let CGVModalSuatChieuTheoPhim = ({movieID, movieName, dateFrom}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  let maSuatChieuClicked = useSelector(state => state.phimReducer.maSuatChieu);

  let history = useHistory();

  let handleOnClickCheckout = () => {
    if (maSuatChieuClicked === '') {
      alert('hãy chọn suất chiếu');
      return;
    }
    let url = "/cgv/pick-seat/" + maSuatChieuClicked;
    history.push(url);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Xem suất chiếu
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Các suất chiếu của phim {movieName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CGVTabChonSuatChieuTheoNgay dateFrom={dateFrom} movieID={movieID}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnClickCheckout}>Tiến đến đặt vé</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CGVModalSuatChieuTheoPhim;