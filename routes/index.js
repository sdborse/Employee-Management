var express = require('express');
var router = express();
var User = require('../models/user');
var mysql = require('mysql');
var sessions = require('express-session');

var session;

//-------------------------------------------Create Session--------------------------------
router.use(sessions({
	secret: 'sfgw98fumw7ggtnrgu*scsf',
	resave: false,
	saveUninitialized: true
}));
//-----------------------------------sql connection requirement-----------------------------------
var con=mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "sumit",
	database: "employee_management"
});
con.connect(function(err){
	if (err) throw err;
});

//-----------------------------------Index Get Method---------------------------
router.get('/' ,function(req,res,next){
	res.render('index.ejs',{alertType:""});
});

//-----------------------------------Index Post Method---------------------------
router.post('/dashboard', function(req,res,next){
	var pass=req.body.password;
	var unm=req.body.usernm;
	var qur="select * from AdminDetails where UserName='"+unm+"' and Password='"+pass+"'";
	userData=checkAdmin(qur,res,req);
});

function checkAdmin(qur,res,req){
	session=req.session;
	return con.query(qur, function(err,data, fields){
		if(err) throw err;
		if(data[0]!=undefined){
			session.uniqueId=data[0].Id;
			selectAllEmployee(res,"");
		}
		else
			res.render('index.ejs', {alertType:"invalid"});
	});
}
//---------------------------------Logout --------------------------------
router.get('/logout' ,function(req,res,next){
	req.session.destroy(function (err){
		res.render('index.ejs',{alertType:""});
	});
});

//-----------------------------------Dashboard get-----------------------------------
router.get('/dashboard', function (req, res, next) {
	session=req.session;
	if(session.uniqueId){
		selectAllEmployee(res,"");
	}
	else
		res.render('index.ejs', {alertType:"unauthorised"});
});



function selectAllEmployee(res,type){
	var qur="select * from EmployeeDetails ";
	return con.query(qur, function (err, data, fields) {
		if (err) throw err;
		res.render('dashboard.ejs', { userData: data,det: "post",alertType:type});

		});
	
}

//-----------------------------------Add Employee Get Method-----------------------------------
router.get('/addEmployee', function (req, res, next) {
	session=req.session;
	if(session.uniqueId){
		return res.render('addEmployee.ejs', {alertType: ""});
	}
	else
		res.render('index.ejs', {alertType:"unauthorised"});
});
//-----------------------------------Add Employee Post Method-----------------------------------
router.post('/saveEmployeeDetails', function(req, res) {
	const employeeId=req.body.id;
	const employeeName=req.body.name;
	const employeeMobileNumber=req.body.mobileNumber;
	const employeeEmailId=req.body.emailId;
	const employeeQualification=req.body.qualification;
	const employeeSalary=req.body.salary;
	const employeeDepartment=req.body.department;

	addEmployee(employeeId,employeeName,employeeMobileNumber,employeeEmailId,employeeQualification,employeeSalary,employeeDepartment);
	return res.render('addEmployee.ejs', {alertType: "succree"});
});
//-----------------------------------Add New Employee to Database-----------------------------------
function addEmployee(id,name,mobileNumer,emailId,qualification,salary,department){
	var sql = "INSERT INTO EmployeeDetails values("+id+",'"+name+"',"+mobileNumer+",'"+emailId+"','"+qualification+"',"+salary+",'"+department+"')";
	con.query(sql, function (err, result) {
		if (err) 
			throw err;
		return "1 record inserted";
	}); 
}


//-----------------------------------Search Employee Get Method-----------------------------------
router.get('/searchEmployee', function (req, res, next) {
	session=req.session;
	if(session.uniqueId){
		return res.render('searchEmployee.ejs', {det: "get"});
	}
	else
		res.render('index.ejs', {alertType:"unauthorised"});
});
//-----------------------------------Search Employee Post Method-----------------------------------
router.post('/searchEmployee', function(req, res, next){
	const searchBy=req.body.selOption;
	const key=req.body.searchKey;

	selectEmployee(searchBy,key,res);
});
//-----------------------------------Search Employee From Database-----------------------------------
function selectEmployee(searchBy,key,res){
	var qur="select * from EmployeeDetails where "+searchBy+"='"+key+"'";
	return con.query(qur, function (err, data, fields) {
		if (err) throw err;
		res.render('searchEmployee', { userData: data,det: "post"});

		});
}


//-----------------------------------Delete Employee Get Method-----------------------------------
router.get('/deleteEmployee', function (req, res, next) {
	session=req.session;
	if(session.uniqueId){
		return res.render('deleteEmployee.ejs',{alertType:""});
	}
	else
		res.render('index.ejs', {alertType:"unauthorised"});
});
//-----------------------------------Delete Employee From Index Page-----------------------------------
router.get('/deleteEmployeeDetailsById', function (req, res, next) {
	var x=req.query.id;
	deleteEmployee("Id", x);
		selectAllEmployee(res,"delete");
});

//-----------------------------------delete Employee Post Method-----------------------------------
router.post('/deleteEmployeeDetails', function(req, res){
	const deleteBy=req.body.selOption;
	const key=req.body.searchKey;

	deleteEmployee(deleteBy,key);
	return res.render('deleteEmployee.ejs',{alertType:"successs"});
});
//-----------------------------------Delete Employee From Database-----------------------------------
function deleteEmployee(deleteBy,key){
	var sql="delete from EmployeeDetails where "+deleteBy+"='"+key+"'";
	return con.query(sql,function(err, result){
		if(err) throw err;
		return;
	});
}


//-----------------------------------Update Employee Get Method-----------------------------------
router.get('/updateEmployee', function (req, res, next) {
	session=req.session;
	if(session.uniqueId){
		return res.render('updateEmployee.ejs',{userData: "",det: "get", id:"",alertType:""});
	}
	else
		res.render('index.ejs', {alertType:"unauthorised"});
});
//-----------------------------------Update Employee From Index Page-----------------------------------
router.get('/updateWithEmployeeId', function (req, res, next,) {
	var x = req.query.id;
	selectSingleEmployee(x,res);
});
//-----------------------------------Update Employee Post Method-----------------------------------
router.post('/updateEmployeeDetails', function(req, res) {
	const employeeId=req.body.id;
	const employeeName=req.body.name;
	const employeeMobileNumber=req.body.mobileNumber;
	const employeeEmailId=req.body.emailId;
	const employeeQualification=req.body.qualification;
	const employeeSalary=req.body.salary;
	const employeeDepartment=req.body.department;
	updateEmployee(employeeId,employeeName,employeeMobileNumber,employeeEmailId,employeeQualification,employeeSalary,employeeDepartment);
	return res.render('updateEmployee.ejs',{userData: "",det: "get", id:"",alertType:"success"});
});
//-----------------------------------Update Employee-----------------------------------
function updateEmployee(id,name,mobileNumer,emailId,qualification,salary,department){
	var sql = "UPDATE EmployeeDetails SET Name='"+name+"',  MobileNumber="+mobileNumer+", EmailId='"+emailId+"', Qualification='"+qualification+"', Salary="+salary+",Department='"+department+"' where Id="+id;
	return con.query(sql, function (err, result) {
	if (err) throw err;
		return;
	});
}

router.post('/updateEmployee', function (req, res, next) {
		var employeeId=req.body.id;
		selectSingleEmployee(employeeId,res);
});

function selectSingleEmployee(key,res){
	var qur="select * from EmployeeDetails where Id='"+key+"'";
	return con.query(qur, function (err, data, fields) {
		if (err) throw err;
		res.render('updateEmployee', { userData: data,det: "post", id: key,alertType:""});

		});
}

router.get('/forgetPassword', function (req, res, next) {
	return res.render('forgetPassword.ejs', { alertType:""});
});

router.post('/forgetPassword', function (req, res, next) {
	var unm=req.body.usernm;
	var email=req.body.emailId;
	var pass=req.body.password;
	changeAdminPassword(unm,email,res,pass);

});

function changeAdminPassword(unm,email,res,pass){
	var qur="select * from adminDetails where UserName='"+unm+"' and EmailId='"+email+"'";
	return con.query(qur, function (err, data, fields) {
		if (err) throw err;
		if(data[0]==undefined)
			res.render('forgetPassword', { alertType:"error"});
		else
			updateAdminDetails(data[0].Id,pass,res);
		});
}

function updateAdminDetails(key,pass,res){
	var qur="update adminDetails set Password='"+pass+"' where Id='"+key+"'";
	con.query(qur, function (err, result) {
		if (err) throw err;
			res.render('forgetPassword', { alertType:"success"});
		});
}
module.exports = router;