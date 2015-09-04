<?php
/**
 *        
 * @author      zaric zhang<zaric.zhang@ndpmedia.com>
 * @package     yeahmobi
 * @version     
 * @copyright   Copyright (c) 2014 Yeahmobi, Inc.
 */
class Challenge_Model extends CI_Model {
	private $prefix = "hb_";
	function __construct() {
		parent::__construct ();
		$this->db->set_dbprefix ( $this->prefix );
	}
	
	/**
	 * 保存挑战
	 *
	 * @param string $openid        	
	 * @param string $friend_info        	
	 * @param int $result        	
	 * @param string $type        	
	 */
	public function save($openid, $friend_info, $result, $type = 'fight', $sync = 1, $cmp_score = null) {
		$time = time ();
		$data = array (
				'openid' => $openid,
				'fopenid' => $friend_info ['openid'] ?  : '', // 挑战自己是为空
				'fnickname' => $friend_info ['nickname'] ?  : '',
				'create_time' => $time,
				'result' => $result,
				'type' => $type,
				'if_sync' => $sync,
				'sync_time' => $sync ? $time : '',
				'cmp' => $cmp_score ? intval($cmp_score) : null,
		);
		
		$this->db->insert ( $this->db->dbprefix ( 'challenge' ), $data );
	}
	
	public function update($ids, $post) {
		if (empty ( $ids ))
			return;
		$data = array (
				'if_sync' => $post ['if_sync'],
				'sync_time' => time () 
		);
		
		$this->db->where_in ( 'id', $ids );
		$this->db->update ( $this->db->dbprefix ( 'challenge' ), $data );
	}
	
	/**
	 * 通过openid 获取信息
	 *
	 * @param unknown $openid        	
	 */
	public function getAllByOpenid($openid, $if_sync = 1) {
		if (! $openid)
			return;
		$this->db->order_by ( "create_time", "desc" );
		$where = array (
				'openid' => $openid 
		);
		if ($if_sync == false)
			$where ['if_sync'] = 0;
		$query = $this->db->get_where ( $this->db->dbprefix ( 'challenge' ), $where );
		return $query->result ();
	}
	
	/**
	 * 获赠记录
	 * @param unknown $openid
	 */
	public function getGivenByOpenid($openid) {
		if (! $openid)
			return;
		$this->db->order_by ( "create_time", "desc" );
		$where = array (
				'fopenid' => $openid,
				'type' => 'give' 
		);
		$query = $this->db->get_where ( $this->db->dbprefix ( 'challenge' ), $where );
		return $query->result ();
	}
	
	/**
	 * 赠送记录
	 * @param unknown $openid
	 */
	public function getGivenedByOpenid($openid) {
		if (! $openid)
			return;
		$this->db->order_by ( "create_time", "desc" );
		$where = array (
				'openid' => $openid,
				'type' => 'give'
		);
		$query = $this->db->get_where ( $this->db->dbprefix ( 'challenge' ), $where );
		return $query->result ();
	}
	
	/**
	 * 挑战记录
	 * 
	 * @param unknown $openid
	 */
	public function getChallengeLogByOpenid($openid) {
		if (! $openid)
			return;
		$this->db->order_by ( "create_time", "desc" );
		$query = $this->db->get_where ( $this->db->dbprefix ( 'challenge' ), array (
				'openid' => $openid,
				'type' => 'fight' 
		) );
		return $query->result ();
	}
	
	/**
	 * 被挑战记录
	 *
	 * @param unknown $fopenid
	 */
	public function getChallengeLogByFopenid($fopenid) {
		if (! $fopenid)
			return;
		$this->db->order_by ( "create_time", "desc" );
		$where = array (
				'fopenid' => $fopenid,
				'type' => 'fight',
		);
		$query = $this->db->get_where ( $this->db->dbprefix ( 'challenge' ), $where );
		return $query->result ();
	}
	
	/**
	 * 最高分
	 * 
	 * @param unknown $openid
	 * @return void|NULL
	 */
	public function getMaxScoreByOpenid($openid) {
		if (! $openid)
			return;
		$this->db->select_max('result');
		$query = $this->db->get_where ( $this->db->dbprefix ( 'challenge' ), array (
				'openid' => $openid,
				'fopenid' => '',
				'type' => 'fight'
		) );
		if ($query->num_rows() > 0) {
		   $row = $query->row(); 
		   return $row->result;
		}
		return null;
	}
}
