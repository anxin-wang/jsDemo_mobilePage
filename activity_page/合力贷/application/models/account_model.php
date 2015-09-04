<?php
/**
 *        
 * @author      zaric zhang<zaric.zhang@ndpmedia.com>
 * @package     yeahmobi
 * @version     
 * @copyright   Copyright (c) 2014 Yeahmobi, Inc.
 */
class Account_Model extends CI_Model {
	private $prefix = "hb_";
	private $default_hers_bit = 600;
	function __construct() {
		parent::__construct ();
		$this->db->set_dbprefix($this->prefix);
	}
	
	/**
	 * 通过openid 获取信息
	 * 
	 * @param unknown $openid        	
	 */
	public function getInfoByOpenid($openid, $is_array=0) {
		if (! $openid)
			return;
		$query = $this->db->get_where ( $this->db->dbprefix ( 'account' ), array (
				'openid' => $openid 
		) );
		if ($query->num_rows () > 0) {
			if ($is_array)
				return $query->row_array();
			return $query->row ();
		}
	}
	
	/**
	 * 通过$telephone 获取信息
	 * 
	 * @param unknown $telephone
	 * @param number $is_array
	 */
	public function getInfoByTelephone($telephone, $is_array=0) {
		if (! $telephone)
			return;
		$query = $this->db->get_where ( $this->db->dbprefix ( 'account' ), array (
				'telephone' => $telephone 
		) );
		if ($query->num_rows () > 0) {
			if ($is_array)
				return $query->row_array();
			return $query->row ();
		}
	}
	
	/**
	 * 保存账号
	 *
	 * @param unknown $user_info        	
	 */
	public function save($user_info) {
		$data = array (
				'openid' => $user_info ['openid'],
				'nickname' => $user_info ['nickname'],
				'headimgurl' => $user_info ['headimgurl'],
				'mobile_create_time' => time (),
				'hers_bit' => $this->default_hers_bit,
		);
		
		$this->db->insert ( $this->db->dbprefix ( 'account' ), $data );
	}
	
	
	/**
	 * register account after web system is registered
	 * 
	 * @param string $openid
	 * @param array $data
	 */
	public function register($openid, $data) {
		$_data = array(
               'telephone' => $data['telephone'],
			   'if_register' => 1,
			   'hers_bit_uid' => $data['hers_bit_uid']
            );

		$this->db->where('openid', $openid);
		return $this->db->update( $this->db->dbprefix ( 'account' ), $_data ); 
	}
	
	/**
	 * 增加合氏币
	 * 
	 * @param string $openid
	 * @param int $hers_bit
	 */
	public function addScore($openid, $hers_bit) {
		$account = $this->getInfoByOpenid($openid);
		$org_hers_bit = $account->hers_bit;
		$_data = array(
               'hers_bit' => (int)$hers_bit + $org_hers_bit,
        );

		$this->db->where('openid', $openid);
		return $this->db->update( $this->db->dbprefix ( 'account' ), $_data ); 
	}
}