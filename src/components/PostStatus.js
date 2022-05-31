import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Image, Tab, Tabs, Button, Dropdown, Modal } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import earth from '../images/earth.png';
import PostStatusApi from '../api/PostStatusApi';
import { render } from '@testing-library/react';

const mainSytle = {
  marginTop: '20px',
  //width: '500px',
  width: 'auto',
  borderRadius: '15px', 
  border: '1px solid black',
  backgroundColor: "#e9edf0",
  display: '',
  // #e9edf0
}

const inputButtonSytle = {
  width: '20%',
  marginLeft: '30px',
  fontSize: '14px',
  fontWeight: '500',
  color: 'white',
  backgroundColor: '#2da44e',
  border: '2px solid black',
  borderRadius: '6px'
};


function PostStatus(props) {

  const [show, setShow] = useState(false);
  let [textContent, setTextContent] = useState(props.textcontent);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [isHaveTextContent, setIsHaveTextContent] = useState(true)
  let [isHaveImage, setIsHaveImage] = useState(true);
  let isShowDropdownOption = false;

  const displayRef = useRef(0);

  if (localStorage.getItem('username') && localStorage.getItem('username') == props.username) {
    isShowDropdownOption = true;
  }

  useEffect(() => {

  }, [isHaveTextContent, isHaveImage])
  
  let handleEditPost = () => {

  }

  let handleDeletePost = async () => {
    PostStatusApi.requestDeletePostByPostId(props.postid, localStorage.getItem('accessToken'), function(result) {});
    PostStatusApi.requestDeletePostImageByPostId(props.postid, localStorage.getItem('accessToken'), function(result) {});
    displayRef.current.style.display = "none";
  }
  
  return (
    <>
      <div style={mainSytle} ref={displayRef}>
        <Container fluid>
          <Row>
            <Col><AvatarAndName {...props}/></Col>
            <Col>
            
              {isShowDropdownOption ? (
                <Dropdown style={{marginTop: 10, textAlign: 'right'}}>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    ...
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    {/* <Dropdown.Item href="#/action-1" active>
                      Action
                    </Dropdown.Item> */}
                    <Dropdown.Item onClick={handleShow}>Edit Post</Dropdown.Item>
                    <Dropdown.Item onClick={handleDeletePost}>Delete Post</Dropdown.Item>
                    {/* <Dropdown.Divider />
                    <Dropdown.Item href="#/action-4"></Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              ): (<></>)}
              
            </Col>
          </Row>
          <Row>
            <Col>{isHaveTextContent ? (<TextContent {...props}/>):(<></>)}</Col>
          </Row>
          <Row>
            <Col style={{textAlign: 'center'}}>{isHaveImage ? (<ImageShow {...props}/>):(<></>)}</Col>
          </Row>
          <Row>
            <Col><ButtonShow {...props}/></Col>
          </Row>
        </Container>
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change your post content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CKEditor
                    editor={ ClassicEditor }
                    data={textContent}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setTextContent(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        //console.log( 'Focus.', editor );
                    } }
          />

          
          <input type="button"  value="Cập nhật" style={{...inputButtonSytle, marginTop: 20}} />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" type="submit" form="formuploadimage" onClick={handleSendPostStatus}>Đăng</Button> */}
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

function AvatarAndName(props) {
  return (
    <>
      <div>
        <Image style={{width: '50px', height: '50px', marginRight: '10px', marginTop: '10px'}} src={props.imagepath} roundedCircle />
        {/* John Wick */}
        <strong><a href={"/profile/" + props.username}>{props.username}</a></strong>
      </div> 
    </>
  );
}

function TextContent(props) {
  return (
    <>
      <div style={{borderBottom: '1px solid black'}} >
        {/* Text content */}
        {/* {props.textcontent} */}
        <div className="Container" dangerouslySetInnerHTML={{__html: props.textcontent}}></div>
      </div>   
    </>
  );
}

function ImageShow(props) {
  return (
    <>
      <Image src={props.postimagepath} fluid/>     
    </>
  );
}

function ButtonShow(props) {

  return (
    <>
      <ControlledTabs {...props} />      
    </>
  );
}

function CommentShow(props) {

  let [myComment, setMyComment] = useState('');
  let [listComment, setListComment] = useState([]);
  let [re_render, set_re_render] = useState(false);

  useEffect(() => {
    getCommentByPostId(props.postid);
  }, [re_render])

  let getCommentByPostId = (postid) => {
    
    PostStatusApi.getCommentByPostId(props.postid, function(result) {
      // console.log('test1: ' + props.postid);
      //console.log('test4: ' + JSON.stringify(result));
      if (result === 'dont exist any comment') {
        return;
      }
      setListComment(result);
    });
    
  }

  let showListComment = (object) => {
    console.log('dữ liệu các comment được render: ' + JSON.stringify(object.comment));
    return Object.keys(object).map((obj, i) => 
      //console.log('dữ liệu các bài post được render: ' + JSON.stringify(object[obj]));
      // <PostStatus {...props} username={object[obj].username} userid={object[obj].userid} imagepath={object[obj].imagepath} postid={object[obj].postid} postimagepath={object[obj].postimagepath} textcontent={object[obj].textcontent} />
      <Container fluid>
          <Row>
          {/* {console.log('test3: ' + object[obj].imagepath)} */}
            <Col><Image style={{width: '35px', height: '35px', marginTop: '10px'}} src={object[obj].imagepath} roundedCircle /><a href={"/profile/"+object[obj].username} style={{marginTop: '10px', marginLeft: '15px'}}>{object[obj].username}</a></Col>
          </Row>
          <Row>
            <Col><div className="Container" dangerouslySetInnerHTML={{__html: object[obj].commentcontent}}></div></Col>
          </Row>
      </Container>
    );
  }
  
  let handleSendComment = () => {
    PostStatusApi.insertComment(localStorage.getItem('userid'), props.postid, myComment, localStorage.getItem('accessToken'), function(result) {
      if (result.isSuccess === true) {
        // setMyComment('');
        // set_re_render(true);
      }
      set_re_render(!re_render);
    });
  }

  if (props.viewMode === "owner") {
    return (
      <>
        <CKEditor
                    editor={ ClassicEditor }
                    data={"Hãy bình luận gì đó nhé"}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // console.log( { event, editor, data } );
                        setMyComment(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        //console.log( 'Focus.', editor );
                    } }
          />
        <Button variant="primary" size="sm" style={{marginTop: '10px'}} onClick={handleSendComment}>
          Đăng
        </Button>
        {showListComment(listComment)}
      </>
    );
  }

  if (props.viewMode === "guest") {
    return (
      <>
        {showListComment(listComment)}
      </>
    );
  }
  
}

function ControlledTabs(props) {
  const [key, setKey] = useState('');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="comment" title="Comment">
        <CommentShow {...props}/>
      </Tab>
      <Tab eventKey="hide" title="hide">

      </Tab>
    </Tabs>
  );
}


export default PostStatus;