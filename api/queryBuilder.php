<?php

class queryBuilder {
	function __construct() {
		$this->queryBody = file_get_contents('php://input');
		$requestHeaders = apache_request_headers();

		// if (!$this->queryBody) {
		// 	throw new ErrorException('Отсутствуют параметры тела');
		// 	exit();
		// 	$this->success(array('message' => 'ok'));
		// }


		$this->AUTHORIZATION_HEADER = $_GET['Authorization'] ?? '';
		$this->REDIRECT_URL = $_GET['redirect-url'] ?? '';
		$this->METHOD = $_SERVER['REQUEST_METHOD'];

		// print_r($this);
		// exit();
		$res = $this->redirect($this->REDIRECT_URL);
		$this->success($res);
	}

	function redirect($redirectUrl) {

		if (!$redirectUrl) {
			$errObj = new stdClass();//create a new
			$errObj->error = "Відсутній URL";

			$this->success($errObj);
			exit();
		}

		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => $redirectUrl,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 1,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => $this->METHOD,
			CURLOPT_POSTFIELDS => $this->queryBody,
			CURLOPT_HTTPHEADER => array(
				'Authorization: '.$this->AUTHORIZATION_HEADER,
				'Content-Type: application/json'
			),
		));


		$response = curl_exec($curl);
		curl_close($curl);

		return $response;
	}


	function success($data) {
		print_r($data);
		exit();
	}
}




































////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////