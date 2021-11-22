const adminDashboard ={
    totalStudents:0,
    students:[],
    totalAdmins:0,
    totalAbsent:0,
};
console.log(123)

const studentsCount = document.querySelector('#students_Count');
const adminsCount = document.querySelector('#admins_Count');

const tbody = document.getElementById('students_table_dashboard');

function updateDashBoard(){
    if(checkToken()){
        db.collection('Students').onSnapshot(snapshot => {
            adminDashboard.totalStudents = snapshot.docs.length;
            adminDashboard.students = snapshot.docs.map(doc => doc.data());
            studentsCount.innerHTML = adminDashboard.totalStudents;

            resetTable();
            displayStudents();
        });
        
        //create totaladmins length
        db.collection('Admin').get().then((snapshot) => {
            adminDashboard.totalAdmins = snapshot.docs.length;
            adminsCount.innerHTML = adminDashboard.totalAdmins;
        });
    
    }else{
        window.location.replace('/index.html');
    }

}

function resetTable(){
    tbody.innerHTML='';
}

const displayStudents=()=>{
    adminDashboard.students.forEach(student => {
        console.log(student)
        //append data to table
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${student.rollNumber}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td><button type="button" class="btn btn-block btn-danger">Delete</button></td>
      `;
      
    //firebase firestore delete an object on clicking button

    //firebase remove an object on clicking button
    const deleteButton = tr.querySelector('button');
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        //remove the student details of the student by matching email
        db.collection('Students').where('email', '==', student.email).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                db.collection('Students').doc(doc.id).delete();
            });
        });
        //firebase auth remove an account by email value

        tr.append(deleteButton);

    });
tbody.appendChild(tr);
});
}
updateDashBoard();