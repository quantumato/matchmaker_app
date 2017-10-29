function ajaxReqSend(url, callback) {
	var ajaxreq = null;
	if( window.XMLHttpRequest ) {
		ajaxreq = new XMLHttpRequest();
	}
	else if( window.ActiveXObject ) {
		ajaxreq = new ActiveXObject( "Msxml2.XMLHTTP" );
		if( ajaxreq == null ) {
			ajaxreq = new ActiveXObject( "Microsoft.XMLHTTP" );
		}
	}
        if (ajaxreq == null){
		alert("Your browser does not support AJAX!");
	}
	
	ajaxreq.open("GET", url);
	ajaxreq.send(null);
	function responseHandler() {
		if (ajaxreq.readyState != 4) return;
		if (ajaxreq.status == 200) 
			ajaxreq.callback();
		else 
			alert("Ajax error code " + ajaxreq.status + ": " +
				ajaxreq.statusText);
	}
	ajaxreq.onreadystatechange = responseHandler;
	ajaxreq.callback = callback;
}

function userPicture(response){
	console.log('Successful login for: ' + response.name);
	document.getElementById('userPhoto').src = response.data.url;
}
function displayFriend(res1, index, name){	//picture?width=200
	console.log(res1.data.url);
	console.log(resultText);
	document.getElementById('friend'+index).innerHTML += 
		'<img class="ui centered image" src="' + res1.data.url +'"/>'/*<div class="ui bottom attached" style="text-align:center">' */+ name/* + '</div>'*/;
}
function updateColor(box) {
	//box.parentNode.style.backgroundColor = (0,9,17);
	console.log(box.parentNode.style);
	validateForm();
}
function userLogin(response) {	//id, email, first_name, last_name, name, friends
	var form = document.getElementById('theForm');
	if (form.attachEvent) {
		form.attachEvent("submit", submitForm);
	} else {
		form.addEventListener("submit", submitForm);
	}
	console.log('Successful login for: ' + response.name);
	resultText =   'Thanks for logging in, ' + response.name + '!';
	document.getElementById('userName').innerHTML = response.name; 
        document.getElementById('facebookLogin').style = "display: none;";
        document.getElementById('userInfo').style = "";
        document.getElementById('status').innerHTML = "";
        document.getElementById('userID').value = response.id;
	getPendingCount(response.id);
	targetCount = response.friends.data.length;
	response.friends.data.forEach(function(item, index){
		document.getElementById('friends').innerHTML +=
			'<div class="column items" id="friend"><label class="ui button"><input style="display: none;" type="checkbox" onChange="updateColor(this)" name="friend" value="'+item.id+'"/><span id="friend'+index+'"></span></label></div>';
		console.log(item);
		FB.api('/'+item.id+'/picture?width=200', function(r){displayFriend(r, index, item.name)});
		FB.api('/me/picture?width=2000', userPicture);
	});
        document.getElementById('theForm').style = "";
}
function getSelectedCounts(){
	var boxes = document.getElementsByName('friend');
	var count = 0;
	boxes.forEach(function(item){
		if(item.checked){
			count += 1;
		}
	});
	console.log('Found '+count+' checked.');
	return count;
}
function validateForm(){
	if(getSelectedCounts() != 2){
		document.getElementById('formError').style = '';
		
		/*var boxes = document.getElementsByName('friend');
		boxes.forEach(function(item){
			item.setCustomValidity('You can only match two people');
		});*/
		return false;
	}
	document.getElementById('formError').style = "display: none;";
	return true;
}
function hideSuccess() {
	document.getElementById('success').style= "display: none;";
}
function showSuccess() {
	document.getElementById('success').style= '';
	setTimeout(hideSuccess, 2000);
}
function submitForm(e){
	if (e.preventDefault) e.preventDefault();
	var ajaxreq = null;
	if( window.XMLHttpRequest ) {
		ajaxreq = new XMLHttpRequest();
	}
	else if( window.ActiveXObject ) {
		ajaxreq = new ActiveXObject( "Msxml2.XMLHTTP" );
		if( ajaxreq == null ) {
			ajaxreq = new ActiveXObject( "Microsoft.XMLHTTP" );
		}
	}
        if (ajaxreq == null){
		alert("Your browser does not support AJAX!");
	}
	var boxes = document.getElementsByName('friend');
	var count = 0;
	var friendIDs = [];
	boxes.forEach(function(item){
		if(item.checked){
			friendIDs.push(item);
		}
	});
	
	ajaxreq.open("GET", "submit.php?friend1="+friendIDs[0].value+"&friend2="+friendIDs[1].value+"&comments="+document.forms[0].comments.value+"&userID="+document.getElementById('userID').value);
	ajaxreq.send(null);
	function responseHandler() {
		if (ajaxreq.readyState != 4) return;
		if (ajaxreq.status == 200) 
			ajaxreq.callback();
		else 
			alert("Ajax error code " + ajaxreq.status + ": " +
				ajaxreq.statusText);
	}
	ajaxreq.onreadystatechange = responseHandler;
	ajaxreq.callback = showSuccess;
	friendIDs.forEach(function(item){
		item.checked = false;
	});
	document.forms[0].comments.value = '';
	
}

function updatePendCount(){
	document.getElementById('pendCount').innerHTML = this.responseText;
}

function getPendingCount(user){
	ajaxReqSend("count.php?user="+user, updatePendCount);
}




