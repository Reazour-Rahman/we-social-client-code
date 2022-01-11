import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged , signOut, signInWithPopup, GoogleAuthProvider,updateProfile} from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import initializationAuthentication from "../Pages/firebase/firebase.init";

initializationAuthentication();

const useFirebase = () => {
    const [userId, setUsers] = useState({})
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const auth = getAuth();

    const history = useNavigate();

    const handleNameChange = e => {
        setName(e.target.value)
    }


    /* Register via Email */
    const handleUserRegister = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                handleUpdateUser()
                setUsers(result.user)
                console.log(email, password);
                window.location.replace("https://binary-9cb5f.web.app/userData");
            }).catch((error) => {
                setError(error)
                // console.log(error.message);
            });
    }

    /* log in email */
    const handleUserLogIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUsers(result.user)
                // history.replace('/')
                window.location.replace("https://binary-9cb5f.web.app/");
            }).catch((error) => {
                setError(error)
                // console.log(error.message);
            });
    }

    /* update user  */
    const handleUpdateUser = ()=>{
        updateProfile(auth.currentUser, {
            displayName: name
            }).then(() => {

            }).catch((error) => {

            });
    }
    





    const googleProvider = new GoogleAuthProvider();

    /* google log in */
    const handleGoogleLogIn = () =>{
      setIsLoading(true);
       return signInWithPopup(auth, googleProvider)
    }



    /* Get the currently signed-in user */
    useEffect(()=>{
        onAuthStateChanged(auth, userId => {
            if (userId) {
              setUsers(userId)
            } 
            setIsLoading(false);
          });
    },[])

    const logOut = () => {
        signOut(auth).then(() => {
            setUsers({})
          }).finally( () => setIsLoading(false))
    }


    return {
        userId,
        error,
        handleGoogleLogIn,
        logOut,
        isLoading,
        handleNameChange,
        handleUserRegister,
        handleUserLogIn
    }
};

export default useFirebase;