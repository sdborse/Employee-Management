function enableFields() {
	var userId=document.getElementById('userId').value;
	if (userId!="") {
		window.location.href=document.getElementById('updateForm').action="/employeeDetails";
		document.getElementById('userName').disabled =false;
		document.getElementById('userName').focus();
	}
	
}

function getEmployee(){
    document.getElementById('form1').action="/updateEmployee";
    document.getElementById("form1").submit();
}


function formValidate() {
    var numberPattern=/^[0-9]+$/;
    var mobileNumberPattern=/^\d{10}$/;
    var emailPattern=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var floatPattern=/^[+-]?\d+(\.\d+)?$/;

    var employeeId=document.getElementById('userId').value;
    var employeeName=document.getElementById('userName').value;
    var employeeMobileNumber=document.getElementById('userMobileNumber').value;
    var employeeEmailId=document.getElementById('userEmailId').value;
    var employeeQualification=document.getElementById('userQualification').value;
    var employeeSalary=document.getElementById('userSalary').value;
    var employeeDepartment=document.getElementById('userDepartment').value;

    //------------------To validate Employee Id------------------------
    if (employeeId=="") {
        document.getElementById('userIdError').innerHTML="Employee Id Required";
        return false;
    }
    else{
        if(employeeId.match(numberPattern)) {
            document.getElementById('userIdError').innerHTML="";
        }  
        else {
            document.getElementById('userIdError').innerHTML="Only Number is Accepted";
            return false;
        } 
    }
    
    //------------------------------employee name validation-----------------------
    if (employeeName=="") {
        document.getElementById('userNameError').innerHTML="Employee Name Required";
        return false;
    }

    //----------------------------employee mobile number validation-----------------------------
    if (employeeMobileNumber=="") {
        document.getElementById('userMobileNumberError').innerHTML="Mobile Number Required";
        
    }
    else {
        if(employeeMobileNumber.match(mobileNumberPattern)) {
            document.getElementById('userMobileNumberError').innerHTML="";
        }  
        else {
            document.getElementById('userMobileNumberError').innerHTML="Invalid Mobile Number";
            return false;
        } 
    }

    //--------------------------employee email validation------------------------------------
    if (employeeEmailId=="") {
        document.getElementById('userEmailIdError').innerHTML="Email Address Required";
    }
    else {
        if(employeeEmailId.match(emailPattern)) {
            document.getElementById('userEmailIdError').innerHTML="";
        }  
        else {
            document.getElementById('userEmailIdError').innerHTML="Invalid Email Address";
            return false;
        } 
    }

    //------------------------employee qualification validation----------------------
    if (employeeQualification=="") {
        document.getElementById('userQualificationError').innerHTML="Employee Qualification Required";
    }

    //----------------------employee salary validation---------------------------
    if (employeeSalary=="") {
        document.getElementById('userSalaryError').innerHTML="Employee Salary Required";
        return false;
    }
    else{
        if(employeeSalary.match(floatPattern)) {
            document.getElementById('userSalaryError').innerHTML="";
        }  
        else {
            document.getElementById('userSalaryError').innerHTML="Only Number is Accepted";
            return false;
        } 
    }

    //-----------------employee Department validation-----------------------
    if (employeeDepartment=="") {
        document.getElementById('userDepartmentError').innerHTML="Employee Department Required";
        return false;
    }

}