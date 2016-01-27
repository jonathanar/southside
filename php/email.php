<?php

if(isset($_POST['emailphp'])){

	if(!isset($_POST['nombrephp']) || !isset($_POST['asuntophp']) || !isset($_POST['mensajephp'])) {
        died('Asegurese de haber llenado todos los campos.');
    }

    $name = json_decode($_POST['nombrephp']);
	$email = json_decode($_POST['emailphp']);
	$asunto = json_decode($_POST['asuntophp']);
	$mensaje = json_decode($_POST['mensajephp']);

	$email_to = "jona.ayala@gmail.com";

	$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

	if(!preg_match($email_exp,$email)) {
		died('La dirección de correo proporcionada no es válida.');
	}



	$headers = 'From: '.$email."\r\n".'Reply-To: '.$email."\r\n".'X-Mailer: PHP/'.phpversion();

	@mail($email_to, $asunto, $mensaje, $headers);

	echo "Su mensaje fue recibido con exito. Nos pondremos en contacto con usted a la brevedad posible";

}

function died($error){
	echo "Lo sentimos, hubo un error en sus datos y el formulario no puede ser enviado en este momento. ";
	echo "Detalle de los errores.".PHP_EOL.PHP_EOL;
	echo $error.PHP_EOL.PHP_EOL;
	echo "Porfavor corrija estos errores e inténtelo de nuevo.".PHP_EOL.PHP_EOL;
	die();
}

?>