<?php

  $token = "6145020090:AAHeVyb7F5XZ1vxh8kS1n4XY4FfnKZuXabo";
  $chat_id = "-988966508";


// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Тема письма";
$file = $_FILES['file'];

$c = true;
// Формирование самого письма
$title = "Заявка с Vs-dental.";
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$more = $_POST['user_message'];
$category = $_POST['user_category'];
$token = "6145020090:AAHeVyb7F5XZ1vxh8kS1n4XY4FfnKZuXabo";
$chat_id = "-988966508";
$arr = array(
  'Имя пользователя:' => $name,
  'Телефон:' => $phone,
  'Пожелания:' => $more,
  'Категория:' => $category
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;

  // Настройки сервиса отправителя
  $mail->Host       = 'smtp.gmail.com';
  $mail->Username   = 'sitemailerapp@gmail.com';
  $mail->Password   = 'mvjhkduwzuujixje';
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;


  $mail->setFrom('sitemailerapp@gmail.com', 'vs-dental.com.ua');

  // Получатель письма

  $mail->addAddress('info@vs-dental.com.ua');
  // $mail->addAddress('soinproduction@gmail.com');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}



