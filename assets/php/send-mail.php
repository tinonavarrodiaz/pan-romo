<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
  // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
  // you want to allow, and if so:
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';


$name = $_POST["name"];

$email = $_POST["email"];

$phone = $_POST["phone"];

$message = $_POST["message"];

$subject = "Formulario eviado desde el sitio";

$addressee = "contacto@sigmapcs.com.mx";

$addressee_other = "contacto@sigmapcs.com.mx";


function send($name,$phone,$email,$message,$addressee,$addressee_other){

  $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
  try {
      //Server settings
      $mail->SMTPDebug = 2;                                 // Enable verbose debug output
      $mail->isSMTP();                                      // Set mailer to use SMTP
      $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
      $mail->SMTPAuth = true;                               // Enable SMTP authentication
      $mail->Username = 'sigmapcs.mail@gmail.com';                 // SMTP username
      $mail->Password = 'Tino1018*';                           // SMTP password
      $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
      $mail->Port = 587;                                    // TCP port to connect to

      //Recipients
      $mail->setFrom($mail, $name);
      $mail->addAddress($addressee);     // Add a recipient
      $mail->addAddress($addressee_other);               // Name is optional
      // $mail->addReplyTo('info@example.com', 'Information');
      // $mail->addCC('cc@example.com');
      // $mail->addBCC('bcc@example.com');

      //Attachments
      // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
      // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

      //Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = 'Correo enviado desde el formulario de contacto';
      $mail->Body    =  "
      <html>
      
      <body>
      
      <h1>Recibiste un nuevo mensaje desde el formulario de contacto</h1>
      
      <p>Informacion enviada por el usuario de la web:</p>
      
      <p>Nombre: {$name}</p>
      
      <p>E-mail: {$email}</p>
      
      <p>Teléfono: {$phone}</p>
      
      <p>Mensaje: {$message}</p>
      
      </body>
      
      </html>";
      $mail->AltBody = $message;

      $mail->send();
      // echo 'Message has been sent';
      result('Formulario enviado con éxito, en breve nos pondrémos en contacto con usted',true,null);
  } catch (Exception $e) {
      result('Error al enviar el formulario, por favor vuelva a intentarlo',false,$mail->ErrorInfo);
  }

}

function result($msg,$status,$error){
  $res = array(
    msg => $msg,
    status => $status,
    error => $error
  );
  echo json_encode($res, JSON_FORCE_OBJECT);
}

function veryfy($name,$phone,$email,$message,$addressee,$addressee_other){
  if ( !isset($name) || $neme =='' || !isset($email) || $mail =='' || !isset($phone) || $phone == '' || !isset($message) || $message == '' ) {
    result("Ocurrio un error al intentar enviar el mensaje",false,"Es necesario completar todos los datos del formulario");
  }else {
    send($name,$phone,$email,$message,$addressee,$addressee_other);
  }
}


veryfy($name,$phone,$email,$message)
?>
