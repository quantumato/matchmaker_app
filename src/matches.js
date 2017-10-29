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



function updatePendCount(){
	console.log('updating counts');
	document.getElementById('pendCount').innerHTML = this.responseText;
}

function getPendingCount(user){
	console.log(user);
	ajaxReqSend("count.php?user="+user, updatePendCount);
}
function setUserName(res, tIndex, tPos, field){
	console.log(tIndex);
	console.log(tPos);
	console.log(res);
	console.log(document.getElementById(field+tIndex).childNodes[tPos]);
	document.getElementById(field+tIndex).childNodes[tPos].childNodes[1].innerHTML = res.name;
}
function setUserPic(res, tIndex, tPos, field){
	console.log(res);
	document.getElementById(field+tIndex).childNodes[tPos].childNodes[0].src = res.data.url;
	document.getElementById(field+tIndex).childNodes[tPos].childNodes[0].width = '150';
}

function getUser(user, tIndex, tPos, field){
	FB.api('/'+user+'?fields=name', function(res){setUserName(res, tIndex, tPos, field);});
	FB.api('/'+user+'/picture?width=2000', function(res){setUserPic(res, tIndex, tPos, field);});
}
function clearPend(index) {
	document.getElementById('pending'+index).style = "display: none;";
	getPendingCount(document.getElementById('userID').value);
}
function pendReject(index) {
	console.log(document.getElementById('pending'+index).childNodes);
	ajaxReqSend("clearpend.php?object="+document.getElementById('pending'+index).childNodes[5].value+'&user='+document.getElementById('userID').value+'&mode=rejected', function(){clearPend(index);});
}
function pendAccept(index) {
	ajaxReqSend("clearpend.php?object="+document.getElementById('pending'+index).childNodes[5].value+'&user='+document.getElementById('userID').value+'&mode=accepted', function(){clearPend(index);});
}


function showPending(){
          //Your match, Matchmaker, Matchmaker Comment, accept, reject
	var table = document.getElementById('pend_match_body');
	var data = this.responseText.split(/\r\n|\r|\n/);
	console.log(data);
	var count = Math.floor(data.length / 4);
	for(index = 0; index < count ;index++ ){
		table.innerHTML += '<tr id="pending'+index+'"><td><img></img><span></span></td><td><img width="50" src=""></img><span></span></td><td>'+data[index*4+3]+'</td><td><button type="button" onClick="pendAccept('+index+')" class="positive ui button">Accept</button></td><td><button type="button" onClick="pendReject('+index+')" class="negative ui button">Reject</button></td><input type="hidden" value="'+data[index*4+2]+'"/></tr>';
		getUser(data[index*4], index, 0,  'pending');
		getUser(data[index*4+1], index, 1, 'pending');
	}
	
}
function getPendingMessages(user){
	ajaxReqSend("pending.php?user="+user, showPending);
}

function userLogin(response) {	//id, email, first_name, last_name, name, friends
	console.log('Successful login for: ' + response.name);
	resultText =   'Thanks for logging in, ' + response.name + '!';
	document.getElementById('userName').innerHTML = response.name; 
        document.getElementById('facebookLogin').style = "display: none;";
        document.getElementById('userInfo').style = "";
        document.getElementById('status').innerHTML = "";
        document.getElementById('userID').value = response.id;
	getPendingMessages(response.id);
	getSuccessMessages(response.id);
	getPendingCount(response.id);
}
function userPicture(response){
	console.log('Successful login for: ' + response.name);
	document.getElementById('userPhoto').src = response.data.url;
}


function showMatches(){
          //Your match, Matchmaker, Matchmaker Comment, link
	var table = document.getElementById('good_match_body');
	var data = this.responseText.split(/\r\n|\r|\n/);
	console.log(data);
	var count = Math.floor(data.length / 4);
	for(index = 0; index < count ;index++ ){
		table.innerHTML += '<tr id="success'+index+'"><td><img></img><span></span></td><td><img width="50" src=""></img><span></span></td><td>'+data[index*4+3]+'</td><td></td></tr>';
		getUser(data[index*4], index, 0, 'success');
		getUser(data[index*4+1], index, 1, 'success');
		getLink(data[index*4], index);
	}
	
}
function getSuccessMessages(user){
	ajaxReqSend("success.php?user="+user, showMatches);
}
function getLink(user, tIndex){
	FB.api('/'+user+'?fields=link, name', function(res){setLink(res, tIndex);});
}
function setLink(res, tIndex){
	console.log(tIndex);
	console.log(res);
	console.log(document.getElementById('success'+tIndex).childNodes[3]);
	document.getElementById('success'+tIndex).childNodes[3].innerHTML = '<a href="'+res.link+'">'+res.name+'</a>';
}
