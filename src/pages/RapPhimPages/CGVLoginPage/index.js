import CGVNavHeader from "../../../components/CGVcomponents/CGVNavHeader";
import { Button, Form } from 'react-bootstrap';
import CGVLoginCSS from "./CGVLoginCSS.css";
import { useRef } from "react";

import { Redirect, Route, useHistory } from "react-router";
import SigninAPI from "../../../api/CGVapi/SigninAPI";

let LoginPage = (props) => {

  const history = useHistory();


  let whichBranch = useRef(1);
  let email = useRef("");
  let password = useRef("");

  if (localStorage.getItem('accessToken') != null) {
    return <Redirect to="/" />;
  }

  let handleOnChangeOption = (event) => {
    whichBranch = event.target.value
    console.log(whichBranch);
  }

  let handleOnChangeEmail = (event) => {
    email = event.target.value;
    console.log(email);
  }

  let handleOnChangePassword = (event) => {
    password = event.target.value;
    console.log(password);
  }

  let handleOnClick = () => {
    if (password.current == ""|| email.current == "") {
      alert("bạn chưa điền đủ dữ liệu");
      return;
    }

    let branch = "HQ";
    if (whichBranch == 2) {
      branch = "CN1"
    }
    if (whichBranch == 3) {
      branch = "CN2"
    }

    SigninAPI.requestAuthWithEmailAndPassword(email, password, branch, (workState) => {
      localStorage.setItem('MaCN', branch);
      // if (workState === "done") {
      //   history.push('/cgv/lich-chieu');
      // }
      if (workState === "done") {
        if (localStorage.getItem('MaChucVu') === 'QLMASTER') {
          history.push('/cgv/quan-ly-phim');
          return;
        }
        history.push('/cgv/lich-chieu');
      }
    });

  }
  
  return(
    <>
    <CGVNavHeader/>
    <div className="CardLogin">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  onChange={handleOnChangeEmail}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleOnChangePassword}/>
        </Form.Group>

        <Form.Select aria-label="Default select example" onChange={handleOnChangeOption}>
          <option value="1">HQ</option>
          <option value="2">Vincom Đà Nẵng</option>
          <option value="3">Big C Đà Nẵng</option>

        </Form.Select>

        <Button variant="primary" onClick={handleOnClick} >
          Sign in
        </Button>
      </Form>
    </div>
    </>
  );
}

export default LoginPage;