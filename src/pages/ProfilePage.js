import NavHeader from '../components/NavHeader';
import { useParams, useHistory } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import ProfileMainBody from '../components/ProfileMainBody';
import LoadingScreen from '../components/LoadingScreen';
import { Spinner } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import AppContext from '../Context/AppContext';
import UserAPI from '../api/UserAPI';

function ProfilePage() {

  const history = useHistory();

  let [ isLoading, setIsLoading] = useState(true);
  let [ profileDataState, setProfileDataState ] = useState({});
  let [ viewModeState, setViewModeState ] = useState('');
  
  // let { viewMode } = useContext(AppContext);
  // viewMode = viewModeState;

  let myParams  = useParams();

  const requestFindProfile = (profileurl) => {
    UserAPI.requestFindProfile(profileurl, function(result) {
      
      if (result.profileData) {
        setIsLoading(()=>false);
        setProfileDataState(()=>result.profileData);
      }
    });
  }

  // check xem view user có phải chủ sở hữu của page này k, nếu là chủ sở hữu thì được quyền edit
  // nếu không phải thì chỉ được quyền xem
  // nếu là chủ, mà chưa có bài viết thì được quyền thêm mới.
  let checkOwnerPage = () => {

    // nếu username trong localStorage trùng với username lấy từ việc query theo trang này, mà bằng nhau thì đây là chủ page.
    if (localStorage.getItem('username') === myParams.profileid) {
      setViewModeState("owner");
      
    }

    // chưa đăng nhập, thì tự động chuyển qua view mode là guest hoặc
    // nếu username trong localStorage không trùng với username lấy từ việc query theo trang này, thì đây là khách. 
    if (!localStorage.getItem('username') || localStorage.getItem('username') !== myParams.profileid) {
      setViewModeState('guest');
    }
  }


  useEffect(() => {

    // // in ra tham số profile.
    // console.log('tham số url profile là: ' + profileurlID.parameter);

    // const profileurl = "/users/" + profileurlID.parameter;

    checkOwnerPage();
    
    if (isLoading) {
      // in ra tham số profile.
      console.log('tham số url profile là: ' + myParams.profileid);

      const profileurl = myParams.profileid;
      
      requestFindProfile(profileurl);
    }
    
  }, [isLoading]);

  let content = isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <ProfileMainBody {...profileDataState} viewMode={viewModeState} myParams={myParams}/>
    </div>
  );
  
  // if (isLoading) {
  //   return <div>Loading nè, dợi xí nha...</div>;
  // } else {
  //   return <ProfileMainBody {...profileDataState}/>;
  // }
  
  return (
    <>
      <NavHeader/>
      {content}
    </>
  );

}
  
export default ProfilePage;