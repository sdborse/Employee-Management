function checkPassword(){
    var psaa=document.getElementById('password');
    var cpsaa=document.getElementById('cPassword');
    if(psaa.value!=cpsaa.value){
        window.alert("Password and Confirm Password Does not Match");
        return false;
    }
}