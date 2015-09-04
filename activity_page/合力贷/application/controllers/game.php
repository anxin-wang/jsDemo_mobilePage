<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Game extends HB_Controller 
{
		
	public function __construct() {
		parent::__construct();
		$this->load->model('account_model', 'account');
		$this->load->model('challenge_model', 'challenge');
		$this->buckle = 100; //扣量
	}

	/**
	 * 随机生成得分
	 */
	public function play()
	{
		$min = 1;
		$max = 1000; //最大
		$buckle = $this->buckle; //扣量
		
		$openid = $this->session->userdata ( 'openid' );
		$user = $this->account->getInfoByOpenid ( $openid );
		if ($user->hers_bit < $buckle) {
			$this->format ( '合氏币不足，请充值或邀请好友获得', null, 1 );
		}
		
		if (($fopenid = $this->input->post ( 'fopenid' )) != null) { //挑战朋友
			if ($fopenid == $openid) {
				delete_cookie ('fopenid');
				$this->format ( '挑战失败，不能挑战自己', null, 1 ); //不能挑战自己
			}
			
			$cmp_score = $this->input->post('cmp_score') ? : 0;
			if ($cmp_score < 600) {
				delete_cookie ('fopenid');
				$this->format ( '挑战失败，对方未到达600分记录', null, 1 ); //600分以上挑战限制
			}
			$max = $this->challenge->getMaxScoreByOpenid($openid);
			
			if ($cmp_score < $max) {
				delete_cookie ('fopenid');
				$this->format ( '挑战失败，该挑战失效，对方已破新纪录', null, 1 ); //新记录刷新， 低记录挑战失效。
			}
			log_message ( 'error', "挑战开始", 1 );
			$score = mt_rand ( - $max, $max );
			
			if ($score >= 0) {
				$this->format ( '<i>恭喜你获得<br /><strong>' . $score . '</strong>合氏币</i>', array (
						'score' => $score,
						'play_title' => '挑战成功',
				), 3 );
			} else {
				$this->format ( '<i>遗憾损失<br /><strong>' . $score . '</strong>合氏币</i>', array (
						'score' => $score,
						'play_title' => '挑战失败',
				) , 3);
			}
		} else { //自己玩 ##这部分逻辑已经更改，详见commit接口，分数从客户端获得###
			$this->account->addScore ( $openid, - $buckle ); // 每次玩游戏扣除
			$post = array (
					'accessToken' => $this->session->userdata ( 'accesstoken' ),
					'score' => $buckle,
					'flag' => 0,
			);
			$ret = hersbit_api ( $this->config->item ( 'hersbit_api' ), $post );
			if ($ret ['returnCode'] == '000') {
				$this->challenge->save ( $openid, null, - $buckle, 'fight', 1 ); //保存同步记录
			} else {
				log_message ( 'error', "code:{$ret['returnCode']} msg:{$ret['returnMsg']}", 1 );
				$this->challenge->save ( $openid, null, - $buckle, 'fight', 0 ); //保存未同步记录
			}
			
			$score = mt_rand ( $min, $max );
			$this->session->set_userdata ( 'score', $score );
			$this->format ( '', array (
					'score' => $score,
			) );
		}
	}
	
	/**
	 * 保存得分
	 */
	public function commit() {
 		//$score = $this->session->userdata ( 'score' );
		$openid = $this->session->userdata ( 'openid' );
		$score = $this->input->post('score') ? : 0;
		$cmp_score = $this->input->post('cmp_score') ? : 0;
		if (1) { 
			if(($fopenid = $this->input->post('fopenid')) != false) {//挑战记录
			    log_message ( 'error', "挑战提交", 1 );
			    $friend = $this->account->getInfoByOpenid ( $fopenid, 1 );
			    $cmp = $score;
			    if ($score > $cmp_score) 
					$score = 600;
			    else 
					$score = -250;
			    $this->challenge->save ( $openid, $friend, $score, 'fight', 0 , $cmp); //保存未同步记录
			    $this->account->addScore ( $openid, $score ); //保存本地
			    $this->session->unset_userdata ( 'fopenid' );
			    delete_cookie ('fopenid');
			}
			
			//执行同步
			$ids = array();
			$if_sync = 0;
			$challengeLists = $this->challenge->getAllByOpenid($openid, $if_sync);
			$sync_score = 0;
			foreach ($challengeLists as $challenge) {
				$sync_score += $challenge->result;
				$ids[] = $challenge->id;
			}
			if ($sync_score) {
				$post = array (
						'accessToken' => $this->session->userdata ( 'accesstoken' ),
						'score' => abs( $sync_score ),
						'flag' => $sync_score > 0 ? 1 : 0,
				);
				$ret = hersbit_api ( $this->config->item ( 'hersbit_api' ), $post ); //同步记录到helloan
				if ($ret ['returnCode'] == '000') {
					$this->challenge->update($ids, array('if_sync'=>1));
				} else {
					log_message ( 'error', "code:{$ret['returnCode']} msg:{$ret['returnMsg']}", 1 );
					//$this->format ( '同步失败' );
				}
			} //同步完成

			if ($fopenid){
			    if ($score >= 0) {
				    $this->format ( '<i>小样儿，不错呦！再接再厉！<br /><strong>+' . $score . '</strong>合氏币</i>', array (
						    'score' => $score,
						    'play_title' => '挑战成功',
				    ), 3 );
			    } else {
				    $this->format ( '<i>小样儿，裤衩都没了吧？<br /><strong>' . $score . '</strong>合氏币</i>', array (
						    'score' => $score,
						    'play_title' => '挑战失败',
				    ) , 3);
			    }
			}
		}
		
		if ($score) { //个人玩，提交游戏分数
			$post = array (
					'accessToken' => $this->session->userdata ( 'accesstoken' ),
					'score' => abs($score),
					'flag' => $score > 0 ? 1 : 0,
			);
			$ret = hersbit_api ( $this->config->item ( 'hersbit_api' ), $post );
			if ($ret ['returnCode'] == '000') {
				$this->account->addScore ( $openid, $score );
				$this->challenge->save ( $openid, null, $score, 'fight', 1 ); //保存同步记录
				$this->session->unset_userdata ( 'score' );
				$this->format ( '完成', null, 0 );
			} else if ($ret ['returnCode'] == '004') { //登录失效
				delete_cookie ('openid');
			} else {
				log_message ( 'error', "code:{$ret['returnCode']} msg:{$ret['returnMsg']}", 1 );
			}
			$this->challenge->save ( $openid, null, $score, 'fight', 0 ); //保存未同步记录
			$this->account->addScore ( $openid, $score ); //保存本地
			$this->format ( '完成', null, 0 );
		} 
		log_message ( 'error', "提交完成", 1 );
	}
	
}
