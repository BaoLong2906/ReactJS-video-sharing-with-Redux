import { Image } from 'react-bootstrap';
import logoGenki from "../../images/logoGenki.svg";

function LoadingScreen() {

  return (
    <>
      {/* <Spinner animation="border" role="status" fluid="xxl">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
      <div style={{marginLeft: '45%', marginTop: '10%'}}>
        {/* <FadeLoader margin={50} radius={4} height={150} width={5} color={'blue'}/> */}
        <h1 style={{marginLeft: '10px'}}>Loading...</h1>
        <Image src={logoGenki} width={'40%'}/>
      </div>
    </>
  );
}

export default LoadingScreen;