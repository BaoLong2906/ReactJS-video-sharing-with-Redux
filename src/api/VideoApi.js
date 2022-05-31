import axios from 'axios';
import axiosClient from './axiosClient';
import { REACT_APP_API_URL, RANKING_VIDEO_API_URL } from './axiosClient';

class VideoApi {
  static requestFindAllVideoInforInCourseByCourseId (courseid, callback) {
    axios.post(REACT_APP_API_URL + "/video/find-all-video-incourse-by-courseid/" + courseid)
    .then(res => {
      //console.log(res);
      //console.log(res.data);
      console.log("đã nhận json data từ server thông qua requestFindAllVideoInforInCourseByCourseId !");
      //console.log(res.data);
      callback(res.data);
    });
  }

  static requestFindAllCommentInVideoByVideoId (videoid, callback) {
    axios.post(REACT_APP_API_URL + "/video/find-all-comment-invideo-by-videoid/" + videoid)
    .then(res => {
      //console.log(res);
      //console.log(res.data);
      console.log("đã nhận json data từ server thông qua requestFindAllCommentInVideoByVideoId !");
      //console.log(res.data);
      callback(res.data);
    })
    .catch(error => {
      callback('dont exist any video comment with that videoid like that');
    });
  }

  static insertComment (userid, videoid, commentcontent, accessToken, callback) {
    axios.post(REACT_APP_API_URL + "/video/insert-comment", {userid: userid, videoid: videoid, token: accessToken, commentcontent: commentcontent})
    .then(res => {
      console.log("đã nhận json data từ server thông qua insertComment ở VideoAPI !");
      console.log(res.data);
      callback(res.data.isSuccess);
    })
  }

  static requestFindRecommendVideo (callback) {
    axios.post(REACT_APP_API_URL + "/video/find-recommend-video")
    .then(res => {
      callback(res.data);
    });
  }

  static findBestChoiceVideos (callback) {
    axios.post(RANKING_VIDEO_API_URL + "/vote-like/find-best-choice-video")
    .then(res => {
      callback(res.data);
    });
  }

  static getInforTop3videos (listvideoid, callback) {
    axios.post(REACT_APP_API_URL + "/video/get-infor-top3videos", listvideoid)
    .then(res => {
      callback(res.data);
    });
  }
}

export default VideoApi;