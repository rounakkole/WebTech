let isUpdate=false;
let employeePayrollObj={};
window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector('#name');
   // const textError=document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length==0){
           // textError.textContent="";
           setTextValue('.text-error',"")
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.value;
            //textError.textContent="";
            setTextValue('.text-error',"")

        }catch(e){
            textError.textContent=e;
        }
    });
    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input',function(){
        output.textContent=salary.value;
    });
    checkForUpdate();
});

const checkForUpdate=()=>{
    const employeePayrollJson=localStorage.getItem('editEmp');
    isUpdate=employeePayrollJson?true:false;
    if(!isUpdate) return;
    employeePayrollObj=JSON.parse(employeePayrollJson);
    setForm();
}

const setSelectedIndex=(id, index)=>
{
 const element= document.querySelector(id);
 element.selectedIndex=index;
}


const getSelectedValues=(propertyValue)=>
{
    let allItems=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItems.forEach(item=>{
       if(item.checked) selItems.push(item.value);
    });

    return selItems;
}

const getInputValueById = (id) =>{
    let value = document.querySelector(id).value;
    return value;
}

const save=()=>{
    try{
        let employeePayrollData=createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch(e)
    {
        return;
    }
}

const createAndUpdateStorage =()=>{
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(EmployeePayrollList){
        let empPayrollData=EmployeePayrollList.
                                find(empData=>empData._id==employeePayrollObj._id);
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayrollData());

        }
        else
        {
           const index= employeePayrollList
                         .map(empData=>empData._id)
                         .indexOf(empPayrollData._id);
                         employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));

        }
    }
    else
    {
        employeePayrollList=[createEmployeePayrollData()];
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData=(id)=>{
    let employeePayrollData=new EmployeePayrollData();
    if(!id)employeePayrollData.id=createNewEmployeeId();
    else employeePayrollData.id=id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData=(employeePayrollData)=>{
    try{
        employeePayrollData.name=employeePayrollObj._name;
    }
    catch(e)
    {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=employeePayrollObj._profilePic;
    employeePayrollData.gender=employeePayrollObj._gender;
    employeePayrollData.department=employeePayrollObj._department;
    employeePayrollData.salary=employeePayrollObj._salary;
    employeePayrollData.note=employeePayrollObj._note;
    try{
        employeePayrollData.startDate= new Date(Date.parse(employeePayrollObj._startDate));
    }
    catch(e){
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeePayrollObj.toString());
}



const createNewEmployeeId=()=>{
    let empID=localStorage.getItem("EmployeeID");
    empID=!empID?1:(parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}

const setValue=(id, value)=>{
    const element=document.querySelector(id);
    element.value=value;
}

const setForm=()=>{
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date=stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);

    setValue('#month',date[1]);

    setValue('#year',date[2]);
}

const getInputElementValue=(id)=>{
    let value = document.getElementById(id).value;
    return value;
}

const resetForm =() =>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked=false;
    });
}

const salary=document.querySelector('#salary');
         const output=document.querySelector('.salary-output');
         output.textContent=salary.value;
         salary.addEventListener('input',function(){
             output.textContent=salary.value;
         })


const setSelectedValues = (propertyValue,value) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked=true;
            }
        }
        else if(item.value=== value)
        item.checked=true;
    });
}


