import axios from 'axios';
import axiosClient from './axiosClient';
import { REACT_APP_API_URL, RANKING_VIDEO_API_URL } from './axiosClient';

class LikeApi {
  static insertVoteLike (userid, videoid, callback) {
    axios.post(RANKING_VIDEO_API_URL + "/vote-like/insert-vote-like-video", {userid: userid, videoid: videoid})
    .then(res => {
      console.log("đã nhận json data từ server thông qua insertVoteLike !");
      console.log(res.data);
      callback(res.data.isSuccess);
    })
  }

  static removeVoteLike (userid, videoid, callback) {
    axios.post(RANKING_VIDEO_API_URL + "/vote-like/remove-vote-like-video", {userid: userid, videoid: videoid})
    .then(res => {
      console.log("đã nhận json data từ server thông qua removeVoteLike !");
      console.log(res.data);
      callback(res.data.isSuccess);
    })
  }

  static insertVoteDislike (userid, videoid, callback) {
    axios.post(RANKING_VIDEO_API_URL + "/vote-like/insert-vote-dislike-video", {userid: userid, videoid: videoid})
    .then(res => {
      console.log("đã nhận json data từ server thông qua insertVoteDislike !");
      console.log(res.data);
      callback(res.data.isSuccess);
    })
  }

  static removeVoteDislike (userid, videoid, callback) {
    axios.post(RANKING_VIDEO_API_URL + "/vote-like/remove-vote-dislike-video", {userid: userid, videoid: videoid})
    .then(res => {
      console.log("đã nhận json data từ server thông qua removeVoteDislike !");
      console.log(res.data);
      callback(res.data.isSuccess);
    })
  }

  static getInforLikeAndDislike (userid, videoid, callback) {
    axios.post(RANKING_VIDEO_API_URL + "/vote-like/get-infor-like-dislike-of-video", {userid: userid, videoid: videoid})
    .then(res => {
      console.log("đã nhận json data từ server thông qua removeVoteDislike !");
      console.log(res.data);
      callback(res.data);
    })
  }

  static checkUserLiked(userid, videoid, callback) {
    axios.post(RANKING_VIDEO_API_URL + "/vote-like/check-user-liked", {userid: userid, videoid: videoid})
    .then(res => {
      console.log("đã nhận json data từ server thông qua checkUserLiked !");
      console.log(res.data);
      callback(res.data);
    })
  }

  static checkUserDisLiked(userid, videoid, callback) {
    axios.post(RANKING_VIDEO_API_URL + "/vote-like/check-user-disliked", {userid: userid, videoid: videoid})
    .then(res => {
      console.log("đã nhận json data từ server thông qua checkUserDisLiked !");
      console.log(res.data);
      callback(res.data);
    })
  }

}

export default LikeApi;