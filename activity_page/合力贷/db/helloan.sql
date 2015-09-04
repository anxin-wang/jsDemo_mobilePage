/*
Navicat MySQL Data Transfer

Source Server         : 172.30.40.242
Source Server Version : 50154
Source Host           : 172.30.40.242:3306
Source Database       : helloan

Target Server Type    : MYSQL
Target Server Version : 50154
File Encoding         : 65001

Date: 2015-02-05 20:45:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `hb_account`
-- ----------------------------
DROP TABLE IF EXISTS `hb_account`;
CREATE TABLE `hb_account` (
  `hers_bit_uid` int(11) DEFAULT NULL,
  `openid` varchar(100) NOT NULL,
  `nickname` varchar(50) NOT NULL COMMENT '昵称',
  `hers_bit` int(10) unsigned NOT NULL COMMENT '合氏币',
  `telephone` int(11) unsigned NOT NULL,
  `if_register` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否注册',
  `register_web_time` int(11) unsigned DEFAULT NULL COMMENT '注册时间',
  `login_web_time` int(11) unsigned DEFAULT NULL COMMENT '登录时间',
  `mobile_create_time` int(11) unsigned DEFAULT NULL COMMENT '移动端生成时间',
  PRIMARY KEY (`openid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hb_account
-- ----------------------------
INSERT INTO `hb_account` VALUES ('12012402', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'Lee', '2994', '4294967295', '1', null, null, '1423048619');
INSERT INTO `hb_account` VALUES (null, 'oaOnNjop0c4bl5yegQZJrg0THBqx', 'emy', '500', '0', '0', null, null, '1423048619');

-- ----------------------------
-- Table structure for `hb_challenge`
-- ----------------------------
DROP TABLE IF EXISTS `hb_challenge`;
CREATE TABLE `hb_challenge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `fopenid` varchar(200) NOT NULL,
  `fnickname` varchar(50) DEFAULT NULL,
  `type` enum('give','fight') NOT NULL,
  `result` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hb_challenge
-- ----------------------------
INSERT INTO `hb_challenge` VALUES ('1', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'Lee', 'fight', '-1000', '0');
INSERT INTO `hb_challenge` VALUES ('2', 'oaOnNjop0c4bl5yegQZJrg0THBqw', '', 'Lee', 'fight', '6224', '1423127103');
INSERT INTO `hb_challenge` VALUES ('3', 'oaOnNjop0c4bl5yegQZJrg0THBqw', '', 'Lee', 'fight', '9689', '1423127236');
INSERT INTO `hb_challenge` VALUES ('4', 'oaOnNjop0c4bl5yegQZJrg0THBqw', '', 'Lee', 'fight', '8986', '1423127237');
INSERT INTO `hb_challenge` VALUES ('5', 'oaOnNjop0c4bl5yegQZJrg0THBqw', '', 'Lee', 'fight', '6538', '1423127238');
INSERT INTO `hb_challenge` VALUES ('6', 'oaOnNjop0c4bl5yegQZJrg0THBqw', '', 'Lee', 'fight', '4002', '1423127239');
INSERT INTO `hb_challenge` VALUES ('7', 'oaOnNjop0c4bl5yegQZJrg0THBqw', '', 'Lee', 'fight', '-6101', '1423127240');
INSERT INTO `hb_challenge` VALUES ('8', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'Lee', 'fight', '656', '1423127388');
INSERT INTO `hb_challenge` VALUES ('9', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'Lee', 'fight', '6698', '1423127770');
INSERT INTO `hb_challenge` VALUES ('10', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'Lee', 'fight', '-1758', '1423127771');
INSERT INTO `hb_challenge` VALUES ('11', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'oaOnNjop0c4bl5yegQZJrg0THBqx', 'emy', 'give', '100', '1423128648');
INSERT INTO `hb_challenge` VALUES ('12', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'oaOnNjop0c4bl5yegQZJrg0THBqx', 'emy', 'give', '100', '1423128650');
INSERT INTO `hb_challenge` VALUES ('13', 'oaOnNjop0c4bl5yegQZJrg0THBqw', 'oaOnNjop0c4bl5yegQZJrg0THBqx', 'emy', 'fight', '1871', '1423128778');
