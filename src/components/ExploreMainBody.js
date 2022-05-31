import { useState, useEffect } from 'react';
import PopUpCreatePostForm from '../components/PopUpCreatePostForm';
import PostStatus from './PostStatus';
import { Container, Row, Col, Image, Tab, Tabs } from 'react-bootstrap';
import RecommendedVideo from '../components/RecommendedVideo';
import Top3videos from './Top3videos';

function ExploreMainBody(props) {

  let listPost = (object) => {
    
    return Object.keys(object).reverse().map((obj, i) => 
      //console.log('dữ liệu các bài post được render: ' + JSON.stringify(object[obj]));
      <PostStatus 
        {...props} 
        username={object[obj].username} 
        userid={object[obj].userid} 
        imagepath={object[obj].imagepath} 
        postid={object[obj].id} 
        postimagepath={object[obj].postimagepath} 
        textcontent={object[obj].textcontent} 
      />
    );
  }

  if (props.viewMode === "owner") {
    return (
      <>
        <div>
          <Container fluid >
            <Row>
              <Col ></Col>
              <Col xs={5}>
                
                <h6 style={{marginTop: '30px'}}>Write your ideal, deal or even your issue here</h6>
                <PopUpCreatePostForm {...props}/>

                <h6 style={{marginTop: '30px'}}>Top most liked videos &#9733; &#9733; &#9733; &#9733; &#9733;</h6>
                <Top3videos />

                {listPost(props.postStatusData)}
              </Col>
              <Col xs={2}>
                <div  style={{position: 'relative', left: 0, marginTop: '35px'}}>
                  <div style={{position: 'fixed', overflowY: 'scroll', width: '30%', maxHeight: '95%'}}>
                    <h6>Some videos may you like</h6>
                    <RecommendedVideo/>
                  </div>
                  
                </div>
                
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
  
  if (props.viewMode === "guest") {
    return (
      <>
        <div>
          <Container fluid>
            <Row>
              <Col></Col>
              <Col xs={5}>
              {/* {console.log("cũng bình thường thôi: " + JSON.stringify(props.postStatusData))} */}
                {listPost(props.postStatusData)}
              </Col>
              <Col xs={2}>
                <div  style={{position: 'relative', left: 0}}>
                  <div style={{position: 'fixed', overflowY: 'scroll', width: '30%', maxHeight: '95%'}}>
                    <h6 style={{marginTop: '20px'}}>Some videos may you like</h6>
                    <RecommendedVideo/>
                  </div>
                  
                </div>
                
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default ExploreMainBody;