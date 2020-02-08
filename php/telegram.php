<?php

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$token = "936701731:AAH7NIc_6HJcgAaH2GGafWeECjdzJpzfF8k";
$chat_id = "936701731";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$936701731:AAH7NIc_6HJcgAaH2GGafWeECjdzJpzfF8k}/sendMessage?chat_id={$936701731}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>