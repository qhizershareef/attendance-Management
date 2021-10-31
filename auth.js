const authToken = localStorage.getItem('qtoken');
const data = JSON.parse(authToken);

let resExists = false;

if(authToken && data){
    // display.classList.remove('ifLogged');
    db.collection('Students').doc(data.uid).get().then((snapshot)=>{
        const user = snapshot.data();
        return  user;
    }).then((data)=>{
        console.log(data)
        // displayName.innerHTML=data.name+' '+data.rollNumber;    
        student.student = data;
        document.querySelectorAll('.student-Name').forEach((el)=>{
            el.innerText=data.name;
        })
        fetchStudentDetails(data.rollNumber);
        
    })
}
else{
    // display.classList.add('ifLogged')
    window.location.replace('index.html');

}
