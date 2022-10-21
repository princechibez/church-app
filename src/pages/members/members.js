import React, { createContext, useEffect, useLayoutEffect, useState } from "react";
import EachMember from "../../components/members/eachMember";
import classes from "./members.module.css";
import axios from "../../utility/axios";
import Spinner from "../../components/spinner/spinner";
// import lazyloader from "../utility/lazyloader";
import sorter from "../../assets/images/sorter.png";
import list from "../../assets/images/list.png";
import grid from "../../assets/images/grid.png";
import maleIcon from "../../assets/images/man.png";
import userIcon from "../../assets/images/user.png";
import femaleIcon from "../../assets/images/woman.png";
import search from "../../assets/images/search.png";
import ErrorHandler from "../../utility/errorHandler";

import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { departments } from "../../models/departments";
import Modal from "../../utility/Modal/modal/modal";
// import Modal from "../../utility/Modal/errorModal";

// const cardLazyLoader = lazyloader(() => {
  //   return import("../components/card");
  // });
  
  export const MemberContext = createContext(null);

const Members = (props) => {
  const navigate = useNavigate();

  const [filterdUsers, setfilteredUsers] = useState([]);
  const colorShuffle = ["#E8CDAD", "#E1D3C7", "#A7B8A8"];
  const [searchMessage, setSearchMessage] = useState(null);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState("name");
  const [viewMode, setViewMode] = useState("list");
  
  useLayoutEffect(() => {
    const fetchData = () => {
      //   try {
      setLoading(true); //Set loader before fetching data
      axios
        .get("/members/getallmembers", {headers: {Authorization: localStorage.getItem("token")}})
        .then((res) => {
          setLoading(false);
          setfilteredUsers(res.data.members);
          setUsers(res.data.members);
        })
        //   }
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    };
    fetchData();
  }, []);


  //   function for randomly choosing colors
  const randomColorPicker = () => {
    const randomColor = Math.floor(Math.random() * colorShuffle.length);
    return colorShuffle[randomColor];
  };

  // Function for changing mode
  const changeViewMode = () => {
    if (viewMode === "grid") {
      setViewMode("list");
    }
    if (viewMode === "list") {
      setViewMode("grid");
    }
  };

  //   Search by name filter function
  const searchByName = (e) => {
    if (!users) return;
    const query = e.target.value;
    // Create copy of item list
    let newList = [...filterdUsers];
    let updatedList = [];
    // Include all elements which includes the search query
    updatedList = newList.filter((item) => {
      setSearchMessage(null);
      const name = item.fullName;
      const departments = item.departments.join(" ")
      if(searchMode === "name") return name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      if(searchMode === "department") return departments.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    if (updatedList.length === 0) {
      setSearchMessage("No member matched your search");
    }
    if (query === "") {
      setSearchMessage(null);
    }

    // Trigger render with updated values
    setUsers(updatedList);
  };

  const goToDetails = (member) => {
    console.log(member)
    const detailParams = Object.assign({}, {...member, departments: member.departments.major})
    navigate(`/member-details?${createSearchParams(detailParams)}`)
  }

  const setProfilePix = () => {
    const member = filterdUsers.find(m => m._id === localStorage.getItem("memberId"))
    member && localStorage.setItem("pix", member.profilePicture)
    let profileImg;
    if(localStorage.getItem("pix") === "") {
      profileImg = userIcon
    } else {
      profileImg = localStorage.getItem("pix")
    }
    return profileImg
  }

  const goToProfile = () => {
    const params = filterdUsers.find(m => m._id === localStorage.getItem("memberId"));
    navigate(`/member-details?${createSearchParams(params)}`)
    // console.log(params)
  }

  return (
      localStorage.getItem("auth") === null ? <Modal show>Please go and <Link to="/login">login</Link> to your account</Modal> :
    <MemberContext.Provider value={{filterdUsers}} className={classes.body_wrapper}>
      {/* <Modal show /> */}
      <div className={classes.top_area}>
        <div className={classes.profiler}>
        <h1>Meet other members</h1>
        <img src={setProfilePix()} onClick={goToProfile} style={{borderRadius: "50%", objectFit: "cover"}} height={60} width={60} />
        </div>
        <div className={classes.functionality_controllers}>
          <div>
            <img src={search} height={15} width={15} />
            <input
              type="text"
              onKeyUp={searchByName}
              placeholder={searchMode==="name"?"look for a member":"Search by department"}
            />
          </div>
          <div>
            <img src={sorter} onClick={() => searchMode==="name"?setSearchMode("department"):setSearchMode("name")} height={30} width={30} />
            <img
              onClick={changeViewMode}
              src={viewMode === "grid" ? grid : list}
              height={30}
              width={30}
            />
          </div>
        </div>
      </div>
      <main
        className={viewMode == "grid" ? classes.grid_area : classes.list_view}
      >
        {loading && <Spinner />}
        {users &&
          !loading &&
          users.map((e, i) => {
            return (
              // Load card lazily
              <EachMember
                clicked={() => goToDetails(filterdUsers[i])}
                key={i}
                mode={viewMode}
                color={randomColorPicker()}
                gender={e.gender}
                name={e.fullName ? e.fullName : ""}
                picture={e.profilePicture ? e.profilePicture: ""}
                phone={e.phoneNumber}
                department={e.departments.major}
              />
            );
          })}
        {searchMessage && (
          <h3
            style={{ color: "#292929", textAlign: "center", padding: "20px" }}
          >
            {searchMessage}
          </h3>
        )}
        {/* {users?.length === 0 && (
          <h3 style={{ color: "#292929", textAlign: "center", padding: "20px" }}>
            No member has registered yet
          </h3>
        )} */}
        {/* {!loading && !users && <h3>No users</h3>} */}
      </main>
    </MemberContext.Provider>
  );
};

export default ErrorHandler(Members, axios);
