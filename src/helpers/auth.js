import firebase from 'firebase/app'
import 'firebase/auth'

export const logoutUser = () => {
  firebase.auth().signOut().then(() => {
    console.log("Sign out successful")
  }).catch((error) => {
    console.log("Error")
  });
}

export const signUpUser = async ({ email, password }) => {
  // Always use a try-catch block to handle authentication. 
  // This is because of the data flow, error messages, etc. that we can receive
  try {
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

    console.log(error)

  }
}

export const loginUser = async ({ email, password }) => {

  console.log("Logging in user")
  try {
    let user;
    return await firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
      // Signed in 
      user = userCredential.user;
      console.log('User account signed in!');
      return "Success"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
  
      console.error(error);

      return errorCode
    });;

  } catch (error) {

    console.log(error)

  }
}

export const resetPassword = async (email) => {
  console.log("Sending reset email")
  return await firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    console.log("Password Reset Email sent")
    return "Success"
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    return errorCode
  });
}
