import ExploreMainBody from "../components/ExploreMainBody";
import LoadingScreen from '../components/LoadingScreen';
import NavHeader from "../components/NavHeader";
import { useParams, useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import PostStatusApi from "../api/PostStatusApi";


function ExplorePage(props) {

  let [ isLoading, setIsLoading] = useState(true);
  let [ postStatusDataState, setPostStatusDataState ] = useState([]);
  let [ viewModeState, setViewModeState ] = useState('');

  useEffect(() => {
    checkViewMode();
    getPostStatus();
  }, [isLoading])

  let checkViewMode = () => {
    if (localStorage.getItem('username')) {
      setViewModeState('owner');
    } else {
      setViewModeState('guest');
    }
  }

  let getPostStatus = () => {
    
    PostStatusApi.requestPostStatus(function(result) {
      //console.log('dữ liệu các bài post được render: ' + JSON.stringify(result));
      setPostStatusDataState(result);
      setIsLoading(false);
    });
    
  }
  //console.log(isLoading);
  let content = isLoading ? (<LoadingScreen />) : (<div>{console.log("vui ghe")} <ExploreMainBody {...props} postStatusData={postStatusDataState} viewMode={viewModeState} /></div>);

  return (
    <>
      <NavHeader/>
      {/* <ExploreMainBody {...props}/> */}
      {content}
    </>
  );
}

export default ExplorePage;