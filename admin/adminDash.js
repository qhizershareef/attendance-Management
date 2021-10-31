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
    db.collection('Students').onSnapshot(snapshot => {
        adminDashboard.totalStudents = snapshot.docs.length;
        adminDashboard.students = snapshot.docs.map(doc => doc.data());
        studentsCount.innerHTML = adminDashboard.totalStudents;
        displayStudents();
    });
    
    //create totaladmins length
    db.collection('Admin').get().then((snapshot) => {
        adminDashboard.totalAdmins = snapshot.docs.length;
        adminsCount.innerHTML = adminDashboard.totalAdmins;
    });

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
        db.collection('Students').doc(student.id).delete().then(() => {
                      console.log("Document successfully deleted!");
                      tr.remove()
                  }).catch((error) => {
                      console.error("Error removing document: ", error);
                  });
    tr.append(deleteButton);

    });
tbody.appendChild(tr);
});
}
updateDashBoard();