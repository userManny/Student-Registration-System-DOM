let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");


function displayStudents() {
    table.innerHTML = "";

    students.forEach((student, index) => {
        let row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });

    localStorage.setItem("students", JSON.stringify(students));
}


function validate(name, id, email, contact) { 
    // USing Regex expressions for validation
    const nameRegex = /^[A-Za-z ]+$/;   //  only letters A-Z, a-z and spaces
    const idRegex = /^[0-9]+$/;         // only numbers
    const contactRegex = /^[0-9]{10,}$/;   // only numbers with minimun 10 digits
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // 

    if (!name || !id || !email || !contact) {
        alert("All fields are required!");
        return false;
    }
 // regex.test(value) check if value follow Regex rules or not 9

    if (!nameRegex.test(name)) {    
        alert("Name should contain only letters");
        return false;
    }

    if (!idRegex.test(id)) {
        alert("ID should contain only numbers");
        return false;
    }

    if (!contactRegex.test(contact)) {
        alert("Contact must be at least 10 digits");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email");
        return false;
    }

    return true;
}

 // Event listener for submit button
form.addEventListener("submit", function (e) {
    e.preventDefault();   // prevent default behavior of form 

    let name = document.getElementById("name").value.trim();    // .trim() method is used to remove trailing spaces from user input details 
    let id = document.getElementById("studentId").value.trim();
    let email = document.getElementById("email").value.trim();
    let contact = document.getElementById("contact").value.trim();

    if (!validate(name, id, email, contact)) return;

    let student = {    // student object 
    name: name,
    id: id,
    email: email,
    contact: contact
    };


    let existingIndex = students.findIndex(s => s.id === id);  // findIndex will return -1 if not able to find entry in array 

if (existingIndex === -1) {
    students.push(student);
} else {
    students[existingIndex] = student;
}
    form.reset();
    displayStudents();
});


function editStudent(index) {
    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
}


function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}


displayStudents();