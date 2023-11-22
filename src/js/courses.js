const btnElm = document.querySelector("#btn-save");
const tblBodyElm = document.querySelector("tbody");
const idElm = document.querySelector("#id");
const nameElm = document.querySelector("#name")
const timeElm = document.querySelector("#duration");

loadAllCourses();

function loadAllCourse(){}
 
let courseId = 0;

function addCourse(){
    const trElm = document.createElement("tr")
    tblBodyElm.append(trElm);
    trElm.innerHTML =`
                <td>${'M' + String(courseId).padStart(3, '0')}</td>
                <td>${nameElm.value}</td>
                <td>${timeElm.value}</td>
                <td>
                    <i data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        data-bs-title="Click to edit" 
                        class="edit bi bi-pencil-fill">
                    </i>
                    <i data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        data-bs-title="Click to delete" 
                    class="delete bi bi-trash-fill">
                    </i>
                </td>`
}

const btnNewElm = document.querySelector("#btn-new");
btnNewElm.addEventListener('click', ()=>{
    courseId++;
    idElm.value = 'M' + String(courseId).padStart(3, '0');
   
});

btnElm.addEventListener('click', ()=>{
    
    const courseName = nameElm.value;
    
    if (!courseName.trim()){
        courseName.focus();
        courseName.select();
        return;
    }
    addCourse();
});



