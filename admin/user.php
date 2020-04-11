<?php
function createUser($username, $password, $email){
    $pdo = Database::getInstance()->getConnection();
    
    $create_user_query = 'INSERT INTO tbl_user (user_name, password, email, count)';
    $create_user_query .= ' VALUES(:username, :password, :email, :count)';

    $create_user_set   = $pdo->prepare($create_user_query);
    $create_user_result = $create_user_set->execute(
        array(
            ':username'  => $username,
            ':password'  => $password,
            ':email'     => $email,
            ':count'     => "0",
    )
        );

    if($create_user_result){
        email($username, $password, $email);
        redirect_to('admin_login.php');
    }else{
        return 'The user did not go through';
    }
}

function getSingleUser($id){
    $pdo = Database::getInstance()->getConnection();  
    // TODO: execute the proper SQL query to fetch the user data 
    $find_user_data  = 'SELECT * FROM tbl_user WHERE id =:id';
    $query_user_data =  $pdo->prepare($find_user_data);
    $get_user_result = $query_user_data ->execute(
                        array(
                            ':id' =>$id,
                        )
                        );

    if($get_user_result){
        // TODO: if the execute is successful, return the user data
        // Otherwise, return an error messages
        return ($query_user_data);
        

    }else{
        return  "There have some problem";
    
}
}

function editUser($id,$username,$password,$email){
// TODO:Set the database connection
$pdo = Database::getInstance()->getConnection();  
// TODO:Run the proper SQL query to update tbl_user with proper values
$update_user_data   = 'UPDATE tbl_user SET  user_name=:username, password =:password, email = :email, count=count+1 WHERE id =:id';
$update_user_set    = $pdo->prepare($update_user_data);
$update_user_result = $update_user_set->execute(
            array(
            ':id'       =>  $id,
            ':username' =>  $username ,
            ':password' =>  $password,
            ':email'    =>  $email
            )
            );

            // echo $update_user_set ->debugDumpParams();
            // exit;
           

// TODO:if everything goes well, redirect user to index.php
// Otherwise, return some error message
            if($update_user_result){
                redirect_to('admin_login.php');
            }else{
                return ' wrong';
            }

}