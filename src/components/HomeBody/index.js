import { Container, Row, Col, Image } from 'react-bootstrap';
import logoEarth from '../../images/earth.png';
import logoGenki from '../../images/logoGenki.svg';
import pictureNoManSky from '../../images/pictureNoManSky.jpg';
import homeForDev from '../../images/homeForDev.jpg';
import theme1 from '../../images/github-socialFULLHD.png';
import spaceman from '../../images/spaceman.png';
import relax from '../../images/relax.jfif';

// style={{width: '100%', height: 'auto', backgroundImage: `url(${theme1})`, 
//                   backgroundSize: '100% 100%', 
//                   backgroundRepeat: 'no-repeat',
//                   backgroundPosition: 'center center',
//                   WebkitBackgroundSize: 'cover',
//                   MozBackgroundSize: 'cover',
//                   OBackgroundSize: 'cover'
//                   }}
// #8193b2

const divStyle = {
  backgroundImage: `url(${theme1})`, 
  backgroundSize: '100% 100%', 
  backgroundRepeat: 'no-repeat',
  maxWidth: '1980px',
  maxHeight: '1080px',
  margin: '0 auto',
};

const colStyle = {
  boxSizing: 'border-box', 
  textAlign: 'left', 
  marginTop: '5%'
};

const h1Style = {
  fontSize: '72px', 
  fontWeight: '800', 
  color: 'white',
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'
};

const spanStyle = {
  fontSize: '30px', 
  // color: '#c3c9de',
  background: 'linear-gradient(to right, #db469f , #2188ff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  WebkitBoxDecorationBreak: 'clone',
  fontWeight: '800', 
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol'
};

const spanHomeStyle = {
  fontSize: '30px', 
  // color: '#c3c9de',
  background: 'linear-gradient(to right, #db469f , #2188ff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  WebkitBoxDecorationBreak: 'clone',
  fontWeight: '800', 
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol'
};

const pStyle = {
  fontSize: '25px', 
  color: 'black',
  fontWeight: '500', 
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol'
};

const pHomeStyle = {
  fontSize: '25px', 
  color: 'black',
  fontWeight: '800', 
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol'
};

const pHomeDiscussionStyle = {
  fontSize: '25px', 
  color: 'black',
  fontWeight: '500',
  textAlign: 'left',
  fontFamily: 'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol'
};

function HomeBody() {
  return (
    <>
      <div style={divStyle}>
        <Container>
          
          <Row>
            <Col style={colStyle}>
              <h1 style={h1Style}>Where the world builds sofware</h1>
              {/* <p style={pStyle}>Millions of developers and companies build, ship, and maintain their software on Genki Dama most advanced development platform in the world.</p> */}
            </Col>
            <Col>
              <Image src={logoEarth} fluid />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
          
        <Row>
          <Col style={colStyle}>
            <span style={spanStyle} >Millions of developers and companies </span><p style={pStyle}> build, ship, and maintain their software on Genki Dama most advanced development platform in the world.</p>
            <Image src={logoGenki} style={{width: '60%', height: '60%'}}/>
          </Col>
          <Col>
            {/* <Image src={logoEarth} rounded /> */}
            {/* <image src={logoEarth} /> */}
            <Image src={pictureNoManSky} style={{width: '100%', height: '100%', borderRadius: '30px'}}/>
          </Col>
        </Row>
      </Container>

      <Container style={{marginTop: '50px'}}>
          
        <Row>
          <Col>
            {/* <Image src={logoEarth} rounded /> */}
            {/* <image src={logoEarth} /> */}
            <Image src={homeForDev} style={{borderRadius: '30px', width: '60%'}} fluid />
          </Col>

          <Col style={colStyle} xs={6}>
            <p style={pHomeStyle}><span style={spanHomeStyle}>The home </span> of all developers - including you</p>
            <p style={pHomeDiscussionStyle}>Genki Dama Discussions is dedicated space for your community to come together, ask and answer questions, and have open-ended conversations.</p>
            
          </Col>
        </Row>
      </Container>

      <Container style={{marginTop: '50px'}}>
          
        <Row>
          <Col style={colStyle} xs={6}>
            <p style={pHomeStyle}><span style={spanHomeStyle}>Developer storíe</span> from our partners</p>
            
          </Col>
          <Col>
            {/* <Image src={logoEarth} rounded /> */}
            {/* <image src={logoEarth} /> */}
            <Image src={relax} style={{borderRadius: '30px', width: '60%'}} fluid />
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default HomeBody;