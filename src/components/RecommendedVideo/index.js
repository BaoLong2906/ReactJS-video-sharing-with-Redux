import { useState, useEffect } from 'react';
import VideosList from '../VideosList';
import VideoApi from '../../api/VideoApi';


let RecommendedVideo = (props) => {

  let [videosInforDataState, setVideosInforDataState] = useState({});
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllVideoInforByCourseId();

  }, [isLoading])

  let getAllVideoInforByCourseId = () => {
    VideoApi.requestFindRecommendVideo(function (result) {
      setVideosInforDataState(result);
      setIsLoading(false);
    });
  }

  let content = isLoading ? (<>Loading...</>) : (<VideosList videosInforData={videosInforDataState}/>);

  return (
    <>
      {content}
    </>
  );
}


export default RecommendedVideo;