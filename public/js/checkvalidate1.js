/*Các xử lý kịch bản cho user.html*/
//Kiểm tra tên phụ huynh
function checkName(fn){
	var name = fn.tenphuhuynh.value;
	var message= "";
	var view= document.getElementById("viewValidName");
	if(name == ""){
		message = "Yêu cầu nhập tên để đăng ký thuê gia sư";
	}else{
		if(name.length<6||name.length>50){
			message="Tên cần  dài hơn 5 ký tự và nhỏ hơn 50 ký tự!";
		
		}else{
			var parttern=/^[0-9]$/;
			if(name.match(parttern)){
				validUserName=false;
				message="Tên không có chữ số!";
			}else{
				message="";
			}
		}
	}
	if(message!=""){
		view.style.color="red";
		view.innerHTML= message;
		return false;
	}else{
		view.innerHTML= "";
		return true;
	}
}
//Kiểm tra số điện thoại
function checkPhoneNumber(fn) {
    var flag = false;
	var view= document.getElementById("viewValidPhone");
    var phone = fn.sdt.value.trim(); // ID của trường Số điện thoại
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                flag = true;
            }
        } else if (firstNumber == '01' && phone.length == 11) {
            if (phone.match(/^\d{11}/)) {
                flag = true;
            }
        }
    }
    if(!flag){
		view.style.color="red";
		var message= "yêu cầu nhập đúng điện thoại";
		view.innerHTML= message;
		return false;
	}else{
		view.innerHTML= "";
		return true;
	}
}
//Kiểm tra Địa chỉ
function checkPlace(fn){
	var name = fn.diachi.value;
	var message= "";
	var view= document.getElementById("viewValidPlace");
	if(name == ""){
		message = "Yêu cầu nhập địa chỉ để đăng ký thuê gia sư!";
	}else{
		if(name.length<6||name.length>50){
			message="Yêu cầu nhập đầy đủ địa chỉ!";
		
		}else if(name.indexOf("@")!=-1){
			var parttern=/\w+[,]+\w+[,]\w/;
			if(!name.match(parttern)){
				validUserName=false;
				message="Không đúng cấu trúc !";
			}
		}
	}
	if(message!=""){
		view.style.color="red";
		view.innerHTML= message;
		return false;
	}else{
		view.innerHTML= "";
		return true;
	}
}
function checkEmail(fn){
	var name = fn.diachiemail.value;
	var message= "";
	var view= document.getElementById("viewValidEmail");
	if(name == ""){
		message = "Yêu cầu nhập email để đăng ký thuê gia sư!";
	}else{
		if(name.length<6||name.length>50){
			message="Yêu cầu nhập đầy đủ email!";
		
		}else if(name.indexOf("@")!=-1){
			var parttern=/\w+@+\w+[.]\w/;
			if(!name.match(parttern)){
				
				message="Không đúng cấu trúc !";
			}
		}
	}
	if(message!=""){
		view.style.color="red";
		view.innerHTML= message;
		return false;
	}else{
		view.innerHTML= "";
		return true;
	}
}