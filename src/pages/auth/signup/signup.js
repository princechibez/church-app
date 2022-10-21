import React, { useMemo, useState, useEffect, useRef } from "react";

import axios from "../../../utility/axios";
import {toast, ToastContainer} from "react-toastify"

import classes from "./signup.module.css";
import Navbar from "../../../components/navbar/navbar";
import Input from "../../../UI/input/input";
import googleIcon from "../../../assets/images/search.png";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import ErrorModal from "../../../utility/Modal/ErrorModal/errorModal";
import { departments } from "../../../models/departments";
// import "dotenv/config";

const Signup = () => {
  const navigate = useNavigate();
  const [tooglePassword, setTooglePassword] = useState("password");
  const [modalState, setModalState] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [successMessage, setSuccessMessage] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  let details = {};
  const [searchParams] = useSearchParams();
  for (const param of searchParams.entries()) {
    details[param[0]] = param[1];
  }

  useEffect(() => {
    if (modalState) {
      setTimeout(() => {
        setModalState(null);
      }, 3000);
    }
  }, [modalState]);

  const [signupForm, setSignupForm] = useState({
    fullName: {
      elementType: "input",
      inputConfig: {
        placeholder: "Full Name",
        type: "text",
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.fullName,
      touched: false,
    },
    phoneNumber: {
      elementType: "input",
      inputConfig: {
        placeholder: "Phone Number",
        type: "text",
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
        min: 11,
        max: 11,
      },
      value: details?.phoneNumber,
      touched: false,
    },
    whatsappNumber: {
      elementType: "input",
      inputConfig: {
        placeholder: "Whatsapp Number",
        type: "text",
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
        min: 11,
        max: 11,
      },
      value: details?.whatsappNumber,
      touched: false,
    },
    email: {
      elementType: "input",
      inputConfig: {
        placeholder: "Email Address",
        type: "email",
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.email,
      touched: false,
    },
    password: {
      elementType: "input",
      inputConfig: {
        placeholder: "Password",
        type: tooglePassword,
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
        min: 8,
      },
      value: details?.password,
      touched: false,
    },
    confirmPassword: {
      elementType: "input",
      inputConfig: {
        placeholder: "Confirm Password",
        type: tooglePassword,
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.password,
      touched: false,
    },
    homeAddress: {
      elementType: "input",
      inputConfig: {
        placeholder: "Address",
        type: "text",
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.homeAddress,
      touched: false,
    },
    occupation: {
      elementType: "input",
      inputConfig: {
        placeholder: "Occupation (If a student, type student)",
        type: "text",
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.occupation,
      touched: false,
    },
    officeAddress: {
      elementType: "input",
      inputConfig: {
        placeholder: "Office Address, put school if student",
        type: "text",
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.officeAddress,
      touched: false,
    },
    NOK: {
      elementType: "input",
      inputConfig: {
        placeholder: "Next of Kin",
        type: "text",
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.NOK,
      touched: false,
    },
    prayerRequest: {
      elementType: "textarea",
      inputConfig: {
        placeholder: "Prayer Request, note that you can always change this in your profile anytime.",
        type: "text",
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.prayerRequest,
      touched: false,
    },
    gender: {
      elementType: "select",
      initialVal: "Select Gender",
      inputConfig: {
        options: [
          {value: "Male", displayValue: "Male"},
          {value: "Female", displayValue: "Female"},
        ]
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.gender,
      touched: false,
    },
    department: {
      elementType: "select",
      initialVal: "Choose Department",
      inputConfig: {
        options: [...departments]
      },
      validation: {
        valid: details.editing ? true : false,
        required: true,
      },
      value: details?.departments,
      touched: false,
    },
    validForm: false,
  });

  const checkInputValidity = (value, validationRules, identifier, formObj) => {
    let isValid = true;
    if (identifier === "email") {
      const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      isValid = isValid && value.trim().match(emailFormat);
      isValid = isValid && value.trim() !== "";
    }

    if (
      identifier ===
      ("fullName" ||
        "homeAddress" ||
        "occupation" ||
        "officeAddress" ||
        "NOK" ||
        "prayerRequest")
    ) {
      // isValid = isValid && value.trim() !== "";
      isValid = isValid && value.trim() !== "";
    }

    if (validationRules.min || validationRules.max) {
      isValid = validationRules.max
        ? isValid && value.trim().length <= validationRules.max
        : (isValid = true);
      isValid = isValid && value.trim().length >= validationRules.min;
      isValid = isValid && value.trim() !== "";
    }

    if (identifier === "confirmPassword") {
      isValid = isValid && value.trim() === formObj["password"].value;
    }
    if (identifier === "gender") {
      isValid = isValid && value.trim() !== "Select Gender";
    }
    if (identifier === "department") {
      isValid = isValid && value.trim() !== "Choose Department";
    }

    if (!validationRules.required) return true;
    if (isValid) {
      return true;
    } else {
      return false;
    }
  };

  const inputChangedHandler = (event, identifier) => {
    let validForm = true;
    const newForm = { ...signupForm };
    const formConfigs = { ...newForm[identifier] };
    formConfigs.touched = true;
    formConfigs.value = event.target.value;
    formConfigs.value == ""
      ? (formConfigs.touched = false)
      : (formConfigs.validation.valid = checkInputValidity(
          formConfigs.value,
          formConfigs.validation,
          identifier,
          newForm
        ));
    newForm[identifier] = formConfigs;
    setSignupForm(newForm);

    for (const keys in signupForm) {
      if (keys === "validForm") continue;
      validForm = validForm && signupForm[keys].validation.valid;
    }
    setFormIsValid(validForm);
  };

  const passwordToogler = (identifier) => {
    setTooglePassword(tooglePassword == "text" ? "password" : "text");
    const form = { ...signupForm };
    const identified = { ...form[identifier] };
    identified.inputConfig.type = tooglePassword;
    form[identifier] = identified;
    setSignupForm(form);
  };

  const formSubmitter = async () => {
    
    let newForm = {};
    for (const keys in signupForm) {
      if (keys === "validForm") continue;
      newForm[keys] = signupForm[keys].value;
    }
    
    // Send Signup Request
    const id = toast.loading("Wait a few moment, we are registering you...")
    try {
      const response = !details.editing ? await axios.put(
        `auth/signup`,
        JSON.stringify(newForm),
        { headers: { "Content-Type": "application/json" } }
      ) : await axios.patch(
        `members/updatemember/${details._id}`,
        JSON.stringify(newForm),
        { headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("token") } }
      )
      toast.update(id,  {render: response.data.message, type: "success", isLoading: false, autoClose: 2000})
      setTimeout(() => {
        details.editing ? navigate(`/members`) : navigate("/login");
      }, 2000);

    } catch (err) {
      toast.update(id, {render: err.response.data, type: "error", isLoading: false, autoClose: 2000 });
    }

  };

  const redirectToLogin = () => {
    navigate({ pathname: "/login" });
  };

  const formArranger = [];
  for (let eachCredential in signupForm) {
    if (eachCredential === "validForm") continue;
    formArranger.push({
      key: eachCredential,
      elementConfig: signupForm[eachCredential],
    });
  }

  return (
    <React.Fragment>
      <main>
      <ToastContainer />
      <div className={classes.formbody}>
        <div
          style={{
            fontSize: "18px",
            lineHeight: "100px",
            fontFamily: "PT Sans",
            // marginTop: modalState ? "0px" : "-50px",
          }}
        ></div>
        <div className={classes.inputs}>
          <h1 style={{color: "#646464"}}>{details.editing ? "Update Profile" : "Create Account"}</h1>
          {formArranger.map((element) => (
            <Input
              key={element.key}
              initialVal={element.elementConfig.initialVal}
              elementType={element.elementConfig.elementType}
              elementConfig={element.elementConfig.inputConfig}
              tooglePassword={() => passwordToogler(element.key)}
              passwordMode={tooglePassword}
              type={element.key}
              value={element.elementConfig.value}
              changed={(event) => inputChangedHandler(event, element.key)}
              valid={element.elementConfig.validation.valid}
              touched={element.elementConfig.touched}
              // disabled={details.editing}
            />
          ))}
        </div>
        <div>
          <p style={{ fontSize: "14px" }}>
            By creating a new account, you agree to GGM's{" "}
            <span
              style={{ fontSize: "16px", color: "#084777", fontWeight: 500 }}
            >
              Terms of Service
            </span>{" "}
            and{" "}
            <span
              style={{ fontSize: "16px", color: "#084777", fontWeight: 500 }}
            >
              Privacy Policy
            </span>
          </p>
        </div>
        <div className={classes.action_section}>
          <button disabled={!formIsValid} onClick={formSubmitter}>
            {details.editing ? "Update" : "Create account"}
          </button>
          <p style={{ color: "#535350", fontSize: "18px", fontWeight: "400" }}>
            OR
          </p>
          <button className={classes.continue}>
            <img src={googleIcon} height={25} width={25} /> Continue with Google
          </button>
          <div>
            <p style={{ fontSize: "14px", padding: "8px" }}>
              Already have an account?
              <span
                style={{
                  fontSize: "16px",
                  color: "#084777",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                onClick={redirectToLogin}
              >
                {" "}
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
    </React.Fragment>
  );
};

export default Signup;
