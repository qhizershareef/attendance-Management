

const firebaseAuthSignIn = (e) => {
    e.preventDefault();
    const email = document.querySelector('#form-Email');

    const password = document.querySelector('#form-Password');
    let location = 'index.html';
    console.log(email.value)
    
    db.collection("Admin").where("email", "==", email.value)
    .get()
    .then(function(querySnapshot) {
        if(querySnapshot.empty){
            console.log("No such user");
            location = location;
        } else {
            location ='/admin/dashboard.html';
            console.log(location)
        }
    })

    firebase.auth().signInWithEmailAndPassword(email.value ,password.value)
    .then((userCredential) => {
        console.log(userCredential)
        alert('logged in');
        var user = userCredential.user;
        const uid = user.uid;
        console.log(uid);
        const userEmail = user.email;
        const token = user.refreshToken
        localStorage.setItem('qtoken', JSON.stringify({ uid, token }))
        email.value='';
        password.value='';
        setTimeout(function(){
            window.location.replace(location);
        }, 1000)

    })
    .catch((error) => {
        alert(error)
    });
}

function checkAdminEmail (email){

}

const signInForm = document.querySelector('.signIn-Form');
signInForm.addEventListener('submit', firebaseAuthSignIn)

