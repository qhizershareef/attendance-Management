const firebaseConfig = {

};

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();



firebaseLogout =()=>{
  localStorage.removeItem('qtoken');
  firebase.auth().signOut().then(() => {
    alert('You are now Logged out!')
    window.location.href= 'index.html';
  }).catch((error) => {
      alert(error)
  });
}
  
//get information about qhizershareef from google
