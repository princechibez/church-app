import React, { useRef } from "react";

// import { Carousel } from "react-responsive-carousel";

import Navbar from "../../components/navbar/navbar";
import BannerSlider from "../../components/slider/slider";
import classes from "./homepage.module.css";
// import Product from "../../components/product/product";

// import img1 from "../../assets/images/down.png";
// import img2 from "../../assets/images/logo.png";
// import img3 from "../../assets/images/Img.png";
// import deliveryIcon from "../../assets/images/Delivery.png";
// import checkmarkIcon from "../../assets/images/Checkmark.png";
// import purchaseIcon from "../../assets/images/Purchase.png";
// import sproutIcon from "../../assets/images/Sprout.png";

const Homepage = () => {
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <BannerSlider />
    </React.Fragment>
  );
};

export default Homepage;
