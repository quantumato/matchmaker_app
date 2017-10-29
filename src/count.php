<?php
//print_r($_GET);
$command = "python3 request.py";
$descriptorspec = array(
	0 => array("pipe", "r"),
	1 => array("pipe", "w"),
	2 => array("file", "/tmp/get_matches_error.log", "a")
);

$pid = proc_open( $command, $descriptorspec, $pipes);
if(is_resource($pid)){
	fwrite($pipes[0], $_GET['user']);
	fclose($pipes[0]);
	
	$tmp = stream_get_contents($pipes[1]);
	//echo $tmp;
	//echo '<br/>';
	//print_r(explode("\n", $tmp));
	//print_r(explode("\n", $tmp));
	//echo '<br/>';
	echo (count(explode("\n", $tmp))-1)/4;
	fclose($pipes[1]);
	
	$return_value = proc_close($pid);
}
?>
