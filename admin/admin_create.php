<?php

require_once '../load.php';
confirm_logged_in();
function create_password($pw_length = 8)
{
	$pass = '';
	for ($i = 0; $i < $pw_length; $i++) {
		$pass .= chr(mt_rand(33, 126));
	}
	return $pass;
}

if(isset($_POST['submit'])){

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $email = trim($_POST['email']);

    if(empty($email) || empty($password) || empty($username) ){
        $message = 'Please fill the required fields';
    }else{
        $message = createUser($username, $password, $email);
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h2>Create User</h2>
    <?php echo !empty($message)? $message: ''; ?>
    <form action="admin_create.php" method="post">
    <form>
        <label>Username</label>
        <input type="text" name="username" value=""><br><br>
        <label>Password</label>
        <input type="text" name="password" value=""><br><br>
        <label>Email</label>
        <input type="text" name="email" value=""><br><br>
        <button name="submit">Create User</button>
</body>
</html>