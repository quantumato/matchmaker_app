<?php
print_r($_GET);
$command = "python3 submit.py";
$pid = popen( $command, "w");
$tmp = (string)($_GET['friend1'])."\n".(string)($_GET['friend2'])."\n".(string)($_GET['userID'])."\n".(string)($_GET['comments'])."\n";
fwrite($pid, $tmp);
//error_log($_GET['friend'][0]+"\n"+$_GET['friend'][1]+"\n"+$_GET['userID']+"\n"+$_comment+"\n", 3, '/tmp/blacksite.php.log');
echo (string)($_GET['friend1']);
echo "<br/>";
echo (string)($_GET['friend2']);
echo "<br/>";
echo $tmp;
?>
