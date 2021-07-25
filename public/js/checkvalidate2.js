//check password
function checkPass(fn){
	var pass1=fn.password.value;
	var pass2=fn.password1.value;
	var view=document.getElementById("viewValidPass");
	var isOK = false;
	if(pass1 ==""){
		view.innerHTML = "Hãy nhập mật khẩu cho tài khoản";
	}else{
		if(pass1.length<6){
			view.innerHTML="Độ dài mật khẩu cần lớn hơn 5 ký tự!";
			
		}else{
			if(pass1.trim()!=pass2.trim()){
				var message="Mật khẩu không khớp nhau xin kiểm tra lại";
				view.innerHTML=message;
				
			}else{
				view.innerHTML="<i class=\"fa fa-check\"></i>";
				//view.style.color= document.getElementByTagName("body").style.color;
				
				isOK= true;
			}
		}
	}
	if(isOK){
		view.style.color="green";
	}else{
		view.style.color="red";
	}
	return isOK;
	
}