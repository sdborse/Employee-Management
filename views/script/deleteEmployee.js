function checkDet(){
    var deleteBy=document.getElementById('selectOption').value;
    var key=document.getElementById('name').value;

    if(deleteBy=="Select")
    {
        document.getElementById('selectError').innerHTML="Please Select";
        return false;
    }

    if(key=="")
    {
        document.getElementById('nameError').innerHTML="Please Enter "+deleteBy;
        return false;
    }

    return true;
}

function getVal() {
    var val = document.getElementById('selectOption').value;
    document.getElementById('name').placeholder="Enter Employee "+val;
}