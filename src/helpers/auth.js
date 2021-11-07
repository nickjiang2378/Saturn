import firebase from 'firebase/app'
import 'firebase/auth'

export const logoutUser = () => {
  // TODO: Log user out
}

export const signUpUser = async ({ name, email, password }) => {
  // Always use a try-catch block to handle authentication. 
  // This is because of the data flow, error messages, etc. that we can receive
  try {
    let auth = getAuth();
    let user;
    await firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      // Signed in 
      user = userCredential.user;
      console.log('User account created & signed in!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });;

    return { user }
  } catch (error) {
    // TODO: Return the error message
    // Hint: error is an object

  }
}

export const loginUser = async ({ email, password }) => {
  // TODO: Log a user in with email and password
  // Hint: The structure is similar to signUpUser(...)

}

export const sendEmailWithPassword = async (email) => {
  // TODO: When user click on button, your app should send a reset password to the user's email
}
