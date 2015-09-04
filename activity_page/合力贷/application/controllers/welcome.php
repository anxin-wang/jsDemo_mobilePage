<?php

if (! defined ( 'BASEPATH' ))
	exit ( 'No direct script access allowed' );
class Welcome extends HB_Controller {
	
	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * http://example.com/index.php/welcome
	 * - or -
	 * http://example.com/index.php/welcome/index
	 * - or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * 
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index() {
		$fopenid = $this->input->post ( 'fopenid' );
		$cmp_score = $this->input->post ( 'cmp_score' );
		$redirect = $this->input->post ( 'redirect' ) ?  : 1;
		if ($fopenid && $redirect == 1) {
			$url = $this->config->item ( 'base_url' ) . "activity/challenge.html?fopenid={$fopenid}&cmp_score={$cmp_score}";
		} else
			$url = $this->config->item ( 'base_url' ) . "activity/";
		header ( "location:" . $url );
	}
	public function getSignPackage() {
		$url = $this->input->post ( 'url' );
		$signPackage = $this->jssdk->GetSignPackage ( urldecode($url) );
		$this->format ( 'singPackage', $signPackage );
	}
	
	public function test() {
		$this->load->model ( 'account_model', 'account' );
		$user = $this->account->getInfoByOpenid ( 'oaOnNjop0c4bl5yegQZJrg0THBqw' );
		print_r($user);
		$post = array (
				'mobilePhone' => '15829351349',
				'password' => '123456',
				'jsessionid' => ''
		);
		$ret = login_api ( $this->config->item ( 'login_api' ), $post ); // 登录网页版
		print_r($ret);exit;
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
