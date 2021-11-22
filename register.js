const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    firebaseAuthSignUp();
})
const firebaseAuthSignUp = () => {
    const email = document.querySelector('#form-Email');
    const password = document.querySelector('#form-Password');
    const userName = document.querySelector('#form-userName');
    const rollNumber = document.querySelector('#form-rollNumber');
    const admin =  document.querySelector('#form-Admin').checked || false; //boolean value to create admin account
    let collection = 'Students';
    let obj={};
    // console.log(userName.value,rollNumber.value,email.value, password.value);
    firebase.auth().createUserWithEmailAndPassword(email.value ,password.value)
        .then(() => {
            if(admin){
                collection = 'Admin';
                obj={name:userName.value,email: email.value}
            }
            else{
                collection = 'Students';
                obj= {
                    name: userName.value,
                    rollNumber: rollNumber.value,
                    email: email.value
                };
            }
            firebase.firestore().collection(collection).doc(firebase.auth().currentUser.uid)
            .set(obj).then(()=>{
                alert('You are now registered!')
                
                setTimeout(function(){
                    window.location.replace("index.html");
                }, 1000)
            })
            .catch(error => {
                alert(error)
                console.log('Something went wrong while sending data to firestore: ', error);
            })
    })
}

