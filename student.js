const student ={
    totalDays:0,
    totalPresent:0,
    totalAbsent:0,
};

// db.collection('Students').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data());
//     });
// });

//fetch all the collections who belong to a given rollnumber
const fetchStudentDetails=(rollNumber)=>{
    console.log('rollno', rollNumber);
    db.collection('Attendance').where('rollNumber','==',rollNumber).get().then((snapshot) => {
        student.totalDays = snapshot.docs.length;
        student.totalPresent = snapshot.docs.filter(doc => doc.data().status === true).length;
        student.totalAbsent = student.totalDays - student.totalPresent;
        updateDash();
    });
}


const updateDash = () => {
    document.getElementById('totalDays').innerHTML = student.totalDays;
    document.getElementById('totalPresent').innerHTML = student.totalPresent;
    document.getElementById('totalAbsent').innerHTML = student.totalAbsent;

    //add present percentage to the dashboard
    document.getElementById('averagePresentPercentage').innerHTML = ((student.totalPresent / student.totalDays) * 100).toFixed(2);

}