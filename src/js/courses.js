const btnNewElm = document.querySelector("#btn-new");
const btnAddElm = document.querySelector("#btn-save");
const nameElm = document.querySelector("#course-name");
const durationElm = document.querySelector("#course-duration");
const tblElm = document.querySelector("#course-table");
const { API_BASE_URL }= process.env;
// const { API_BASE_URL }= 'http://localhost:8080';

getAllCourses();

function getAllCourses(){
    fetch(`${API_BASE_URL}/courses`).then(res =>{
        if (res.ok){
            res.json().then(courseList => courseList.forEach(course => createCourse(course)));
        }else {
            alert("Failed to load the courses!")
        }

    }).catch(err => alert("Something went wrong"));
}

function createCourse(course){
    const tbodyElm = document.querySelector("#course-table tbody");
    const trElm = document.createElement("tr");
    tbodyElm.append(trElm);
    trElm.id = course.id;
    trElm.name = course.name;
    trElm.duration = course.duration;
    trElm.innerHTML = `
                <td class="text-center">${course.id}</td>
                <td>${course.name}</td>
                <td class="text-center">${course.duration}</td>
                <td class="text-end">
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
                </td>`;
    
}

btnAddElm.addEventListener('click', ()=>{
    if (btnAddElm.innerText == "SAVE"){
        const courseName = nameElm.value.trim();
        const courseDuration = durationElm.value.trim();

        if(!courseName){
            nameElm.focus();
            nameElm.select(); 
            return;
        }else if (!courseDuration){
            durationElm.focus();
            durationElm.select();
            return;
        }

            fetch(`${API_BASE_URL}/courses`, {
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name:courseName,
                                    duration:courseDuration})
            }).then(res => {
                if (res.ok){
                    res.json().then(course => {
                        createCourse(course);
                        nameElm.value='';
                        durationElm.value='';
                        nameElm.focus();

                    });
                }else{
                    alert("Failed to add the task");
                }
            }).catch(err => alert("Something went wrong"));
        }
    
})



tblElm.addEventListener('click', (e)=>{
    if (e.target?.classList.contains('delete')){
       const targetId = e.target.closest('tr').id;

       fetch(`${API_BASE_URL}/courses/${targetId}`,{
            method:'DELETE'
       }).then(res=>{
            if (res.ok){
                e.target.closest("tr").remove();
            }else{
                alert("Failed to delete the task");
            }
        }).catch(err => {
            alert("Something went wrong, try again later");
        });  

    }
    if(e.target?.classList.contains('edit')){
        btnAddElm.innerText = "UPDATE";
        nameElm.value = e.target.closest('tr').children[1].innerText;
        durationElm.value = e.target.closest('tr').children[2].innerText;
        const idElm = e.target.closest('tr').children[0].innerText;
         
        const targetId = e.target.closest('tr').id;
       
        btnAddElm.addEventListener('click', ()=>{
                btnAddElm.innerText = "UPDATE";
                console.log
                const courseName = nameElm.value.trim();
                const courseDuration = durationElm.value.trim();
                const newCourse = {
                    // id:idElm,
                    name:courseName,
                    duration:courseDuration
                }
            
                    fetch(`${API_BASE_URL}/courses/${targetId}`, {
                        method:'PATCH',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newCourse)
                    }).then(res => {
                        if (res.ok){
                            res.json().then(course => {
                                
                                nameElm.value='';
                                durationElm.value='';
                                nameElm.focus();
                                
                            });
                        }else{
                            alert("Failed to add the task");
                        }
                    }).catch(err => alert("Something went wrong"));
                
            })
            
        }
}
)
