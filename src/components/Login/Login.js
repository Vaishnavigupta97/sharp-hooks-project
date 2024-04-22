import React, {useEffect, useReducer, useState, useContext, useRef } from "react";
import Card from "../UI/Card/Card";
  import Input from "../UI/Input/Input";
//   import AuthContext from "../AuthContext/AuthContextProvider";
import classes from "./Login.css";
import Button from "../UI/Button/Button";
import { type } from "@testing-library/user-event/dist/type";
import AuthContext from "../AuthContext/AuthContextProvider";
// import { cleanup } from "@testing-library/react";
//   const emailState = (state, action) => {
//     if (action.type === "INPUT_EMAIL") {
//       return { value: action.val, isValid: action.val.includes("@") };
//     }
//     if (action.type === "BLUR_INPUT") {
//       return { value: state.value, isValid: state.value.includes("@") };
//     }
//     return { value: "", isValid: false };
//   };
//   const passwordState = (state, action) => {
//     if (action.type === "USER_INPUT") {
//       return { value: action.val, isValid: action.val.trim().length > 6 };
//     }
//     if (action.type === "BLUR_INPUT") {
//       return { value: state.value, isValid: state.value.trim().length > 6 };
//     }
//     return { value: "", isValid: false };
//   };
//   const collegeState = (state, action) => {
//     if (action.type === "USER_INPUT") {
//       return { value: action.val, isValid: action.val.trim().length > 0 };
//     }
//     if (action.type === "BLUR_INPUT") {
//       return { value: state.value, isValid: state.value.trim().length > 0 };
//     }
//     return { value: "", isValid: false };
//   };

const emailReducer = (state, action) => {
    if(action.type === 'USER_INPUT'){
        return {value: action.val, isValid: action.val.includes('@')};
    }
    if(action.type === 'INPUT_BLUR'){
        return {value: state.value, isValid: state.value.includes('@')}
    }
    return {value: '', isValid: false};
}

const passwordReducer = (state, action) => {
    if(action.type === 'PASSWORD_INPUT'){
        return {value: action.val, isValid: action.val.trim().length > 6};
    }
    if(action.type === 'PASSWORD_BLUR'){
        return {value: state.value, isValid: state.value.trim().length > 6}
    }
    return {value: '', isValid: false};
}

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);


  
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });
    const [passWordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null,
    });

    const authCtx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {
        console.log("effect running");
        return () => {
            console.log("EFFECT CLEANUP");
        }
    },[]);

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passWordState;

    // useEffect(() => {
    //     const identifier = setTimeout(() =>{
    //         console.log('checking form validity');
    //         setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
    //     }, 1500);
    //     return () => {
    //         console.log("cleanup");
    //         clearTimeout(identifier);
    //     };
    // },[enteredEmail, enteredPassword]);



    const emailChangeHandler = (event) => {
        // setEnteredEmail(event.target.value);
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});
        setFormIsValid(
            event.target.value.includes("@") && passWordState.isValid
        );
    };
    const passwordChangeHandler = (event) => {
        // setEnteredPassword(event.target.value);
        dispatchPassword({type: 'PASSWORD_INPUT', val: event.target.value});
        setFormIsValid(
            event.target.value.trim().length > 6 && emailState.isValid
        );
    };
    const validateEmailHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'})
        // setEmailIsValid(emailState.isValid);
    };
    const validatePasswordHandler = () => {
        dispatchPassword({type: 'PASSWORD_BLUR'})
        // setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if(formIsValid){
            authCtx.onLogin(emailState.value, passWordState.value);
        }else if (!emailIsValid){
            emailInputRef.current.focus();
        }else{
            passwordInputRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input 
                ref={emailInputRef}
                id="email" 
                label="E-Mail" 
                type="email" 
                isValid={emailIsValid} 
                value={emailState.value}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                 />
                 <Input 
                 ref={passwordInputRef}
                id="password" 
                label="Password" 
                type="password" 
                isValid={passwordIsValid} 
                value={passWordState.value}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                 />
                <div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}>
                    {/* <label htmlFor="email">E-Mail</label>
                    <input
                        // ref={emailInputRef}
                        id="email"
                        type="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    /> */}
                    {/* <label htmlFor="password">Password</label>
                    <input
                        // ref={passwordInputRef}
                        id="password"
                        type="password"
                        label="Password"
                        value={passWordState.value}
                        onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    /> */}
                    <div className={classes.actions}>
                        <Button type="submit" className={classes.btn}>
                            Login
                        </Button>
                    </div>
                </div>
            </form>
        </Card>
    );
};

export default Login;