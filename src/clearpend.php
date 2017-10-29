<?php
$command = "python3 handle_match.py";
$pid = popen( $command, "w");
$tmp = (string)($_GET['object'])."\n".(string)($_GET['user'])."\n".(string)($_GET['mode'])."\n";
fwrite($pid, $tmp);
?>
