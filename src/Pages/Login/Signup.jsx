import React, { useState } from 'react';
import useFirebase from '../../hooks/useFirebase';
import './Signup.css'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { GrTwitter } from "react-icons/gr";
import { IoLogoLinkedin } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

/* get auth */
    const { handleUserRegister, handleGoogleLogIn, handleNameChange, userId, error } = useFirebase();

/* form */
    const handleSubmit = e => {
        e.preventDefault();
    }
/* email value */
    const handleEmailChange = e => {
        setEmail(e.target.value)
    }
/* password value */
    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }
/* email btn */
    const handleRegister = () => {
        handleUserRegister(email, password);
        // handleClick()
    }
    console.log(userId)



    /* ______________________________________________________________________ */
	/* Google log in */
    const history = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleLogIn()
        .then((result) => {
            history.replace('/');
        })
    };
	console.log(userId);
	/* ______________________________________________________________________ */



	/* Conditional Alert */
	const [startAlert, setStartAlert] = useState(false);

	const startAlertComponent = () =>{
		setStartAlert(true)
	}
	const CloseAlertComponent = () =>{
		setStartAlert(false)
	}

    return (
        <div>
            <div class="container">
                <div class="row d-flex align-items-center justify-content-center">
                    <div class="col p-0">
                        <form onSubmit={handleSubmit} class="card px-5 py-5"> <span class="circle"><i class="fa fa-check"></i></span>
                            <h5 class="mt-3">Join over 25 million community from around the globe</h5> <small class="mt-2 text-muted">Master the languages of the web: HTML, CSS and javascript. This path will prepare you to build basic websites and then build interactive web apps</small>

                            <div class="form-input"> <i class="fa fa-envelope"></i> <input onBlur={handleEmailChange} type="text" class="form-control text-dark" placeholder="Email address" required/> </div>

                            <div class="form-input"> <i class="fa fa-user"></i> <input onBlur={handleNameChange} type="text" class="form-control text-dark" placeholder="User name" required/> </div>

                            <div class="form-input"> <i class="fa fa-lock"></i> <input onBlur={handlePasswordChange} type="text" class="form-control text-dark" placeholder="password" required/> </div>

                            <div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/> <label class="form-check-label" for="flexCheckChecked"> I agree all the statements </label> </div> 
                            { error ?
                                <Alert mb={'4'} mt={'0'} status='error'>
                                    <AlertIcon />
                                    <Box className='text-dark' flex='1'>
                                        <AlertTitle>Opsssss!</AlertTitle>
                                        <AlertDescription  display='block'>
                                        {error.message}
                                        </AlertDescription>
                                    </Box>
                                    </Alert>
                            : null
                            }

                            <button onClick={handleRegister} type='submit' class="btn btn-primary mt-4 signup">Register for an account</button>

                            <div class="text-center mt-3"> <span>Or continue with these social profile</span> </div>


                            {/* Alert for upcoming features */}

                            { startAlert ?
                                <Alert mb={'4'} mt={'0'} status='warning'>
                                    <AlertIcon />
                                    <Box className='text-dark' flex='1'>
                                        <AlertTitle>Opsssss!</AlertTitle>
                                        <AlertDescription  display='block'>
                                        This feature is not available at this moment. We are lunching this feature soon. Please, Try Email & Password or google sign in method.
                                        </AlertDescription>
                                    </Box>
                                    <CloseButton className='text-dark' onClick={CloseAlertComponent} position='absolute' right='8px' top='8px' />
                                    </Alert>
                            : null
                            }


                            <div class="d-flex justify-content-center mt-4"> <span onClick={googleSignIn} class="social"><FcGoogle/></span> <span class="social text-primary" onClick={startAlertComponent}><BsFacebook/></span> <span onClick={startAlertComponent} class="social text-info"><GrTwitter/></span> <span class="social text-primary" onClick={startAlertComponent}><IoLogoLinkedin/></span> </div>
                            <div class="text-center mt-4"> <span>Already a member?</span> <Link to='/SignIn'><a href="#" class="text-decoration-none">Login</a></Link> </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;