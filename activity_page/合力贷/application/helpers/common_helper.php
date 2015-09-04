<?php
function register_api($url,	$post) {
	$CI =& get_instance();
	$param = '';
	$password = $post['password'];
	unset($post['password']);
	foreach ($post as $k=>$v) {
		$param[] = $k.'='.$v;
	}
	$param = implode('&', $param);
	$key = 'hld2015w';
	$CI->load->library('des', array('key'=>$key));
	$desStr = $CI->des->encrypt($password);
	$param .= '&password='.$desStr;
	log_message('error', 'param:'.$param, 1); //log
	return api($url, 1, $param);
}

function login_api($url, $post) {
	$CI =& get_instance();
	$param = '';
	$password = $post['password'];
	unset($post['password']);
	foreach ($post as $k=>$v) {
		$param[] = $k.'='.$v;
	}
	$param = implode('&', $param);
	$key = 'hld2015w';
	$CI->load->library('des', array('key'=>$key));
	$desStr = $CI->des->encrypt($password);
// 	$str = $crypt->decrypt($mstr);
	$param .= '&password='.$desStr;
	log_message('error', 'param:'.$param, 1); //log 
	return api($url, 1, $param);
}

function hersBit_api($url, $post) {
	$param = '';
	foreach ($post as $k=>$v) {
		$param[] = $k.'='.$v;
	}
	$param = implode('&', $param);
	$param .= "&key=".md5($param.'&key=hld2015wechatgame');
	return api($url, 1, $param);
}

function checkcode_api($url, $telephone) {
	$param = "mobilePhone={$telephone}";
	$param .= "&key=".md5($param.'|&|key=hld2015wechatgame_checkcode');
	return api($url."?".$param);
}

function api($url, $if_post = 0, $curlPost = '') {
	$ch = curl_init ();
	curl_setopt ( $ch, CURLOPT_URL, $url );
	curl_setopt ( $ch, CURLOPT_HEADER, 0 );
	curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt ( $ch, CURLOPT_CONNECTTIMEOUT, 10 );
	curl_setopt ( $ch, CURLOPT_POST, $if_post );
	$if_post && curl_setopt ( $ch, CURLOPT_POSTFIELDS, $curlPost );
	$res = curl_exec ( $ch );
	curl_close ( $ch );
	return json_decode ( $res, true );
}

/**
 * 冒泡排序
 *
 * @param unknown $list
 * @param unknown $field
 * @return unknown
 */
function bubble_sort($list, $field) {
	$count = count($list);
	for ($i=0;$i<$count;$i++) {
		for ($j=0;$j<$count;$j++) {
			$iobj = $list[$i];
			$jobj = $list[$j];
			if ($iobj->$field > $jobj->$field) {
				$item = $list[$i];
				$list[$i] = $list[$j];
				$list[$j] = $item;
			}
		}
	}
	return $list;
}
