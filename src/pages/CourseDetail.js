import { Container, Row, Col, Image, Button, Modal, Carousel } from 'react-bootstrap';
import React, { Component, useState, useCallback, useEffect } from 'react';
import { Redirect, useHistory, useParams } from "react-router";
import axios from 'axios';
import FormData from 'form-data';
import Iframe from 'react-iframe';
import NavHeader from '../components/NavHeader';
import earth from '../images/earth.png';
import '../components/css/carousel.css';
import reactcourse from '../images/reactcourse.png';
import LoadingScreen from '../components/LoadingScreen';
import CourseApi from '../api/CourseApi';

function CourseDetail(props) {

  let [ isLoading, setIsLoading] = useState(true);
  let [ videosInforDataState, setVideosInforDataState ] = useState([]);

  let [courseNameState, setCourseNameState] = useState('');
  let [authorNameState, setAuthorNameState] = useState('');
  let [courseDescriptionState, setCourseDescriptionState] = useState('');
  let [courseThumbnailState, setCourseThumbnailState] = useState('');

  useEffect(() => {
    getAllVideoInforByCourseId();
  }, [isLoading, courseNameState, authorNameState, courseDescriptionState, courseThumbnailState])

  let myParams  = useParams();

  let getAllVideoInforByCourseId = () => {
    CourseApi.requestGetVideoInforByCourseId(myParams.courseid, function(result) {
      //console.log('dữ liệu các bài post được render: ' + JSON.stringify(result));
      
      if (result === 'dont exist any courses infor with that courseid') {
        setVideosInforDataState('');
        setIsLoading(false);
        return;
      }

      setCourseNameState(result.coursesinfor[0].coursename);
      setAuthorNameState(result.coursesinfor[0].username);
      setCourseDescriptionState(result.coursesinfor[0].coursedescription);
      setCourseThumbnailState(result.coursesinfor[0].coursethumbnailpath)

      setVideosInforDataState(result);
      setIsLoading(false);
    });
  }

  let content = isLoading ? (<LoadingScreen />) : (<div>{console.log("vui ghe")} <CourseDetailMainBody {...props} videosInforData={videosInforDataState} courseName={courseNameState} authorName={authorNameState} courseDescription={courseDescriptionState} courseThumbnail={courseThumbnailState}/></div>);

  return (
    <>
      <NavHeader/>
      {content}
    </>
  );
}

function CourseDetailMainBody(props) {
  //console.log('heheheheh: ' + JSON.stringify(props.videosInforData));

  let [userIdState, setUserIdState] = useState('');
  let history = useHistory();
  let myParams = useParams();

  useEffect(() => {
    if (!props.videosInforData) {
      return;
    }
    setUserIdState(props.videosInforData.coursesinfor[0].userid);
  }, [])


  let listVideoInforInCourse = (object) => {

    if (!object) {
      return <p>This course don't have any video</p>
    }

    return Object.keys(object).map((obj, i) =>
      <div>
        <div style={{padding: 8}}>
          <CardRow username={object[obj].username} 
          userid={object[obj].userid} 
          imagepath={object[obj].imagepath} 
          coursename={object[obj].coursename}
          courseid={object[obj].courseid} 
          videodescription={object[obj].videodescription}
          videoid={object[obj].id} 
          videothumbnailpath={object[obj].videothumbnailpath}
          cousethumbnailpath={object[obj].coursethumbnailpath}
          coursedescription={object[obj].coursedescription}
          videopath={object[obj].videopath}
          videoname={object[obj].videoname}
          profileurl={object[obj].profileurl}
          handleClick={handleClick}/>
        </div>
      </div>
    );
  }
  
  let checkViewMode = () => {
    // ủa mình tưởng dùng === là so sánh giá trị của string đã quy đổi sang number rồi chứ ?
    
    if (myParams.userid == localStorage.getItem('userid')) {
      return (
        <>
          <Row style={{marginTop: '20px'}}>
          <Col xs={12} style={{textAlign: 'center'}}>
            <button style={inputButtonMoveToInsertVideoToCourseSytle} onClick={() => {}}>Upload more video to this course</button>
          </Col>
        </Row>
        </>
      );
    }
  }

  let handleClick = (courseid, videoid) => {
    history.push('/video-view/' + courseid + '/' + videoid);
    //<Redirect to={'/video-view/' + courseid + '/' + videoid}  />
  }

  return (
    <>
      <Container>

        <Row>
          <Col></Col>
          <Col xs={10} style={{marginTop: '50px', textAlign: 'center'}}>
            <Image src={props.courseThumbnail} style={{width: '200px', height: '200px', borderRadius: '100px', border: '2px solid black'}}/>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={10} style={{textAlign: 'center'}}><span style={CourseNameStyle}>{props.courseName}</span></Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={10} style={{textAlign: 'center'}}><span style={AuthorNameStyle}>Author: {props.authorName}</span></Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={10} style={{textAlign: 'center'}}><span style={DescriptionStyle}>{props.courseDescription}</span></Col>
          <Col></Col>
        </Row>

        {checkViewMode()}

        {/* <CardRow {...props}/> */}
        {listVideoInforInCourse(props.videosInforData.coursesinfor)}

      </Container>
    </>
  );
}

function CardRow(props) {
  return (
    <>
      <Row style={{textAlign: 'center', marginTop: '50px', marginBottom: '10px'}}>

        <Col style={{textAlign: 'right'}}>
          <Image src={props.videothumbnailpath} style={{width: '150px', height: '100px', border: '1px solid black'}} rounded/>
        </Col>
        <Col xs={'auto'} style={{marginTop: '20px', display: 'flex', flexWrap: 'nowrap'}}>
          <div style={{padding: '12px', textAlign: 'left', backgroundColor: 'pink', borderRadius: '15px', border: '1px solid black', boxShadow: '5px 5px', width: '600px', display: 'flex', flexWrap: 'nowrap'}}>
            <span><strong>{'>> '}</strong>{props.videodescription}</span>
            <span style={{marginLeft: '5px', marginTop: '15px', width: '120px', textAlign: 'center'}} onClick={() => props.handleClick(props.courseid, props.videoid)}>
              <span style={{backgroundColor: 'yellow', borderRadius: '25px', border: '2px solid black', padding: '3px'}}>Watch Now</span>
            </span>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

const CourseNameStyle = {
  fontSize: '30px', 
  fontWeight: '800', 
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'
}

const AuthorNameStyle = {
  fontSize: '20px', 
  fontWeight: '500', 
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'
}

const DescriptionStyle = {
  fontSize: '20px', 
  fontWeight: '500', 
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'
}

const inputButtonMoveToInsertVideoToCourseSytle = {
  width: '250px',
  fontSize: '14px',
  fontWeight: '500',
  color: 'white',
  backgroundColor: '#2da44e',
  border: '2px solid black',
  borderRadius: '6px',
};

export default CourseDetail;