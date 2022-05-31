import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';
import React, { Component, useState, useCallback } from 'react';
import { useHistory } from "react-router";
import {useDropzone} from 'react-dropzone';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import FormData from 'form-data';
import Iframe from 'react-iframe';
import { REACT_APP_API_URL } from '../api/axiosClient';
import { AI_SERVICE_API_URL } from '../api/axiosClient';


function PopUpCreatePostForm(props) {
  
  let history = useHistory();

  const [show, setShow] = useState(false);
  let [textContent, setTextContent] = useState('');
  //let [postIdState, setPostIdState] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Write your post here
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Write post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CKEditor
                    editor={ ClassicEditor }
                    data={props.content}
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

          <UploadImage textContent={textContent} handleClose={handleClose}/>
          {/* <Basic textContent={textContent}/> */}

          

          
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

class UploadImage extends Component {

  refreshPage = () => {
    window.location.reload();
  }

  handleFileChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  upload = async () => {
    if (this.state.file) {
      let data = new FormData();
      data.append("file", this.state.file);
      data.set("token", localStorage.getItem('accessToken'));
      data.set("userid", localStorage.getItem('userid'));
      data.set("dataTextContent", this.props.textContent);

      // axios
      //   .post("http://localhost:7000/post-status/demo", data)
      //   .then(response => console.log(response))
      //   .catch(error => console.log(error));
      
      let isAllow = await this.askAIForPermisionUploadPost(data);
      if (isAllow == false) {
        return;
      }

      axios
        .post(REACT_APP_API_URL + "/post-status/insert-poststatus", data)
        .then(response => console.log(response))
        .catch(error => console.log(error));

      this.refreshPage();
    }
  };

  askAIForPermisionUploadPost = async (data) => {
    axios
      .post(AI_SERVICE_API_URL + "/predictImage", data)
      .then(result => {
        console.log(result);
        if (result == "pass") {
          return true;
        }

        if (result == "fail") {
          return false;
        }
      })
      .catch(error => {
        return new Error(error);
      });
      
  }

  render() {
    return (
      <div style={{marginTop: '20px'}}>
        {/* <input type="text" onChange={this.handleChange} /> */}
        <input type="file" onChange={this.handleFileChange} />
        <input type="button" onClick={this.upload} value="Đăng" style={inputButtonSytle} />
      </div>
    );
  }
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


// class UploadImage extends Component {
  
//   state = {

//     // Initially, no file is selected
//     selectedFile: null
//   };
  
//   // On file select (from the pop up)
//   onFileChange = event => {
  
//     // Update the state
//     this.setState({ selectedFile: event.target.files[0] });
  
//   };
  
//   // On file upload (click the upload button)
//   onFileUpload = () => {
  
//     // Create an object of formData
//     let formData = new FormData();
  
//     // Update the formData object
//     formData.append(
//       "myFile",
//       this.state.selectedFile,
//       this.state.selectedFile.name,
//       this.props.textContent
//     );
  
//     // Details of the uploaded file
//     console.log(this.state.selectedFile);
//     console.log(this.state.selectedFile.name);
    
  
//     // Request made to the backend api
//     // Send formData object
//     //axios.post("api/uploadfile", formData);
//     //axios.post("http://localhost:7000/post-status/upload-poststatus", {token: localStorage.getItem('accessToken'), formData: this.state.selectedFile});
//     PostStatusApi.uploadPostStatus(formData, localStorage.getItem('accessToken'), function(result) {
//       console.log('trạng thái gửi đã: ' + result);
//     });
//   };
  
//   // File content to be displayed after
//   // file upload is complete
//   fileData = () => {
  
//     if (this.state.selectedFile) {
       
//       return (
//         <div>
//           <h2>File Details:</h2>
           
//           <p>File Name: {this.state.selectedFile.name}</p>

           
//           <p>File Type: {this.state.selectedFile.type}</p>

           
//           <p>
//             Last Modified:{" "}
//             {this.state.selectedFile.lastModifiedDate.toDateString()}
//           </p>

//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <br />
//           <h4>Choose before Pressing the Upload button</h4>
//         </div>
//       );
//     }
//   };
  
//   render() {
  
//     return (
//       <div>
//           <div>
//               <input type="file" onChange={this.onFileChange} />
//               <Button variant="primary" onClick={this.onFileUpload}>
//                 Upload!
//               </Button>
//           </div>
//         {this.fileData()}
//       </div>
//     );
//   }
// }

export default PopUpCreatePostForm;