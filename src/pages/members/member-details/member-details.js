import React, { useContext, useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
  useSearchParams,
  Link,
  createSearchParams,
} from "react-router-dom";
import axios from "../../../utility/axios";

// import * as actionTypes from "../../../store/index";
import classes from "./member-details.module.css";
import profile from "../../../assets/images/user.png";
import phoneIcon from "../../../assets/images/phone.png";
import mailIcon from "../../../assets/images/mail.png";
import maleIcon from "../../../assets/images/man.png";
import femaleIcon from "../../../assets/images/woman.png";
import Modal from "../../../utility/Modal/modal/modal";
import Spinner from "../../../components/spinner/spinner";

const MemberDetails = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let details = {};
  let depts = [];
  let roles = [];
  const [searchParams] = useSearchParams();
  for (const param of searchParams.entries()) {
    if(param[0] === "departments") {
      depts.push(param[1])
      continue
    }
    if(param[0] === "roles") {
      roles.push(param[1]);
      continue
    }
    details[param[0]] = param[1];
  }
  details["departments"] = depts;
  details["roles"] = roles;

  const updateMember = () => {
    const params = {...details, editing: true}
    navigate({
      pathname: "/signup",
      search: `?${createSearchParams(params)}`
    });
  };

  const deleteContact = () => {
    axios
      .delete(
        `members/deletecontact/${props.contact._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        navigate(`/contact-list`, { replace: true });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const genBase64 = (file) => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(err);
    });
    reader.readAsDataURL(file);
    return promise;
  };

  const fileChangedHandler = async (e) => {
    // const formData = new FormData();
    // formData.append("profile-image", e.target.files[0]);
    const base64 = await genBase64(e.target.files[0]);
    setLoading(true);
    axios
        .post(
          `members/profilePixUpload/${details._id}`,
          JSON.stringify({image: base64}),
          { headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("token") } }
        )
        .then((res) => {
          setLoading(false)
          details.profilePicture = res.data.img;
          localStorage.setItem("pix", res.data.img)
          navigate("/members");
          // window.location.reload();
        })
        .catch((err) => console.log(err));
  };

  const communicate = (type, medium) => {
    if(type === "call") return `tel:${medium}`
    if(type === "sendmail" ) return `mailto:${medium}`;
  };

  const setProfilePix = (details) => {
    let profileImg;
    if(details.profilePicture !== "") {
      return profileImg = details.profilePicture
    }
    if(details.gender === 'Female') {
      profileImg = femaleIcon
    } else {
      profileImg = maleIcon
    }
    return profileImg
  }

  const imgSec = () => {
    let imgDisplay;
    if(loading) {
      return imgDisplay = <Spinner />
    }
    imgDisplay = <>
    <img src={setProfilePix(details)} alt="profile-image" />
        {details._id === localStorage.getItem("memberId") && <input
          type="file"
          name="profile-image"
          accept="image/*"
          onChange={fileChangedHandler}
        />}</>
        return imgDisplay
  }

  return (
    localStorage.getItem("auth") === null ? <Modal show>Please go and <Link to="/login">login</Link> to your account</Modal> :
    <div className={classes.detailed_body}>
      <div className={classes.img_section}>
        {imgSec()}
      </div>
      <h1>{details.fullName}</h1>
      <h2>Departments: {details.departments.join(", ")}</h2>
      <h5>
      <a
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            textDecoration: "none",
            color: "inherit",
          }} href={communicate("sendmail", details.email)}>
          {" "}
          <img src={mailIcon} height={35} width={35} /> {details.email}
        </a>
      </h5>
      <h5>
        <a
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            textDecoration: "none",
            color: "inherit",
          }} href={communicate("call", details.phoneNumber)}>
          {" "}
          <img src={phoneIcon} height={35} width={35} /> {details.phoneNumber}
        </a>
      </h5>
      <div className={classes.actions}>
        {details.roles.includes("admin") && <button className={classes.button_one} onClick={deleteContact}>
          Delete Memeber
        </button>}
        {details._id === localStorage.getItem("memberId") && <button className={classes.button_two} onClick={updateMember}>
          Update profile
        </button>}
      </div>
    </div>
  );
};

export default MemberDetails;
