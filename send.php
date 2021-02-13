<?php

    $to = 'm@x-on.ru';
    $subject = 'Заявка - Startmeup';

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $message = '<html><body>';
    if (isset($_POST['name']) && $_POST['name'] != '') {
        $message .= '<p><strong>Имя</strong>: ' . $_POST['name'] . '</p>';
    }
    if (isset($_POST['phone']) && $_POST['phone'] != '') {
        $message .= '<p><strong>Телефон</strong>: ' . $_POST['phone'] . '</p>';
    }
    if (isset($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $message .= '<p><strong>Email</strong>: ' . $_POST['email'] . '</p>';
    }
    if (isset($_POST['question']) && $_POST['question'] != '') {
        $message .= '<p><strong>Вопрос</strong>: ' . $_POST['question'] . '</p>';
    }
    if (isset($_POST['facebook']) && $_POST['facebook'] != '') {
        $message .= '<p><strong>Facebook</strong>: ' . $_POST['facebook'] . '</p>';
    }
    if (isset($_POST['action']) && $_POST['action'] != '') {
        $message .= '<p><strong>Действие</strong>: ' . $_POST['action'] . '</p>';
    }
    $message .= '</body></html>';
    
    $sended = false;
    if ($message != '<html><body></body></html>') {
        $sended = mail($to, $subject, $message, $headers);
    }

    if ($sended) {
        echo 'success';
    }
    else echo 'error';

?>