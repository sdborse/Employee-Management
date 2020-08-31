function checkDet(){
    var searchBy=document.getElementById('selectOption').value;
    var key=document.getElementById('name').value;

    if(searchBy=="Select")
    {
        document.getElementById('selectError').innerHTML="Please Select";
        return false;
    }

    if(key=="")
    {
        document.getElementById('nameError').innerHTML="Please Enter "+searchBy;
        return false;
    }

    return true;
}

function getVal() {
    var val = document.getElementById('selectOption').value;
    document.getElementById('name').placeholder="Enter Employee "+val;
}

