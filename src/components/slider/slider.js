import React, { useEffect, forwardRef, useState } from "react";
import classes from "./slider.module.css";
import styled from "styled-components";
import {useNavigate} from "react-router-dom"

import church1 from "../../assets/images/church1.jpg";
import church2 from "../../assets/images/church2.jpg";
import church3 from "../../assets/images/church3.jpg";

const SlideWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  .mySlides {
    height: inherit;
    /* width: inherit; */
    display: none;
  }
  .mySlides img {
    height: 100%;
    object-fit: cover;
    background-size: cover;
    vertical-align: middle;
  }

  /* Slideshow container */
  .slideshow-container {
    position: relative;
    margin: auto;
    width: 100%;
    height: 100%;
  }

  /* Caption text */
  .view {
    background-color: #000;
    opacity: 0.6;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    color: #ffffff;
    font-size: 25px;
    padding: 8px 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  .view h2,
  .view h3 {
    position: relative;
    top: 10%;
  }

  /* Number text (1/3 etc) */
  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
  }

  /* The dots/bullets/indicators */
  .dot {
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #aaa;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .active {
    background-color: lightyellow;
  }

  .auth {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100px;
    width: 100%;
    margin-bottom: 30px;
  }
  .auth button {
    box-shadow: inset 2px 1px 10px #2d2db9;
    font-size: 20px;
    font-weight: 600;
    color: lightyellow;
    background-color: transparent;
    outline: none;
    border: 3px solid #2d2db9;
    border-radius: 8px;
    padding: 12px 20px;
  }

  /* On smaller screens, decrease text size */
  @media only screen and (max-width: 480px) {
    overflow-x: hidden;
    .mySlides img {
      /* object-fit: cover; */
      background-size: contain;
    }
  }
`;

const BannerSlider = forwardRef((props, ref) => {
  const navigate = useNavigate();
  let [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    slideController();
  }, []);

  const slideController = () => {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex-1].className += " active";
      setTimeout(showSlides, 5000); // Change image every 2 seconds
    }
  };

  return (
    <>
      <SlideWrapper>
        <div className="slideshow-container">
          <div className="mySlides">
            <div className="numbertext">1 / 3</div>
            <img src={church1} width="100%" />
            <div className="view">
              <h2>Welcome to GGM Kings palace</h2>
              <div className="auth">
                <button onClick={() => navigate("/signup")}>Register</button>
                <button onClick={() => navigate("/login")}>Login</button>
              </div>
              <div style={{textAlign:"center"}}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>

          <div className="mySlides">
            <div className="numbertext">2 / 3</div>
            <img src={church2} width="100%" />
            <div className="view">
              <h2>Come and worship with us</h2>
              <div className="auth">
                <button onClick={() => navigate("/signup")}>Register</button>
                <button onClick={() => navigate("/login")}>Login</button>
              </div>
              <div style={{textAlign:"center"}}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>

          <div className="mySlides">
            <div className="numbertext">3 / 3</div>
            <img src={church3} width="100%" />
            <div className="view">
              <h3>Join us as we experience the awesome presence of God</h3>
              <div className="auth">
                <button onClick={() => navigate("/signup")}>Register</button>
                <button onClick={() => navigate("/login")}>Login</button>
              </div>
              <div style={{textAlign:"center"}}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        </div>
      </SlideWrapper>

      {/* <div className={classes.slide_indicator}>
        <SlideWrapper className={classes.slide_wrapper}>
          <div className="slide_timer">{slideIndex == 1 && <div></div>}</div>
          <p className={slideIndex == 1 ? "slide_text_active" : "slide_text_inactive"}>Next day as standard</p>
        </SlideWrapper>
        <SlideWrapper className={classes.slide_wrapper}>
          <div className="slide_timer">{slideIndex == 2 && <div></div>}</div>
          <p className={slideIndex == 2 ? "slide_text_active" : "slide_text_inactive"}>Next day as standard</p>
        </SlideWrapper>
        <SlideWrapper className={classes.slide_wrapper}>
          <div className="slide_timer">{slideIndex == 3 && <div></div>}</div>
          <p className={slideIndex == 3 ? "slide_text_active" : "slide_text_inactive"}>Next day as standard</p>
        </SlideWrapper>
      </div> */}
    </>
  );
});

export default BannerSlider;
