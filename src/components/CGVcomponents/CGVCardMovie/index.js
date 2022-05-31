import { Card, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, Route } from "react-router";
import avatar from '../../../images/github-social.png';
import CGVModalSuatChieuTheoPhim from '../CGVModalSuatChieuTheoPhim';


let CGVCardMovie = ({imageLink, movieName, movieID}) => {
  
  let handleOnClick = () => {
    
  }

  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  return(
    <>
    <Card style={{ width: '100%' }}>
    <Card.Img variant="top" src={"http://localhost:5000" + imageLink} style={{width: '50%', height: '50%'}} />
    <Card.Body>
      <Card.Title>{movieName}</Card.Title>
      <Card.Text>
        {movieName}
      </Card.Text>
      <CGVModalSuatChieuTheoPhim movieID={movieID} movieName={movieName} dateFrom={date}/>
    </Card.Body>
  </Card>
    </>
  );
}

export default CGVCardMovie;