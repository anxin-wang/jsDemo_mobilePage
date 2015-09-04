<?php
if (! defined ( 'BASEPATH' ))
	exit ( 'No direct script access allowed' );
class Account extends HB_Controller {
	public function __construct() {
		parent::__construct ();
		$this->load->model ( 'account_model', 'account' );
		$this->load->model ( 'challenge_model', 'challenge' );
	}
	public function index() {
		$this->load->view ( 'welcome_message' );
	}
	
	/**
	 * 登录
	 */
	public function login() {
		$this->load->helper ( array (
				'form',
				'url' 
		) );
		$this->load->library ( 'form_validation' );
		$this->form_validation->set_error_delimiters ( '', '' );
		$this->form_validation->set_rules ( 'telephone', '手机号码', 'required|callback_valid_phone_number_or_empty' );
		$this->form_validation->set_rules ( 'password', '密码', 'required' );
		
		if ($this->form_validation->run () == FALSE) {
			$this->format ( array (
					form_error ( 'telephone' ),
					form_error ( 'password' ) 
			), null, 1 );
		} else {
			$openid = $this->session->userdata ( 'openid' );
			$user = $this->account->getInfoByOpenid ( $openid );
			
			$telephone = $this->input->post ( 'telephone' );
			$password = $this->input->post ( 'password' );
			$jsessionid = $this->session->userdata ( 'jsessionid' );
			$post = array (
					'mobilePhone' => $telephone,
					'password' => $password,
					'jsessionid' => $jsessionid 
			);
			$ret = login_api ( $this->config->item ( 'login_api' ), $post ); // 登录网页版
			if ($ret ['returnCode'] == '000') {
				if ($user->telephone == null) {
					$if_exist = $this->account->getInfoByTelephone($telephone);
					if (!$if_exist) {
						$data = array('telephone'=>$telephone,'hers_bit_uid'=>null);
						$this->account->register($openid, $data);
					} else {
						$this->format ( '手机号已经被绑定', null, 1 );
					}
				} else if ($user->telephone != $telephone) {
					$this->format ( '登录失败，手机号码错误', null, 1 );
				}
				$this->session->set_userdata ( 'accesstoken', $ret ['returnMsg'] );
				$this->input->set_cookie ( 'openid', $openid, 259200 );
				$this->input->set_cookie ( 'nickname', $this->session->userdata ( 'nickname' ), 259200 );
				$this->format ( '登录成功' );
			} else
					log_message ( 'error', "code:{$ret['returnCode']} msg:{$ret['returnMsg']}", 1 );
				$this->format ( '登录失败，请重试', null, 1 );
			
		}
	}
	
	/**
	 * 注册
	 */
	public function register() {
		$this->load->helper ( array (
				'form',
				'url' 
		) );
		$this->load->library ( 'form_validation' );
		$this->form_validation->set_error_delimiters ( '', '' );
		$this->form_validation->set_rules ( 'telephone', '手机号码', 'required|callback_valid_phone_number_or_empty' );
		$this->form_validation->set_rules ( 'password', '密码', 'required' );
		$this->form_validation->set_rules ( 'checkcode', '验证码', 'required' );
		
		if ($this->form_validation->run () == FALSE) {
			$this->format ( array (
					form_error ( 'telephone' ),
					form_error ( 'password' ),
					form_error ( 'checkcode' ) 
			), null, 1 );
		} else {
			$telephone = $this->input->post ( 'telephone' );
			$password = $this->input->post ( 'password' );
			$checkCode = $this->input->post ( 'checkcode' );
			$jsessionid = $this->session->userdata ( 'jsessionid' );
			$post = array (
					'mobilePhone' => $telephone,
					'password' => $password,
					'checkCode' => $checkCode,
					'jsessionid' => $jsessionid 
			);
			$ret = register_api ( $this->config->item ( 'register_api' ), $post ); // 注册网页版
			if ($ret ['returnCode'] == '000') {
				$openid = $this->session->userdata ( 'openid' );
				$post = array (
						'telephone' => $telephone,
						'hers_bit_uid' => $ret ['returnMsg'] 
				);
				$this->account->register ( $openid, $post );
				$this->format ( '注册成功', null, 0 );
			} else {
				log_message ( 'error', "code:{$ret['returnCode']} msg:{$ret['returnMsg']}", 1 );
				$this->format ( $ret['returnMsg'] ? : "注册失败，请重试", null, 1 );
			}
		}
	}
	
	/**
	 * 我的合氏币
	 */
	public function myhersbit() {
		$challengeList = null;
		$openid = $this->session->userdata ( 'openid' );
		$challengeList = $this->challenge->getAllByOpenid ( $openid );
		$user = $this->account->getInfoByOpenid ( $openid );
		foreach ( $challengeList as $k => &$cl ) {
			$cl->timestamp = $cl->create_time;
			$cl->create_time = date ( 'Y-m-d', $cl->create_time );
			if ($cl->type == 'share') {
				$cl->msg = '分享获得';
			} else if ($cl->type == 'fight') {
			    if ($cl->fopenid != null)
				$cl->msg = '挑战' . (intval ( $cl->result ) > 0 ? '成功' : '失败');
			    else
				$cl->msg = '游戏' . (intval ( $cl->result ) > 0 ? '获得' : '损失');
			} else if ($cl->type == 'give') {
				unset ( $challengeList [$k] );
				continue;
			}
		}
		
		$givenList = $this->challenge->getGivenByOpenid ( $openid );
		foreach ( $givenList as &$gl ) {
			$gl->timestamp = $gl->create_time;
			$gl->create_time = date ( 'Y-m-d', $gl->create_time );
			$gl->msg = '好友赠送';
		}
		
		$givenedList = $this->challenge->getGivenedByOpenid ( $openid );
		foreach ( $givenedList as &$gdl ) {
			$gdl->timestamp = $gdl->create_time;
			$gdl->create_time = date ( 'Y-m-d', $gdl->create_time );
			$gdl->msg = '赠送好友';
			$gdl->result = -1 * $gdl->result;
		}
		
		$result = array_merge(array_merge($challengeList , $givenList) , $givenedList);
		$this->format ( 'success', array (
				'challengelist' => bubble_sort($result, 'timestamp'),
				'total' => $user->hers_bit 
		), 0 );
	}
	
	/**
	 * 挑战记录
	 */
	public function challengelog() {
		$challengeList = null;
		$openid = $this->session->userdata ( 'openid' ) ;
		$challengeList = $this->challenge->getChallengeLogByOpenid ( $openid );
		foreach ( $challengeList as $k => &$cl ) {
			if ($cl->fopenid == null) {
				unset ( $challengeList [$k] );
				continue;
			}
			$cl->desc = intval ( $cl->result ) < 0 ? '挑战失败' : '挑战成功';
		}
		
		$challengedList = $this->challenge->getChallengeLogByFopenid ( $openid );
		foreach ( $challengedList as $k => &$cdl ) {
			$account = $this->account->getInfoByOpenid($cdl->openid);
			$cdl->fnickname = $account->nickname;
			$cdl->fopenid = $account->openid;
			$cdl->desc = intval ( $cdl->result ) < 0 ? '给你跪了' : '超越了你';
			$cdl->challenged = 1;
		}
		
		$challengeList = bubble_sort( array_merge($challengedList, $challengeList), 'create_time' );
		$this->format ( 'success', $challengeList, 0 );
	}
	
	/**
	 * 赠送合氏币
	 */
	public function give() {
		$giveHersbit = $this->input->post ( 'score' );
		$fopenid = $this->input->post ( 'fopenid' );
		log_message ( 'error', json_encode ( $_POST ), 1 );
		if ($giveHersbit > 0) {
			$openid = $this->session->userdata ( 'openid' );
			$user = $this->account->getInfoByOpenid ( $openid );
			$friend = $this->account->getInfoByOpenid ( $fopenid, 1 );
			if ($user->hers_bit >= $giveHersbit && $friend) {
				$post = array (
						'accessToken' => $this->session->userdata ( 'accesstoken' ),
						'score' => $giveHersbit,
						'flag' => 0 
				);
				$ret = hersbit_api ( $this->config->item ( 'hersbit_api' ), $post ); // 提交到helloan
				if ($ret ['returnCode'] == '000') {
					$this->challenge->save ( $openid, $friend, $giveHersbit, 'give' );
				} else {
					log_message ( 'error', "code:{$ret['returnCode']} msg:{$ret['returnMsg']} api:" . $this->config->item ( 'hersbit_api' ), 1 );
					$this->challenge->save ( $openid, $friend, $giveHersbit, 'give', 0 );
				}
				$this->account->addScore ( $openid, - 1 * $giveHersbit );
				$this->account->addScore ( $fopenid, $giveHersbit );
				delete_cookie ( 'fopenid' );
				$this->format ( '赠送成功' );
			} else {
				$this->format ( '赠送失败，合氏币不足或朋友不存在', null, 1 );
			}
		}
		$this->format ( '赠送失败', null, 1 );
	}
	
	/**
	 * 被挑战者信息
	 */
	public function challengeInfo() {
		$fopenid = $this->input->post ( 'fopenid' );
		log_message ( 'error', 'fopenid:' . $fopenid, 1 );
		$user = $this->account->getInfoByOpenid ( $fopenid );
		if ($user) {
			$this->format ( '', $user );
		} else {
			$this->format ( '好友不存在', null, 1 );
		}
	}
	
	/**
	 * 分享获得
	 */
	public function shareHelloan() {
		$openid = $this->session->userdata ( 'openid' );
		$score = 300;
		$post = array (
				'accessToken' => $this->session->userdata ( 'accesstoken' ),
				'score' => $score,
				'flag' => 1 
		);
		$ret = hersbit_api ( $this->config->item ( 'hersbit_api' ), $post ); // 提交到helloan
		$this->account->addScore ( $openid, $score );
		if ($ret ['returnCode'] == '000') {
			$this->challenge->save ( $openid, null, $score, 'share' );
		} else {
			log_message ( 'error', "code:{$ret['returnCode']} msg:{$ret['returnMsg']}", 1 );
			$this->challenge->save ( $openid, null, $score, 'share', 0 );
		}
		$this->format ( '恭喜，分享获得' . $score . '合氏币' );
	}
}
