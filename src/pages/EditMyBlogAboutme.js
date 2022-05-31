import NavHeader from '../components/NavHeader';
import LoadingScreen from '../components/LoadingScreen';
import { useParams, useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import logoGenki from "../images/logoGenki.svg";
import { Image } from 'react-bootstrap';
import UserAPI from '../api/UserAPI';
import ProfileAPI from '../api/ProfileAPI';


function EditMyBlogAboutme(props) {

  let [ isLoading, setIsLoading ] = useState(true);
  let [ contentState, setContentState ] = useState("");
  console.log("ac vler" + contentState);

  let userID  = useParams();
  let content = isLoading ? (<LoadingScreen />) : (<Editor content={contentState} userid={userID.userid} {...props}/>);

  let requestFindBlogAboutmeByUserID = (userid) => {
    UserAPI.requestFindBlogAboutmeByUserID(userid, function(result) {
      console.log("requestFindBlogAboutmeByUserID say: " + result);

      if (result.userBlogAboutContent === 'doAskInsert') {
        
        
        setIsLoading(()=>false);
        setContentState("Hãy viết gì để giới thiệu bản thân nhé");
      }

      if (result.userBlogAboutContent !== 'doAskInsert') {
        
        setIsLoading(()=>false);
        setContentState(()=>result.userBlogAboutContent.content);

      }
      
    });
  }

  

  useEffect(() => {
    console.log(userID.userid);
    if (isLoading) {
      requestFindBlogAboutmeByUserID(userID.userid);
    }

  }, [isLoading, contentState])

  return (
    <>
      <NavHeader />
      {content}
    </>
  );
}

const inputButtonSytle = {
  display: 'block',
  width: '10%',
  marginLeft: '70%',
  marginTop: '10px',
  marginBottom: '10px',
  fontSize: '20px',
  fontWeight: '500',
  color: 'white',
  backgroundColor: '#2da44e',
  boder: '1px solid',
  borderRadius: '6px',
};

function Editor(props) {

  let history = useHistory();

  let [ dataState, setDataState ] = useState('');

  useEffect(() => {

  }, [dataState])

  let handleSendUpdateAboutmeBlog = () => {
    ProfileAPI.requestUpdateAboutmeBlog(props.userid, dataState, localStorage.getItem('accessToken'), function(result) {
      if (result.exist === true) {
        console.log('cập nhật aboutme thành công');
      }

      if (result.exist === false) {
        console.log('cập nhật aboutme thất bại');
      }
      history.goBack();
    });
  }

  let handleInsertAboutmeBlog = () => {
    ProfileAPI.requestInsertAboutmeBlog(props.userid, dataState, localStorage.getItem('accessToken'), function(result) {
      if (result.exist === true) {
        console.log('insert aboutme thành công');
      }

      if (result.exist === false) {
        console.log('insert aboutme thất bại');
      }
      history.goBack();

    });
  }

  let choseHandle = () => {
    //if (props.content.length === 0 ) {
    if (props.content === "Hãy viết gì để giới thiệu bản thân nhé") {
      
      handleInsertAboutmeBlog();
    } else {
      
      handleSendUpdateAboutmeBlog();
    }
  }
  
  if (props.content) {
    return (
      <>
        <div className="EditorHtml">
                <h3>Write something about yourself</h3>
                <CKEditor
                    editor={ ClassicEditor }
                    data={props.content}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setDataState(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
      </div>
      <button name='commit' style={inputButtonSytle} onClick={choseHandle}>Đăng</button>
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

export default EditMyBlogAboutme;