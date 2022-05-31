import { Container, Row, Col, Image, Tab, Tabs, Button } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router';

import UserAPI from '../../api/UserAPI';
import VideoApi from '../../api/VideoApi';

import LoadingScreen from '../../components/LoadingScreen';

import {REACT_APP_API_URL} from '../../api/axiosClient';

function VideosList(props) {

  let history = useHistory();

  let listVideoInforInCourse = (object) => {
    //console.log('okokokokok: ' + JSON.stringify(object));
    return Object.keys(object).map((obj, i) =>
      <div>
        <div style={{padding: 8}}>
          <CardVideoRow username={object[obj].username} 
          userid={object[obj].userid} 
          coursename={object[obj].coursename}
          courseid={object[obj].courseid} 
          videodescription={object[obj].videodescription}
          videoid={object[obj].videoid} 
          videothumbnailpath={object[obj].videothumbnailpath}
          cousethumbnailpath={object[obj].coursethumbnailpath}
          coursedescription={object[obj].coursedescription}
          videopath={object[obj].videopath}
          videoname={object[obj].videoname}
          handleClick={handleClick}/>
        </div>
      </div>
    );
  }

  let handleClick = (courseid, videoid) => {
    history.push('/video-view/' + courseid + '/' + videoid);
    history.go(0);
  }

  return (
    <>
      {listVideoInforInCourse(props.videosInforData.videosinfor)}
    </>
  );
}

function CardVideoRow(props) {
  return (
    <>
      <Container style={{border: '2px solid black', borderRadius: '15px'}}>
        <Row>
          <Col xs={5}>
            <Image src={props.videothumbnailpath} fluid/>
          </Col>
          <Col xs={6}>
            <div><span style={{fontWeight: '500'}}>{props.videoname}</span></div>
            <div style={{marginTop: '10px', textAlign: 'right'}}>
              <span style={{
                  borderRadius: '20px', 
                  backgroundColor: 'yellow', 
                  padding: '6px', 
                  border: '2px solid black', 
                  fontWeight: '500'
                }} 
                onClick={
                  () => props.handleClick(props.courseid, props.videoid)
                }>
                  Watch Now
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default VideosList;