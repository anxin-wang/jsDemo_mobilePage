<?php
class HB_Controller extends CI_Controller {
	public function __construct() {
		parent::__construct();
		$_POST = $_REQUEST;
		$this->load->library('jssdk', array('appid'=>APPID, 'appsecret'=>APPSECRET));
		
		//for test
		$debug = $this->input->post('debug') ? : 0;
		if ($debug) {
			$this->session->set_userdata ( array (
					'openid' => 'oaOnNjop0c4bl5yegQZJrg0THBqw',
					'nickname' => '测试账号',
					'headimgurl' => 'http://wx.qlogo.cn/mmopen/SCug0ESSOHibldJAHBpD7icu3rmytb2ZREWQW0GeHEFjG68Mk9R5ibdQ4rQVHeS6QWHab2nLZzIcBNRcOnfpLzsM341DgpBe3KR/0',
					
			) );
		}
		$fopenid = $this->input->post('fopenid') ? : 0;
		$fopenid && $this->input->set_cookie('fopenid', $fopenid, 1800);
		
		$cmp_score = $this->input->post('cmp_score') ? : 0;
		$cmp_score && $this->input->set_cookie('cmp_score', $cmp_score, 1800);

		if (($openid = $this->session->userdata ( 'openid' )) == false) {
			$code = $this->input->post('code') ? : null;
			if (! $code) { // wx 验证
				header ( "location:" . $this->get_authorize_url ( $this->config->item ( 'base_url' ) ) );
				exit ();
			}
			// 获取wx信息
			$get_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . APPID . '&secret=' . APPSECRET . '&code=' . $code . '&grant_type=authorization_code';
			$token_openid = api ( $get_token_url );
			$openid = $token_openid['openid'];
			$user_info = $this->wx_get_user_info ( $token_openid['access_token'], $openid );
			$user_info = array_merge ( $token_openid, $user_info );
			$this->session->set_userdata ( $user_info );
		} else {
			$user_info = $this->session->all_userdata();
		}
		$this->input->set_cookie ( 'nickname', $this->session->userdata ( 'nickname' ), 1800 );
		$this->load->model ( 'account_model' );
		$account = $this->account_model->getInfoByOpenid ( $openid );
		if ($account == null)
			$this->account_model->save ( $user_info );
		else 
			$this->input->set_cookie ( 'if_register', $account->if_register, 1800 );
		
		$this->load->model('challenge_model', 'challenge');
		$max = $this->challenge->getMaxScoreByOpenid($openid); 
		$this->input->set_cookie ( 'max_score', $max, 1800 );
	}
	
	/**
	 * 
	 * format output
	 * 
	 * @param string $msg
	 * @param array $data
	 * @param int $code
	 */
	public function format($msg = '', $data = null, $code = 0) {
		$ret = array (
				'code' => $code,
				'data' => $data,
				'msg' => $msg 
		);
		echo json_encode ( $ret );
		exit ();
	}
	
	function get_authorize_url($redirect_uri = '', $state = '')
	{
		$redirect_uri = urlencode($redirect_uri);
		return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".APPID."&redirect_uri=".$redirect_uri."&response_type=code&scope=snsapi_userinfo&state=".$state."#wechat_redirect";
	}
	
	function wx_get_user_info($access_token, $openid) {
		$get_user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $access_token . '&openid=' . $openid . '&lang=zh_CN';
		return api ( $get_user_info_url );
	}
	
	function valid_phone_number_or_empty($value) {
		if (preg_match ( '/^1[3458][0-9]{9}$/', $value ))
			return true;
		else {
			$this->form_validation->set_message ( 'valid_phone_number_or_empty', '请输入正确手机号码' );
			return false;
		}
	}
}
