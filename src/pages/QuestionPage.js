import { Container, Row, Col, Image, Button, Modal, Carousel } from 'react-bootstrap';
import React, { Component, useState, useCallback, useEffect, useContext } from 'react';
import { AppContext } from '../App';
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

export default function QuestionPage() {

  let appContext = useContext(AppContext);

  return (
    <>
      <NavHeader/>
    </>
  );
}