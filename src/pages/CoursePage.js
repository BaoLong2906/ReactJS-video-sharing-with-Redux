import { Container, Row, Col, Image, Button, Modal, Carousel } from 'react-bootstrap';
import React, { Component, useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import FormData from 'form-data';
import Iframe from 'react-iframe';
import NavHeader from '../components/NavHeader';
import earth from '../images/earth.png';
import '../components/css/carousel.css';
import reactcourse from '../images/reactcourse.png';
import LoadingScreen from '../components/LoadingScreen';
import CourseApi from '../api/CourseApi';


function CoursePage(props) {
  let [ isLoading, setIsLoading] = useState(true);
  let [ coursesDataState, setCoursesDataState ] = useState([]);
  let [ coursesFrontendMobileDataState, setCoursesFrontendMobileDataState] = useState([]);
  let [ coursesFrontendWebDataState, setCoursesFrontendWebDataState] = useState([]);
  let [ coursesBackendDataState, setCoursesBackendDataState] = useState([]);
  let [ coursesBlockchainDataState, setCoursesBlockchainDataState] = useState([]);
  let [ coursesAIDataState, setCoursesAIDataState] = useState([]);

  let history = useHistory();

  useEffect(() => {
    let asyncAPI = async () => {

      await Promise.all([
        getAllCourses(),
        getAllFrontendMobileCourses(),
        getAllFrontendWebCourses(),
        getAllBackendCourses(),
        getAllBlockchainCourses(),
        getAllAICourses()
      ]);
      
      await stopLoading();
    }

    // setIsLoading(false);
    asyncAPI();

  }, [isLoading])

  let getAllCourses =  () => {
    return CourseApi.requestGetAllCourse(function(result) {
      //console.log('dữ liệu các bài post được render: ' + JSON.stringify(result));
      console.log('1');
      setCoursesDataState(result);
      
      console.log(JSON.stringify(result));
      // const arr = [];
      // Object.keys(result.courses).forEach(key => arr.push({name: key, value: result.courses[key]}))
      // console.log(arr);
    });
  }

  let getAllFrontendMobileCourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("FrontEnd-Mobile", function(result) {
      console.log('2');
      setCoursesFrontendMobileDataState(result);
    })
  }

  let getAllFrontendWebCourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("FrontEnd-Web", function(result) {
      console.log('3');
      setCoursesFrontendWebDataState(result);
    })
  }

  let getAllBackendCourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("BackEnd", function(result) {
      console.log('4');
      setCoursesBackendDataState(result);
    })
  }

  let getAllBlockchainCourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("Blockchain", function(result) {
      console.log('5');
      setCoursesBlockchainDataState(result);
    })
  }

  let getAllAICourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("Artificial Intelligence", function(result) {
      console.log('6');
      setCoursesAIDataState(result);
    })
  }

  let stopLoading = async () => {
    console.log('7');
    setIsLoading(false);
  }


  let content = isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      {console.log("vui ghe")} 
      <CourseMainBody 
        {...props} 
        coursesData={coursesDataState}
        coursesFrontendMobileData={coursesFrontendMobileDataState}
        coursesFrontendWebData={coursesFrontendWebDataState}
        coursesBackendData={coursesBackendDataState}
        coursesBlockchainData={coursesBlockchainDataState}
        coursesAIData={coursesAIDataState}
      />
    </div>
  );


  return (
    <>
      <NavHeader/>
      {content}
    </>
  );
}

function CourseMainBody(props) {
  //console.log('hahahaha: ' + JSON.stringify(props.coursesData));

  let history = useHistory();
  // if ( !props.coursesFrontendWebData.courses || props.coursesFrontendWebData.courses === undefined ||
  //       !props.coursesFrontendMobileData.courses || props.coursesFrontendMobileData.courses === undefined ||
  //       !props.coursesData.courses || props.coursesData.courses === undefined ||
  //       !props.coursesBackendData.courses || props.coursesBackendData.courses === undefined ||
  //       !props.coursesAIData.courses || props.coursesAIData.courses ||
  //       !props.coursesBlockchainData.courses || props.coursesBlockchainData.courses === undefined) {
  //   return (<></>);
  //   //props.set_re_render(!props.re_render);
  // }

  let handleClick = (profileurl, userid, courseid) => {
    history.push('/course-detail/' + userid + '/' + courseid);
  }

  let listCourse = (object) => {
    return Object.keys(object).map((obj, i) =>
      <div onClick={() => handleClick(object[obj].profileurl, object[obj].userid, object[obj].courseid)} >
        <div style={{padding: 8}}>
          <CardCourse username={object[obj].username} 
          userid={object[obj].userid} 
          imagepath={object[obj].imagepath} 
          coursename={object[obj].coursename} 
          description={object[obj].description} 
          thumbnailpath={object[obj].thumbnailpath}/>
        </div>
      </div>
    );
  }

  return (
    <>
      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col>
            <span style={HeaderOneStyle}>Courses</span>
          </Col>
        </Row>
        <Row>
          <CarouselVer2 show={4}>
                {listCourse(props.coursesData.courses)}
                
          </CarouselVer2>
        </Row>
      </Container>

      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col>
            <span style={HeaderOneStyle}>Front-end Web Courses</span>
          </Col>
        </Row>
        <Row>
          <CarouselVer2 show={4}>
                {listCourse(props.coursesFrontendWebData.courses)}
                
          </CarouselVer2>
        </Row>
      </Container>

      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col>
            <span style={HeaderOneStyle}>Front-end Mobile Courses</span>
          </Col>
        </Row>
        <Row>
          <CarouselVer2 show={4}>
                {listCourse(props.coursesFrontendMobileData.courses)}
                
          </CarouselVer2>
        </Row>
      </Container>

      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col>
            <span style={HeaderOneStyle}>Back-end Courses</span>
          </Col>
        </Row>
        <Row>
          <CarouselVer2 show={4}>
                {listCourse(props.coursesBackendData.courses)}
                
          </CarouselVer2>
        </Row>
      </Container>

      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col>
            <span style={HeaderOneStyle}>Blockchain Courses</span>
          </Col>
        </Row>
        <Row>
          <CarouselVer2 show={4}>
                {listCourse(props.coursesBlockchainData.courses)}
                
          </CarouselVer2>
        </Row>
      </Container>

      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col>
            <span style={HeaderOneStyle}>AI Courses</span>
          </Col>
        </Row>
        <Row>
          <CarouselVer2 show={4}>
                {listCourse(props.coursesAIData.courses)}
                
          </CarouselVer2>
        </Row>
      </Container>
    </>
  );
}

function CardCourse(props) {

  return (
    <>
      <div style={{
          backgroundImage: `url(${props.thumbnailpath})`, 
          backgroundSize: '100% 100%', 
          backgroundRepeat: 'no-repeat',
          width: '310px',
          height: '300px',
          border: '3px solid black',
          //margin: '0 auto',
          borderRadius: '15px'}}>
        <Container>
          <Row>
            <Col>
              <Image src={props.imagepath} style={{width: '50px', height: '50px', marginTop: '10px', borderRadius: "100px", border: '2px soild black'}}/>
            </Col>
            <Col xs={8}>
              <p style={{width: "45%", borderRadius: '15px', color: 'white', fontSize: '14px', fontWeight: '500', backgroundColor: 'white', border: '2px solid black', marginTop: '10px'}}>
                <a href="" style={{textDecoration: 'none', color: 'black'}}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{props.username}</a>
              </p>
            </Col>
          </Row>

          <Row style={{marginTop: '55%'}}>
            <Col style={{borderRadius: '15px', backdropFilter: 'blur(36px)', background: 'rgba(245, 160, 40, 0.1)', color: 'black', fontSize: '14px', fontWeight: '450', marginBottom: '20px'}}>
              <div style={{fontSize: '24px'}}>{props.coursename}</div>
              <div dangerouslySetInnerHTML={{__html: props.description}}></div>
            </Col>
          </Row>

         
        </Container>

      </div>
    </>
  );
}

// function ControlledCarousel(props) {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item>
//         <CardCourse/>
//       </Carousel.Item>
//       <Carousel.Item>
//         <CardCourse/>
//       </Carousel.Item>
//       <Carousel.Item>
//         <CardCourse/>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

const CarouselVer2 = (props) => {
  const {children, show, infiniteLoop} = props

  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0)
  const [length, setLength] = useState(children.length)

  const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const [touchPosition, setTouchPosition] = useState(null)

  // Set the length to match current children from props
  useEffect(() => {
      setLength(children.length)
      setIsRepeating(infiniteLoop && children.length > show)
  }, [children, infiniteLoop, show])

  useEffect(() => {
      if (isRepeating) {
          if (currentIndex === show || currentIndex === length) {
              setTransitionEnabled(true)
          }
      }
  }, [currentIndex, isRepeating, show, length])

  const next = () => {
      if (isRepeating || currentIndex < (length - show)) {
          setCurrentIndex(prevState => prevState + 1)
      }
  }

  const prev = () => {
      if (isRepeating || currentIndex > 0) {
          setCurrentIndex(prevState => prevState - 1)
      }
  }

  const handleTouchStart = (e) => {
      const touchDown = e.touches[0].clientX
      setTouchPosition(touchDown)
  }

  const handleTouchMove = (e) => {
      const touchDown = touchPosition

      if(touchDown === null) {
          return
      }

      const currentTouch = e.touches[0].clientX
      const diff = touchDown - currentTouch

      if (diff > 5) {
          next()
      }

      if (diff < -5) {
          prev()
      }

      setTouchPosition(null)
  }

  const handleTransitionEnd = () => {
      if (isRepeating) {
          if (currentIndex === 0) {
              setTransitionEnabled(false)
              setCurrentIndex(length)
          } else if (currentIndex === length + show) {
              setTransitionEnabled(false)
              setCurrentIndex(show)
          }
      }
  }

  const renderExtraPrev = () => {
      let output = []
      for (let index = 0; index < show; index++) {
          output.push(children[length - 1 - index])
      }
      output.reverse()
      return output
  }

  const renderExtraNext = () => {
      let output = []
      for (let index = 0; index < show; index++) {
          output.push(children[index])
      }
      return output
  }

  return (
      <div className="carousel-container">
          <div className="carousel-wrapper">
              {/* You can alwas change the content of the button to other things */}
              {
                  (isRepeating || currentIndex > 0) &&
                  <button onClick={prev} className="left-arrow" style={{border: '2px solid black'}}>
                      <strong>{'<<'}</strong>
                  </button>
              }
              <div
                  className="carousel-content-wrapper"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
              >
                  <div
                      className={`carousel-content show-${show}`}
                      style={{
                          transform: `translateX(-${currentIndex * (100 / show)}%)`,
                          transition: !transitionEnabled ? 'none' : undefined,
                      }}
                      onTransitionEnd={() => handleTransitionEnd()}
                  >
                      {
                          (length > show && isRepeating) &&
                          renderExtraPrev()
                      }
                      {children}
                      {
                          (length > show && isRepeating) &&
                          renderExtraNext()
                      }
                  </div>
              </div>
              {/* You can alwas change the content of the button to other things */}
              {
                  (isRepeating || currentIndex < (length - show)) &&
                  <button onClick={next} className="right-arrow" style={{border: '2px solid black'}}>
                      {/* &gt; */}
                      <strong>{'>>'}</strong>
                  </button>
              }
          </div>
      </div>
  )
}


const HeaderOneStyle = {
  fontSize: '35px', 
  fontWeight: '800', 
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'
}

const CardThumbnailStyle = {
  backgroundImage: `url(${reactcourse})`, 
  backgroundSize: '100% 100%', 
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: 'auto',
  border: '3px solid black',
  //margin: '0 auto',
  borderRadius: '15px'
}

  
export default CoursePage;