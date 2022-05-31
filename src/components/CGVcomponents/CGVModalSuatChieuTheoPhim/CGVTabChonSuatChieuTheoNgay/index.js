import { Container, Row, Col, Image, Tab, Tabs, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { useState, useEffect, useRef, forwardRef } from 'react';
import PhimAPI from '../../../../api/CGVapi/PhimAPI';
import toHHMMSS from '../../../../helper/toHHMMSS';
import {useSelector, useDispatch} from 'react-redux';
import {saveMaSuatChieu} from '../../../../actions/CGVactions/phimAction.js';

let CGVTabChonSuatChieuTheoNgay = ({dateFrom, movieID}) => {

  let maSuatChieuClicked = useSelector(state => state.phimReducer.maSuatChieu);
  let dispatch = useDispatch();

  const [key, setKey] = useState("day1");
  let [suatChieuListState, setSuatChieuListState] = useState('');
  //let maSuatChieuClicked = '';

  let day = new Date(dateFrom);
  let day2 = new Date(day);
  let day3 = new Date(day);
  day2.setDate(day.getDate() + 1);
  day3.setDate(day.getDate() + 2);
  
  let date = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();
  let date2 = day2.getFullYear()+'-'+(day2.getMonth()+1)+'-'+day2.getDate();
  let date3 = day3.getFullYear()+'-'+(day3.getMonth()+1)+'-'+day3.getDate();

  let handleOnChange = (event) => {
    console.log('masuatchieu ' + event.target.id);
    let saveMaSuatChieuAction = saveMaSuatChieu(event.target.id);
    dispatch(saveMaSuatChieuAction);
  }

  useEffect(() => {

    if (key === 'day1') {
      PhimAPI.requestSuatChieuByPhimIdAndDate(localStorage.getItem('MaCN'), movieID, date, (result) => {
        setSuatChieuListState(result.suatchieu);
        console.log(result.suatchieu)
      });
    }

    if (key === 'day2') {
      PhimAPI.requestSuatChieuByPhimIdAndDate(localStorage.getItem('MaCN'), movieID, date2, (result) => {
        setSuatChieuListState(result.suatchieu);
        console.log(result.suatchieu)
      });
    }

    if (key === 'day3') {
      PhimAPI.requestSuatChieuByPhimIdAndDate(localStorage.getItem('MaCN'), movieID, date3, (result) => {
        setSuatChieuListState(result.suatchieu);
        console.log(result.suatchieu)
      });
    }
    
  }, [key]);

  

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="day1" title={day.toLocaleDateString()}>
        <Form.Group>  
        {suatChieuListState !== 'dont exist any suatchieu' ? Object.values(suatChieuListState).map((suatchieu) => {
            return (
              <>
              {SuatChieu(suatchieu.MaSuatChieu, suatchieu.ThoiGianBatDau, handleOnChange)}
              </>
            );
          }
        ) : (<>Không tìm thấy suất chiếu nào trong thời gian trên</>)
        }
        </Form.Group>
      </Tab>
      <Tab eventKey="day2" title={day2.toLocaleDateString()}>
        <Form.Group>
        {suatChieuListState !== 'dont exist any suatchieu' ? Object.values(suatChieuListState).map((suatchieu) => {
            return (
              <>
              {SuatChieu(suatchieu.MaSuatChieu, suatchieu.ThoiGianBatDau, handleOnChange)}
              </>
            );
          }
        ) : (<>Không tìm thấy suất chiếu nào trong thời gian trên</>)
        }
        </Form.Group>
      </Tab>
      <Tab eventKey="day3" title={day3.toLocaleDateString()}>
        <Form.Group>
        {suatChieuListState !== 'dont exist any suatchieu' ? Object.values(suatChieuListState).map((suatchieu) => {
            return (
              <>
              {SuatChieu(suatchieu.MaSuatChieu, suatchieu.ThoiGianBatDau, handleOnChange)}
              </>
            );
          }
        ) : (<>Không tìm thấy suất chiếu nào trong thời gian trên</>)
        }
        </Form.Group>
      </Tab>
      
    </Tabs>
  );
}

let SuatChieu = (MaSuatChieu, ThoiGianBatDau, callback) => {
  ThoiGianBatDau = ThoiGianBatDau.replace('Z', '').replace('T', ' ');
  let day = new Date(ThoiGianBatDau);
  let date = day.toLocaleTimeString();
  return (
    <>
    <Form.Check 
      type={`radio`}
      id={`${MaSuatChieu}`}
      label={`${date}`}
      name="group1"
      value={`${date}`}
      onChange={callback}
    />
    </>
  );
}

export default CGVTabChonSuatChieuTheoNgay;