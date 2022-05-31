import CGVAdminQuanlyDoanhThuCSS from './CGVAdminQuanlyDoanhThuCSS.css';
import CGVAdminNav from '../../../../components/CGVcomponents/CGVAdminNav';
import { Button, Form, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SeatAPI from '../../../../api/CGVapi/SeatAPI';
import { PieChart } from "react-minimal-pie-chart";

//let PieChart = require("../../../../components/CGVcomponents/PieChart");


let CGVAdminQuanLyDoanhThu = () => {

  let [branchChoseState, setBranchChoseState] = useState(localStorage.getItem('MaCN'));
  let [pieDataState, setPieDataState] = useState([]);

  useEffect(() => {
    SeatAPI.requestFindSeatSold(branchChoseState, (result) => {
      console.log(result.SoTicketBanDuoc);
      setPieDataState(result.SoTicketBanDuoc);
    })
  }, [branchChoseState]);

  let data = [];
  let count = 0;
  Object.values(pieDataState)?.map(pieData => {
    let color;
    if (count === 0) {
      color='yellow';
    }
    else if (count === 1) {
      color='green';
    }
    else if (count === 2) {
      color='blue';
    } else {
      color='red';
    }
    count++;
    return data.push(
      {
        title: pieData?.MaSuatChieu,
        value: pieData?.SoTicketBanDuoc,
        color: color
      }
    );
  });


  // // data = [
  // //   {
  // //     name: "DOREMON_PHIEULUU_CN1_1",
  // //     y: 5
  // //   },
  // //   {
  // //     name: "Fat",
  // //     y: 2
  // //   },
  // //   {
  // //     name: "Ok",
  // //     y: 12
  // //   },
  // // ]

  // console.log(Object.values(data));
  // //let dataJson = AR.parse(data);

  // let options = {
  //   chart: {
  //     type: "pie"
  //   },
  //   series: [
  //     {
  //       data: data
  //     }
  //   ],
  //   title: {
  //     text: "Thị phần vé các phim được bán tại rạp"
  //   },
  // };

  // // data: [
  // //   {
  // //     name: "Water",
  // //     y: 5
  // //   },
  // //   {
  // //     name: "Fat",
  // //     y: 2
  // //   },
  // //   {
  // //     name: "Ok",
  // //     y: 12
  // //   },
  // // ]

  // const opts = { container: "chart", options: options };

  let handleOnChangePickBranch = (event) => {
    setBranchChoseState(event.target.id);
    //SeatAPI.requestFindSeatSoldByMaSuatChieu(branchChose);
  }


  return (
    <>
    <CGVAdminNav/>
    <div className='grid-container'>
      <div className='grid-item1' style={{fontSize: '25px', fontWeight: 'blod'}}>
        Quan sát ở chi nhánh 
      </div>
      <div className='grid-item2'>
        <Form.Check 
        type={`radio`}
        id={`HQ`}
        label={`Toàn bộ các chi nhánh`}
        name="group1"
        value={`HQ`}
        onChange={handleOnChangePickBranch}
        />
        <Form.Check 
        type={`radio`}
        id={`CN1`}
        label={`CN1`}
        name="group1"
        value={`CN1`}
        onChange={handleOnChangePickBranch}
        />
        <Form.Check 
          type={`radio`}
          id={`CN2`}
          label={`CN2`}
          name="group1"
          value={`CN2`}
          onChange={handleOnChangePickBranch}
        /> 
      </div>
      <div className='grid-item3'>

      </div>
      <div className='grid-item4'>
        
      </div>
      <div className='grid-item5'>
        <button>Thiết lập</button>  
      </div>
      <div className='grid-item6'>
      {/* <PieChart {...opts} /> */}
      <PieChart
        data={data}
      />
      </div>
      <div className='grid-item7'>
      <div className='grid-container'>
        {/* <CGVModalEditPhim/> */}
        <div className='grid-item-1'>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã suất chiếu</th>
            <th>Số lượng vé bán ra</th>
          </tr>
          </thead>
          <tbody>
            {Object.values(pieDataState).map(data => {

              return (
                <>
                  <tr>
                    <td>{data?.MaSuatChieu}</td>
                    <td>{data?.SoTicketBanDuoc}</td>
                    
                  </tr>
                </>
              );
            })}
          </tbody>
          </Table>
        </div>
      </div>
      </div>

    </div>



    </>
  );
}



export default CGVAdminQuanLyDoanhThu;
