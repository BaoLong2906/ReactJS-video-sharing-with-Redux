import { Navbar, Container, Nav } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, Route } from "react-router";

let CGVAdminNav = () => {
  let isLogin = false;
  if (localStorage.getItem('accessToken') != null) {
    isLogin = true;
  }

  return(
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/cgv/admin">Quản Lý Chuỗi Rạp CGV</Navbar.Brand>
          <Nav className="me-auto">
            
          </Nav>
          <Greeting isLoggedIn={isLogin} />
        </Container>
    </Navbar>
    </>
  );
}


function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}


function UserGreeting(props) {

  const history = useHistory();

  const actionLogOut = () => {
    localStorage.clear();
    history.push('/cgv');
  }

  // khi build qua backend thì phải xóa phần đầu localhost:7000
  const profileurl = "/users/" + localStorage.getItem('profileurl');

  const linkProfile = "/profile/" + localStorage.getItem('profileurl'); 


  return (
    <>
      {/* <Navbar.Brand onClick={requestFindProfile}>Wellcome {localStorage.getItem('username')}</Navbar.Brand> */}
      <Nav className="me-auto">
        <Nav.Link href="/cgv/quan-ly-phim">Phim</Nav.Link>
        <Nav.Link href="/cgv/quan-ly-suat-chieu">Suất chiếu</Nav.Link>
        {/* <Nav.Link href="/cgv/quan-ly-ve">Vé</Nav.Link>
        <Nav.Link href="/cgv/quan-ly-the-loai">Thể loại</Nav.Link> */}
        <Nav.Link href="/cgv/quan-ly-doanh-thu">Doanh thu</Nav.Link>
      </Nav>
      <Navbar.Brand href={linkProfile}>Wellcome {localStorage.getItem('username')}</Navbar.Brand>
      <Navbar.Brand onClick={actionLogOut}>Log out</Navbar.Brand>
    </>
  );
}

function GuestGreeting(props) {
  return (
    <>
      <Navbar.Brand href="/sign-in">Sign-In</Navbar.Brand>
      <Navbar.Brand href="/sign-up">Sign-Up</Navbar.Brand>
    </>
  );
}

export default CGVAdminNav;