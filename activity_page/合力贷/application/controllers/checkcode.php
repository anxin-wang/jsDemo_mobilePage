<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Checkcode extends HB_Controller {

	/**
	 * 获取验证码
	 */
	public function index() {
		$this->load->helper ( array (
				'form',
				'url' 
		) );
		$this->load->library ( 'form_validation' );
		$this->form_validation->set_error_delimiters ( '', '' );
		$this->form_validation->set_rules ( 'telephone', '手机号码', 'required|callback_valid_phone_number_or_empty' );
		
		if ($this->form_validation->run () == FALSE) {
			$this->format ( array (
					form_error ( 'telephone' ) 
			), null, 1 );
		} else {
			$ret = checkcode_api ( $this->config->item ( 'checkcode_api' ), $this->input->post ( 'telephone' ) );
			if ($ret ['returnCode'] == '000') {
				$this->session->set_userdata ( 'jsessionid', $ret ['returnMsg'] ); //save jsessionid
				$this->format ( '校验码已发送至您的手机', array('jsessionid'=>$ret['returnMsg']), 0 );
			} else {
				log_message ( 'error', "code:{$ret['returnCode']} msg:{$ret['returnMsg']}", 1 );
				$this->format ( $ret ['returnMsg'] ?  : '发送失败', null, 1 );
			}
		}
	}
}