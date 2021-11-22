const firebaseConfig = {
    apiKey: "AIzaSyAaguzRK6FNY01WzTrmaa3ml7LSUUFwsp8",
    authDomain: "attendance-management-1c90a.firebaseapp.com",
    projectId: "attendance-management-1c90a",
    storageBucket: "attendance-management-1c90a.appspot.com",
    messagingSenderId: "954568865734",
    appId: "1:954568865734:web:fdaaaa259f791cc9dba4c7"
};

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();


const firebaseLogout =()=>{
  localStorage.removeItem('qtoken');
  firebase.auth().signOut().then(() => {
    alert('You are now Logged out!')
    window.location.replace('/index.html');
  }).catch((error) => {
      alert(error)
  });
}
  
//get information about qhizershareef from google