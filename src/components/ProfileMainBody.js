import { Container, Row, Col, Image, Tab, Tabs, FloatingLabel, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import UserAPI from '../api/UserAPI';
import { useHistory, useParams } from 'react-router';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import UploadFiles from './UploadFiles';


const inputButtonSytle = {
  display: 'block',
  width: '14%',
  marginLeft: '75%',
  marginTop: '10px',
  marginBottom: '10px',
  fontSize: '14px',
  fontWeight: '500',
  color: 'white',
  backgroundColor: '#2da44e',
  border: '2px solid black',
  borderRadius: '6px',
};

const inputButtonMoveToInsertVideoToCourseSytle = {
  width: '250px',
  fontSize: '14px',
  fontWeight: '500',
  color: 'white',
  backgroundColor: '#2da44e',
  border: '2px solid black',
  borderRadius: '6px',
};

function ProfileMainBody(props) {
  console.log('imageurl: ' + props.imagepath)
  // console.log('xin chào');
  // console.log(props);

  if(props.imagepath) {
    return (
    <>
      <Container>
        <Row>
          <Col>
            <Image src={props.imagepath} style={{marginTop: '15%', width: '150px', height: '150px'}} roundedCircle />
            <h2 style={{marginTop: '10%'}}>{props.username}</h2>
          </Col>
          <Col xs={10}>
            <ControlledTabs {...props}/>
          </Col>
        </Row>
      </Container>
    </>
    );
  } else {
    return (
      <>
        Lỗi đường truyền
      </>
    );
  }

}

function ControlledTabs(props) {

  const [key, setKey] = useState('aboutme');

  let checkOwner = () => {
    if (props.viewMode === "owner") {
      return (
        <Tab eventKey="upload" title="Upload your new course">
          {/* <Content /> */}
          <ContentForUpload {...props}/>
        </Tab>
      );
    }
  }
  
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="aboutme" title="About Me">
        <ContentForAboutme {...props}  />
      </Tab>
      <Tab eventKey="course" title="All courses">
        {/* <Content /> */}
        <ContentForCourse {...props}/>
      </Tab>
      <Tab eventKey="videos" title="All videos">
        {/* <Content /> */}
        <ContentForVideo {...props}/>
      </Tab>
      {checkOwner()}
    </Tabs>
  );
}

function ContentForAboutme(props) {

  // console.log('xin chào');
  // console.log(props);

  const [ isHasAnyBlog, setIsHasAnyBlog ] = useState(false);
  const [ contentAboutme, setContentAboutme ] = useState('');

  useEffect(() => {
    if (!isHasAnyBlog) {
      requestFindBlogAboutmeByUserID();
    }
  }, [isHasAnyBlog])
  
  let content = isHasAnyBlog ? (<AboutmeContent {...contentAboutme} {...props}/>) : (<AboutmeShowEditMode {...props}/>);
  
  let requestFindBlogAboutmeByUserID = () => {
    
    UserAPI.requestFindBlogAboutmeByUserID(props.id, function(result) {
      
      console.log("requestFindBlogAboutmeByUserID: " + JSON.stringify(result))
      
      if (result) {

        setContentAboutme(result.userBlogAboutContent);
        setIsHasAnyBlog(true);
      } else {
        // hiện button write something.
      }
    });
  }
  
  return (
    <>
      {/* <p>{props.username}</p> */}
      {content}
    </>
  );
}

function ContentForCourse(props) {

  let [courseInforState, setCourseInforState] = useState('');

  let myParams = useParams();
  let history = useHistory();

  useEffect(() => {
    getAllCourseByProfileUrl();
  }, [])

  let getAllCourseByProfileUrl = () => {
    UserAPI.requestFindAllCourseByProfileUrl(myParams.profileid, function(result) {
      
      if (result.courses === 'dont exist any courses info with that profileurl like that') {
        setCourseInforState('');
        return;
      }

      setCourseInforState(result.courses);
    });
  }

  let listCourseMadeByThisUser = (object) => {
    console.log(JSON.stringify(object));
    return Object.keys(object).map((obj, i) =>
      <div>
        <div style={{padding: 8}}>
          <CardCourseRow 
          userid={object[obj].userid}
          courseid={object[obj].courseid} 
          profileurl={object[obj].profileurl} 
          coursename={object[obj].coursename}
          description={object[obj].description} 
          coursethumbnailpath={object[obj].coursethumbnailpath}
          createtime={object[obj].createtime}
          updatetime={object[obj].updatetime}
          handleClick={() => handleClick(object[obj].userid, object[obj].courseid)}/>

        </div>
      </div>
    );
  }

  let handleClick = (userid, courseid) => {
    history.push('/course-detail/' + userid + '/' + courseid);
    //<Redirect to={'/video-view/' + courseid + '/' + videoid}  />
  }

  return(
    <>
      <Container fluid>
        <Row>
          <Col style={TitleStyle}>
            All courses were created by this user
          </Col>
        </Row>

        {listCourseMadeByThisUser(courseInforState)}

      </Container>
    </>
  );
}


function CardCourseRow(props) {
  return (
    <>
      <Row style={{textAlign: 'center', marginTop: '50px', marginBottom: '10px'}}>

        <Col style={{textAlign: 'right'}}>
          <Image src={props.coursethumbnailpath} style={{width: '150px', height: '100px', border: '1px solid black'}} rounded/>
        </Col>

        <Col xs={8} style={{marginTop: '20px', display: 'flex', flexWrap: 'nowrap'}}>
          
          <div style={{padding: '12px', textAlign: 'left', backgroundColor: 'pink', borderRadius: '15px', border: '1px solid black', boxShadow: '5px 5px', width: '600px', display: 'flex', flexWrap: 'nowrap'}}>
            <Container fluid>
              <Row>
                <Col xs={9}>
                  <span><strong>{'>> '}</strong>{props.coursename}</span>
                </Col>
                <Col>
                  <span style={{marginLeft: '5px', marginTop: '15px', width: '120px', textAlign: 'right'}} onClick={() => props.handleClick(props.courseid, props.videoid)}>
                    <span style={{backgroundColor: 'yellow', borderRadius: '25px', border: '2px solid black', padding: '3px'}}>Show detail</span>
                  </span>
                </Col>
              </Row>
            </Container>
          </div>

        </Col>
        
        <Col>
        
        </Col>
      </Row>
    </>
  );
}

function ContentForVideo(props) {
  let [videoInforState, setVideoInforState] = useState('');

  let myParams = useParams();
  let history = useHistory();

  useEffect(() => {
    getAllVideosByProfileUrl();
  }, [])

  let getAllVideosByProfileUrl = () => {
    UserAPI.requestFindAllVideoByProfileUrl(myParams.profileid, function(result) {

      if (result.videos === 'dont exist any videos info with that profileurl like that') {
        setVideoInforState('');
        return;
      }

      setVideoInforState(result.videos);
    });
  }

  let listVideoMadeByThisUser = (object) => {
    return Object.keys(object).map((obj, i) =>
      <div>
        <div style={{padding: 8}}>
          <CardVideoRow
          videoid={object[obj].videoid} 
          userid={object[obj].userid}
          courseid={object[obj].courseid} 
          profileurl={object[obj].profileurl} 
          coursename={object[obj].coursename}
          description={object[obj].description} 
          videothumbnailpath={object[obj].videothumbnailpath}
          createtime={object[obj].createtime}
          updatetime={object[obj].updatetime}
          handleClick={() => handleClick(object[obj].courseid, object[obj].videoid)}/>

        </div>
      </div>
    );
  }

  let handleClick = (courseid, videoid) => {
    history.push('/video-view/' + courseid + '/' + videoid);
  }
  
  return(
    <>
      <Container fluid>
        <Row>
          <Col style={TitleStyle}>
            All your video were created by this user
          </Col>
        </Row>

        {listVideoMadeByThisUser(videoInforState)}

      </Container>
    </>
  );
}

function CardVideoRow(props) {
  return (
    <>
      <Row style={{textAlign: 'center', marginTop: '50px', marginBottom: '10px'}}>

        <Col style={{textAlign: 'right'}}>
          <Image src={props.videothumbnailpath} style={{width: '150px', height: '100px', border: '1px solid black'}} rounded/>
        </Col>

        <Col xs={8} style={{marginTop: '20px', display: 'flex', flexWrap: 'nowrap'}}>
          
          <div style={{padding: '12px', textAlign: 'left', backgroundColor: 'pink', borderRadius: '15px', border: '1px solid black', boxShadow: '5px 5px', width: '600px', display: 'flex', flexWrap: 'nowrap'}}>
            <Container fluid>
              <Row>
                <Col xs={9}>
                  <span><strong>{'>> '}</strong>{props.description}</span>
                </Col>
                <Col>
                  <span style={{marginLeft: '5px', marginTop: '15px', width: '120px', textAlign: 'right'}} onClick={() => props.handleClick(props.courseid, props.videoid)}>
                    <span style={{backgroundColor: 'yellow', borderRadius: '25px', border: '2px solid black', padding: '3px'}}>Watch Now</span>
                  </span>
                </Col>
              </Row>
            </Container>
          </div>

        </Col>
        
        <Col>
        
        </Col>
      </Row>
    </>
  );
}


function ContentForUpload(props) {

  const [courseDescriptionState, setCourseDescriptionState] = useState('');
  const [courseNameState, setCourseNameState] = useState({});
  const history = useHistory();

  useEffect(() => {

  }, [])
  
  let changeInputCoursename = (event) => {
    setCourseNameState(event.target.value);  
  }

  let handleSubmitForm =(e) => {
    if (courseNameState === '' || courseDescriptionState === '') {
      alert("You have entered null!");
      return;
    }

    // SigninAPI.requestAuthWithEmailAndPassword(emailState, passwordState, function(workState) {
      
    //   if (workState === "done") {
    //     history.push('/');
    //   }
    // });
  }

  return(
    <>
      <Container fluid>
        <Row>
          <Col style={TitleStyle}>
            Upload your new course
          </Col>
        </Row>

        <Row>
          <Col>
            <div>
              <Container>
                <Row>
                  <Col>
                    <Container>
                      <Row>
                        <Col>
                          <h1 style={h1Style}>Fill your new course's information</h1>
                        </Col>
                      </Row>
                      <Row>
                        
                        <Col>
                          <div style={divStyle}>
                            
                            <span style={labelSytle}>
                              What is course's name ?
                            </span>
                            <input type='text' name='coursename' id='course-name' autoFocus='autofocus' style={inputFieldSytle}
                              onChange={changeInputCoursename}/>

                            <span style={labelSytle}>
                              Write course description
                            </span>
                            <div style={{marginLeft: '10%', marginRight: '10%'}}>
                              <CKEditor
                                editor={ ClassicEditor }
                                data={''}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    //console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    console.log( { event, editor, data } );
                                    setCourseDescriptionState(data);
                                } }
                                onBlur={ ( event, editor ) => {
                                    //console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    //console.log( 'Focus.', editor );
                                } }
                              />
                            </div>
                            {/* <input type='submit' name='commit' value='Sign in' style={inputButtonSytle}/> */}
                            {/* <button name='commit' style={inputButtonSytle} onClick={handleSubmitForm}>Sign in</button>
                            <a href='' style={aStyle}>Forgot password?</a> */}
                            {/* </form> */}

                            <FloatingLabel controlId="floatingSelect" label="Works with selects" style={{marginLeft: '10%', marginRight: '10%', marginTop: '20px'}}>
                              <Form.Select aria-label="Floating label select example">
                                <option>What is your course's category</option>
                                <option value="1">FrontEnd-Web</option>
                                <option value="2">FrontEnd-Mobile</option>
                                <option value="3">BackEnd</option>
                                <option value="4">Artificial Intelligence</option>
                                <option value="5">Blockchain</option>
                                <option value="6">Another Topic</option>
                              </Form.Select>
                            </FloatingLabel>

                            <span style={labelSytle}>
                              Upload your course's image thumbnail
                            </span>
                            <span style={labelSytle}>
                              <UploadImage courseName={courseNameState} courseDescription={courseDescriptionState}/>
                            </span>

                            <span style={labelSytle}>
                              Upload your videos
                            </span>
                            <span style={labelSytle}>
                              <UploadFiles/>
                            </span>
                            
                          </div>
                        </Col>

                      </Row>

                      <Row>
                        <Col>
                          <p style={pStyle}>Our policy <a href='/' style={{textDecoration: 'none', color: "#0969da"}}>read more.</a></p>
                            
                          
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </div>          
          </Col>
        </Row>

      </Container>
    </>
  );
}


function AboutmeContent(props) {
  console.log('đang ở component AboutmeContent');
  console.log(props);

  let history = useHistory();

  let checkOwnerPage = () => {
    if (props.viewMode === "guest") {
      return (
        <>
          {/* <div className="Container" >xin chào người xa lạ</div> */}
          <div className="Container" dangerouslySetInnerHTML={{__html: props.content}}></div>
        </>
      );
    } 

    if (props.viewMode === "owner") {
      
      return (
        <>
          <button name='commit' style={inputButtonSytle} onClick={handleEditAboutmeBlog}>Chỉnh sữa bài viết</button>
          <div className="Container" dangerouslySetInnerHTML={{__html: props.content}}></div>
        </>
      );
    }
  }

  let handleEditAboutmeBlog = () => {
    history.push('/edit-my-aboutme/' + props.id);
  }


  return (
    <>
      {/* <div className="Container" dangerouslySetInnerHTML={{__html: props.content}}></div> */}
      {checkOwnerPage()};
    </>
  );
}

function AboutmeShowEditMode(props) {

  let history = useHistory();

  let checkOwnerPage = () => {
    if (props.viewMode === "guest") {
      return (
        <>
          <div className="Container"><h4>người dùng này chưa có bài viết giới thiệu bản thân</h4></div>
        </>
      );
    } 

    if (props.viewMode === "owner") {
      return (
        <>
          <div className="Container" > Hiện trang cá nhân của bạn chưa có bài giới thiệu nào</div>
          <button name='commit' style={inputButtonSytle} onClick={handleWriteSomethingAboutmeBlog}>Hãy viết gì đó giới thiệu bản thân</button>
        </>
      );
    }

  }

  let handleWriteSomethingAboutmeBlog = () => {
    history.push('/edit-my-aboutme/' + props.id);
  }

  return (
    <>
      {/* <div>Hiển thị button</div> */}
      {checkOwnerPage()}
    </>
  );

}

class UploadImage extends React.Component {

  refreshPage = () => {
    window.location.reload();
  }

  handleFileChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  upload = () => {
    if (this.state.file) {
      //console.log("gửi lên: " + this.props.courseName);
      let data = new FormData();
      data.append("file", this.state.file);
      data.set("token", localStorage.getItem('accessToken'));
      data.set("userid", localStorage.getItem('userid'));
      data.set("coursedescription", this.props.courseDescription);
      data.set("coursename", this.props.courseName);

      // console.log("gửi lên: " + JSON.stringify(data.get));

      // axios
      //   .post("http://localhost:7000/post-status/demo", data)
      //   .then(response => console.log(response))
      //   .catch(error => console.log(error));
      
      axios
        .post("http://localhost:7000/course/insert-course", data)
        .then(response => console.log(response))
        .catch(error => console.log(error));

      this.refreshPage();
    }
  };

  render() {
    return (
      <div style={{marginTop: '20px'}}>
        {/* <input type="text" onChange={this.handleChange} /> */}
        <input type="file" onChange={this.handleFileChange} />
        <input type="button" onClick={this.upload} value="Upload" style={inputButtonSytle} />
      </div>
    );
  }
}

const TitleStyle = {
  fontSize: '30px', 
  fontWeight: '800', 
  color: 'black',
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'
};

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

const h1Style = {
  textAlign: 'center', 
  marginTop: '5%', 
  fontSize: '24px',
  fontWeight: '300', 
  letterSpacing: '-0,5px'
};

const divStyle = {
  width: '100%', 
  height: '100%', 
  borderRadius: '6px',
  backgroundColor: '#f6f8fa', 
  border: '1px solid #d8dee4'
};

const labelSytle = {
  display: 'block',
  textAlign: 'left',
  marginLeft: '10%',
  marginBottom: '7px', 
  fontWeight: '400px', 
  marginTop: '16px'
};

const inputFieldSytle = {
  display: 'block',
  width: '80%',
  border: '1px solid #d0d7de',
  borderRadius: '6px',
  backgroundColor: 'white',
  marginLeft: '10%',
  fontSize: '14px',
};

const aStyle = {
  marginLeft: '10%',
  color: "#0969da",
  fontSize: '12px',
  textDecoration: 'none'
};

const pStyle = {
  display: 'block',
  width: '100%',
  textAlign: 'center',
  marginTop: '25px',
  fontSize: '12px',
};

export default ProfileMainBody;