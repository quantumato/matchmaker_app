<?php
//print_r($_GET);
$command = "python3 success.py";
$descriptorspec = array(
	0 => array("pipe", "r"),
	1 => array("pipe", "w"),
	2 => array("file", "/tmp/get_success_error.log", "a")
);

$pid = proc_open( $command, $descriptorspec, $pipes);
if(is_resource($pid)){
	fwrite($pipes[0], $_GET['user']);
	fclose($pipes[0]);
	
	//$input = explode('\n', stream_get_contents($pipes[1]));
	echo stream_get_contents($pipes[1]);
	fclose($pipes[1]);
	
	$return_value = proc_close($pid);
}
?>
