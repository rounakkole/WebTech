let studentList;
window.addEventListener('DOMContentLoaded',(event)=>{
    displayTableForStudent();
});

function save(){
    try{
       let studentData= createStudentObject();
       createAndUpdateSessionStorage(studentData);
    }
    catch(e)
    {
        console.log(e)
        return;
    }
}

function getInputElementValue(id)
{
   let value=document.getElementById(id).value;
   return value;
}

function nameValidation()
{
        let name=getInputElementValue('name');
        var result=/^[a-zA-Z ]+$/.test(name);
        if(!result)
        {
        alert("Name should not be empty and should have Alphabets only");
        return false;
        }
        return true;
}
function marksValidation(obj)
{
        let marks=document.getElementById(obj.path[0].id).value;
        
        let result=/^[0-9]+$/.test(parseInt(marks));
        if(!result)
        { 
        alert("Marks should be only numeric");
        document.getElementById(obj.path[0].id).value="";
        }
        else if(parseInt(marks)<0 || parseInt(marks)>100)
        {
            alert("Range of marks should be between 0-100.");
            document.getElementById(obj.path[0].id).value="";
        }    
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

function createStudentObject()
{
    let  studentData=new StudentData();
    let studentList=JSON.parse(sessionStorage.getItem("StudentDataList"));
    let editRequest=JSON.parse(sessionStorage.getItem("editStudent"));
    if(studentList!=undefined && editRequest == undefined)
    {
        studentData.id=studentList.length+1;
    }
    else if(editRequest == undefined)
    {
        studentData.id=1;
    }   
    studentData.name=getInputElementValue('name');
    studentData.physics=getInputElementValue('physics'); 
    studentData.math=getInputElementValue('math');
    studentData.chemistry=getInputElementValue('chemistry');
    studentData.english=getInputElementValue('english');  
    studentData.hindi=getInputElementValue('hindi');   
    studentData.percentage=parseInt(studentData.physics)+parseInt(studentData.math)+parseInt(studentData.chemistry)+parseInt(studentData.english)+parseInt(studentData.hindi);
    studentData.percentage=studentData.percentage/5.0;
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    studentData.timestamp = date+' '+formatAMPM(today);
    return studentData;
}

function createAndUpdateSessionStorage(studentData)
{
    let studentDatallList=JSON.parse(sessionStorage.getItem("StudentDataList"));
    let editRequest=JSON.parse(sessionStorage.getItem("editStudent"));
    if(editRequest != undefined)
    {
        studentData.id=editRequest._id;
        const index= studentDatallList
                         .map(stuData=>stuData._id)
                         .indexOf(studentData._id);
                         studentDatallList.splice(index,1,studentData);
    }
   else
   {     
        if(studentDatallList!=undefined){     
            studentDatallList.push(studentData);
        }
        else
        {
            studentDatallList=[studentData]
        }
   }  
   sessionStorage.setItem("StudentDataList",JSON.stringify(studentDatallList));
   displayTableForStudent();
   if(editRequest!=undefined)
   sessionStorage.removeItem("editStudent");
}

function remove(studentID)
{
    let studentList=JSON.parse(sessionStorage.getItem("StudentDataList"));
    if(studentList){
        let studentData=studentList.
                                find(stuData=>stuData._id==studentID);
        if(!studentData){
            return;
        }
        else
        {
           const index= studentList
                         .map(stuData=>stuData._id)
                         .indexOf(studentData._id);
                         studentList.splice(index,1);

        }
    }
    sessionStorage.setItem("StudentDataList",JSON.stringify(studentList));
    displayTableForStudent();
}
function edit(studentID)
{
    let studentList=JSON.parse(sessionStorage.getItem("StudentDataList"));
    let studentData=studentList.
                                find(stuData=>stuData._id==studentID);
    if(!studentData) return;
    sessionStorage.setItem('editStudent', JSON.stringify(studentData));
    document.getElementById('name').value=studentData._name;
    document.getElementById('physics').value=studentData._physics; 
    document.getElementById('math').value=studentData._math;
    document.getElementById('chemistry').value=studentData._chemistry;
    document.getElementById('english').value=studentData._english;  
    document.getElementById('hindi').value=studentData._hindi;   
    document.getElementById('name').readOnly = true;
}

function displayTableForStudent()
{
    var tableData=
    "<tr>"+
    "<th>Student ID</th>"+
    "<th>Student Name</th>"+
    "<th>Math</th>"+
    "<th>Physics</th>"+
    "<th>Chemistry</th>"+
    "<th>English</th>"+
    "<th>Hindi</th>"+
    "<th>Percentage</th>"+
    "<th>Timestamp</th>"+
    "<th>Edit</th>"+
    "<th>Delete</th>"
"</tr>";
   let studentList = JSON.parse(sessionStorage.getItem("StudentDataList"));
   if(studentList!=undefined)
   {     try{
            for(var studentData of studentList)
            {
                tableData=tableData+"<tr>"+
            "<td>"+studentData._id+"</td>"+
            "<td>"+studentData._name+"</td>"+
            "<td>"+studentData._math+"</td>"+
            "<td>"+studentData._physics+"</td>"+
            "<td>"+studentData._chemistry+"</td>"+
            "<td>"+studentData._english+"</td>"+
            "<td>"+studentData._hindi+"</td>"+
            "<td>"+studentData._percentage+"</td>"+
            "<td>"+studentData._timestamp+"</td>"+
            "<td><button onclick=\"edit("+studentData._id+")\">Edit</button></td>"+
            "<td><button onclick=\"remove("+studentData._id+")\">Delete</button></td>"+   
            "</tr>";
            };
        }
        catch(e)
        {
          console.log(e);
        }
        document.getElementById('table-display').innerHTML=tableData;
        if(studentList.length==0)
        document.getElementById('table-display').innerHTML="";
    }  
}


