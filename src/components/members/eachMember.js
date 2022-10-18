import React from 'react';
import classes from "./eachMember.module.css";


import maleIcon from "../../assets/images/man.png";
import femaleIcon from "../../assets/images/woman.png";
import info from "../../assets/images/info.png";

const EachMember = (props) => {

    const backCover = {
        background: `linear-gradient(90deg, ${props.color}, #FFFFFF)`
    }
    const topColor = {
        backgroundColor: `${props.color}`
    }
    const listBackCover = {
        backgroundColor: props.color
    }

    // auto format long names to fit box in list view
    // let newFormattedName;
    // if(props.name.length > 8) {
    //     newFormattedName = props.name.split(" ")[0] + "...";
    // }
    const setProfilePix = (gender, picture) => {
        let profileImg;
        if(picture !== "") {
          return profileImg = picture
        }
        if(gender === 'Female') {
          profileImg = femaleIcon
        } else {
          profileImg = maleIcon
        }
        return profileImg
      }
  return (
    props.mode == 'grid' ? <li onClick={props.clicked} className={classes.card_body}>
        <section className={classes.background_cover} style={backCover}>
            <div style={topColor}></div>
            <div></div>
        </section>
        <div className={classes.content}>
            <div className={classes.name_section}>
                <h3>{props.name}</h3>
            </div>
            <div className={classes.image_section}>
                <img src={setProfilePix(props.gender, props.picture)} height={80} width={80} style={{borderRadius: "50%"}} />
            </div>
            <div className={classes.info}>
                <h3>{props.department}</h3>
                <h5>{props.phone}</h5>
            </div>
        </div>
    </li> :
    props.mode == 'list' ? <li onClick={props.clicked} className={classes.list_card_body}>
    <section className={classes.list_background_cover} style={listBackCover}>
        <div style={topColor}></div>
        <div></div>
    </section>
    <div className={classes.list_content}>
        <div className={classes.user_info}>
        <div className={classes.list_image_section}>
            <img src={setProfilePix(props.gender, props.picture)} height={60} width={60} style={{borderRadius: "50%"}} />
        </div>
        <div className={classes.list_name_section}>
            <h3>{props.name}</h3>
            <h5>{props.department}</h5>
            <h5>{props.phone}</h5>
        </div>
        </div>
        <div className={classes.list_info}>
                <img src={info} height={30} width={30} />
                {/* <img src={phone} /> */}
        </div>
    </div>
</li> : null
  )
}

export default EachMember;
