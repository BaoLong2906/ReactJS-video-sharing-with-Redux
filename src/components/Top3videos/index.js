import { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Tab, Tabs, Button } from 'react-bootstrap';
import VideoApi from '../../api/VideoApi';

let Top3videos = () => {
  let [videoTopDataState, setVideoTopDataState] = useState();

  let findBestChoiceVideos = async () => {
    VideoApi.findBestChoiceVideos(function (result) {
      console.log("top 3 videos hot nhất: " + JSON.stringify(result));
      let videoidTop1 = result[0].videoid;
      let videoidTop2 = result[1].videoid;
      let videoidTop3 = result[2].videoid;
      
      VideoApi.getInforTop3videos({videoidTop1, videoidTop2, videoidTop3}, function(result) {
        console.log('dữ liệu top 3 videos hot nhất lấy được về: ' + JSON.stringify(result));
        setVideoTopDataState(result);
      });
    });
  }
  
  useEffect(() => {
    let asyncWork = async () => {
      findBestChoiceVideos();
    }

    asyncWork();
  }, [])


  return (
    <>
    {!videoTopDataState ? (<></>) : (
    <>
      <Container>
      <Row>
        <Col style={{borderColor: 'black', border: "1.5px solid black", borderRadius: 15}}>
          <Image style={{width: 140, height: 250}} src={videoTopDataState[0].thumbnailpath} fluid/>
        </Col>

        <Col style={{borderColor: 'black', border: "1.5px solid black", borderRadius: 15, marginLeft: 10}}>
          <Image style={{width: 140, height: 250}} src={videoTopDataState[1].thumbnailpath} fluid/>
        </Col>

        <Col style={{borderColor: 'black', border: "1.5px solid black", borderRadius: 15, marginLeft: 10}}>
          <Image style={{width: 140, height: 250}} src={videoTopDataState[2].thumbnailpath} fluid/>
        </Col>
      </Row>
    </Container>  
    </>)}
        
    </>
  );
}

export default Top3videos;