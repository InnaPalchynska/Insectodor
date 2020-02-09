<?php

$senData = file_get_contents('php://input');
$senData = json_decode($senData, true);
// $name = $_POST['user_name'];
// $phone = $_POST['user_phone'];
// $email = $_POST['user_email'];
// $cart = $_POST["cart"];
$token = "936701731:AAH7NIc_6HJcgAaH2GGafWeECjdzJpzfF8k";
$chat_id = "-276912083";



$arr = array(
  // 'Имя пользователя: ' => $name,
  // 'Телефон: ' => $phone,
  // 'Email' => $email
  // 'Заказ: ' => $cart

  'Телефон: ' => $senData['user_phone'],
  'Заказ: ' => $senData['name']
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>