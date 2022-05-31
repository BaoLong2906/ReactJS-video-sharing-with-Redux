import React from "react";
import likeIcon from '../../images/like.png';
import dislikeIcon from '../../images/dislike.png';
import LikeApi from '../../api/LikeApi';
import { Container, Row, Col, Image } from 'react-bootstrap';
import likeClickedIcon from '../../images/like-clicked.png';
import dislikeClickedIcon from '../../images/dislike-clicked.png';

const CompareLikeVsDisLike = (props) => {
  
  //const { bgcolor, completed } = props;
  const { bgcolor } = props;
  let { userid, videoid } = props;

  let [likeState, setLikeState] = React.useState(false);
  let [dislikeState, setDislikeState] = React.useState(false);
  let [reset, setReset] = React.useState(false);

  let [completed, setCompleted] = React.useState(false);
  let [howManyLike, setHowManyLike] = React.useState(0);
  let [howManyDislike, setHowManyDislike] = React.useState(0);

  let displayRef = React.useRef('');
  let likeRef = React.useRef('');
  let dislikeRef = React.useRef('');

  React.useEffect(() => {
    let asyncWork = async () => {
      await checkThisUserLiked();
      await checkThisUserDisliked();
      await getInforLikeAndDislike();
    }

    asyncWork();
    
  }, [reset]);

  let handleClickLike = async (e) => {

    if (!localStorage.getItem('accessToken')) {
      alert("Login to like this video");
      return;
    }

    

    if (likeState == true) {
      likeRef.current.src = likeIcon;
      removeLike();
      setLikeState(false);
      getInforLikeAndDislike();
      setReset(!reset);
      return;
    }

    if (likeState == false && dislikeState == false) {
      likeRef.current.src = likeClickedIcon;
      insertLike();
      setLikeState(true);
      getInforLikeAndDislike();
      setReset(!reset);
      return;
    }

    if (likeState == false && dislikeState == true) {
      likeRef.current.src = likeClickedIcon;
      dislikeRef.current.src = dislikeIcon;
      insertLike();
      removeDislike();
      setLikeState(true);
      setDislikeState(false);
      getInforLikeAndDislike();
      setReset(!reset);
      return;
    }

  }

  let handleClickDislike = async (e) => {

    if (!localStorage.getItem('accessToken')) {
      alert("Login to dislike this video");
      return;
    }

    if (dislikeState == true) {
      dislikeRef.current.src = dislikeIcon;
      removeDislike();
      setDislikeState(false);
      getInforLikeAndDislike();
      setReset(!reset);
      return;
    }

    if (dislikeState == false && likeState == false) {
      dislikeRef.current.src = dislikeClickedIcon;
      insertDislike();
      setDislikeState(true);
      getInforLikeAndDislike();
      setReset(!reset);
      return;
    }

    if (dislikeState == false && likeState == true) {
      dislikeRef.current.src = dislikeClickedIcon;
      likeRef.current.src = likeIcon;
      insertDislike();
      removeLike();
      setDislikeState(true);
      setLikeState(false);
      getInforLikeAndDislike();
      setReset(!reset);
      return;
    }

  }

  let insertLike = () => {
    LikeApi.insertVoteLike(userid, videoid, function (result) {
      getInforLikeAndDislike();
    });
  }
  
  let removeLike = () => {
    LikeApi.removeVoteLike(userid, videoid, function (result) {
      getInforLikeAndDislike();
    });
  }
  
  let insertDislike = () => {
    LikeApi.insertVoteDislike(userid, videoid, function (result) {
      getInforLikeAndDislike();
    });
  }
  
  let removeDislike = () => {
    LikeApi.removeVoteDislike(userid, videoid, function (result) {
      getInforLikeAndDislike();
    });
  }

  let getInforLikeAndDislike = async () => {
    LikeApi.getInforLikeAndDislike(userid, videoid, function (result) {
      console.log('test 1: ' +  JSON.stringify(result));
      // tính toán phần trăm like
      let likePerCent = ( result.numberRowLike / result.numberTotalLikeAndDislike ) * 100;
      setHowManyLike(result.numberRowLike);
      setHowManyDislike(result.numberRowDislike);
      setCompleted(likePerCent);
    })
  }

  let checkThisUserLiked = async () => {
    LikeApi.checkUserLiked(userid, videoid, function (result) {
      if (result == 'exist') {
        likeRef.current.src = likeClickedIcon;
        setLikeState(true)
      }
    });
  }

  let checkThisUserDisliked = async () => {
    LikeApi.checkUserDisLiked(userid, videoid, function (result) {
      console.log(JSON.stringify(result));
      if (result == 'exist') {
        dislikeRef.current.src = dislikeClickedIcon;
        setDislikeState(true);
      }
    });
  }

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginTop: 15,
    marginLeft: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  const likeStyle = {
    width: '28px',
    height: '28px',
    marginTop: 15,
    marginLeft: 65,
  }

  const dislikeStyle = {
    width: '20px',
    height: '20px',
    marginTop: 15,
    marginLeft: 15
    
  }

  const a = {display: ''}

  return (
    <>
    <div ref={displayRef} style={a}>
      <Image src={likeIcon} style={likeStyle} ref={likeRef} onClick={handleClickLike} /> {howManyLike}
      <Image src={dislikeIcon} style={dislikeStyle} ref={dislikeRef} onClick={handleClickDislike} /> {howManyDislike}
      <div style={containerStyles}>
        
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    </div>
    
    </>
  );
};



export default CompareLikeVsDisLike;

// import ProgressBar from "./progress-bar.component";

// const testData = [
//   { bgcolor: "#6a1b9a", completed: 60 },
//   { bgcolor: "#00695c", completed: 30 },
//   { bgcolor: "#ef6c00", completed: 53 },
// ];

// function App() {
//   return (
//     <div className="App">
//       {testData.map((item, idx) => (
//         <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
//       ))}
//     </div>
//   );
// }