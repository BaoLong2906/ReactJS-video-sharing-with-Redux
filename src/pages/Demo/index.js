import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Iframe from "react-iframe";
import { REACT_APP_API_URL } from '../../api/axiosClient';

class Demo extends Component {
  handleFileChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  upload = () => {
    if (this.state.file) {
      let data = new FormData();
      data.append("file", this.state.file);
      data.set("datahello", this.state.text);
      
      console.log("test 1: " + JSON.stringify(data));

      axios
        .post(REACT_APP_API_URL + "/post-status/demo", data)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  };

  render() {
    return (
        <>
      <div>
        <input type="text" onChange={this.handleChange} />
        <input type="file" onChange={this.handleFileChange} />
        <input type="button" onClick={this.upload} value="Upload" />
      </div>
      <Iframe
      id="dummyframe"
      name="dummyframe"
      display="none"/>
      
      <form id="formuploadimage" method="post" action={REACT_APP_API_URL + "/post-status/upload-imagepoststatus/"} enctype="multipart/form-data" target="dummyframe">
        {/* <!-- Form body here --> */}
        {/* <input type="hidden" name="postid" id="hiddenInput" value="vuivler" /> */}
        <input type="file" name="file" multiple/>
        {/* <input variant="primary" type="submit" value="Đăng" onClick={handleSendPostStatus}/> */}
      </form>
      </>
    );
  }
}



export default Demo;