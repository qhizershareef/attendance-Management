const attendanceForm = document.querySelector('form');
const studentsList = document.querySelector('.students-list');
const studentsTable = document.querySelector('.students_Table');
const registeredStudents = []
let students = [];
const presentStudents = [];
const absentStudents = [];
const loadStudents = ()=>{
    console.log('loading students')
    const db = firebase.firestore();
    const collectionRef = db.collection('Students');
    collectionRef.get().then(snapshot=>{
        snapshot.docs.forEach((el)=>{
            const data = el.data();
            registeredStudents.push(data)
        })
        if(registeredStudents && registeredStudents.length!=0){
            registeredStudents.map((el,index)=>{
                display(el,index)
            })
        }else{
            studentsList.innerHTML = `<h3>No students registered</h3>`
        }
    }).catch(err=>{
        console.log(err)
    })
}
const display = (student,i)=>{
    console.log(i)
    console.log(student);
    const studentDetails = student.name+';'+student.rollNumber;
    const tableRow = `
        <td>${i+1}</td>
        <td>${student.name}</td>
        <td>${student.rollNumber}</td>
        <td class = "text-center"><input type="checkbox" value=${studentDetails} id = "cb"> </td>
    `;

    const tr = document.createElement('tr');
    tr.innerHTML=tableRow;
    studentsTable.append(tr);


}

if(checkToken()){
    loadStudents();
}else{
    window.location.href = '/index.html'
}


attendanceForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const data = document.querySelectorAll('#cb');
    console.log(data)
    addData(data);
    students=[...presentStudents,...absentStudents];
    addToFirestore();
})

// const markAll = document.querySelector('#markAll');
// markAll.addEventListener('click',()=>{
//     const data = document.querySelectorAll('input[type="checkbox"]');

//     data.forEach(student=>{
//         student.checked = !student.checked;
//     })
// })
const addData = (data)=>{
    for( let i = 0; i < data.length; i++){
        
        const studentDetails = data[i].value;
        const splitDetails= studentDetails.split(';')
        const name = splitDetails[0];
        const rollNo = splitDetails[1];
        const status = data[i].checked;
        const date = new Date();
        let obj = {
            name:name,
            rollNumber:rollNo,
            status:status,
            date:date
        }
        if(data[i].checked){
            presentStudents.push(obj);
        }else{
            absentStudents.push(obj);
        }
    }
}

const addToFirestore = ()=>{
    const db = firebase.firestore();
    const batch = db.batch();
    const collectionRef = db.collection('Attendance');
    students.forEach(student=>{
        const docRef = collectionRef.doc();
        batch.set(docRef,student);
    })
    batch.commit().then(()=>{
        console.log('data added')
        alert('Marked Attendance Successfully!');
    }).catch(err=>{
        console.log(err)
    })
}
