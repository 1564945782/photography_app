/*
Navicat MySQL Data Transfer

Source Server         : wl
Source Server Version : 50200
Source Host           : localhost:3306
Source Database       : photoapp

Target Server Type    : MYSQL
Target Server Version : 50200
File Encoding         : 65001

Date: 2018-12-25 19:04:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` char(11) NOT NULL,
  `u_passwd` char(32) NOT NULL COMMENT 'md5加密：123123',
  `touxiang` varchar(255) DEFAULT NULL COMMENT '头像',
  `age` int(3) DEFAULT NULL,
  `sex` char(11) DEFAULT NULL,
  `both1` varchar(255) DEFAULT NULL COMMENT '生日',
  `signs` varchar(255) DEFAULT NULL COMMENT '签名',
  `tel` int(11) DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL COMMENT '职业',
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `intruduce` varchar(255) DEFAULT NULL COMMENT '个人说明',
  `loginnum` int(11) DEFAULT NULL,
  `lasttime` datetime DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'leaf', '4297f44b13955235245b2497399d7a93', 'C:\\fakepath\\mao01.ico', '11', '男', '2007-12-17', '行走的路灯', '2147483647', '记者', '123@qq.com', '浙江-杭州-余杭区', null, '36', '2018-12-24 10:22:52', '1');
INSERT INTO `user` VALUES ('2', 'lan', '4297f44b13955235245b2497399d7a93', '', '1', '男', '2017-12-17', '', '2147483647', '摄影师', '1@z.xx', ' 浙江-温州-', null, '1', '2018-12-10 18:08:03', '1');
INSERT INTO `user` VALUES ('3', 'tom', '4297f44b13955235245b2497399d7a93', null, null, null, null, null, null, null, null, null, null, '1', '2018-12-10 18:08:54', '1');
INSERT INTO `user` VALUES ('5', '666', '4297f44b13955235245b2497399d7a93', null, null, null, null, null, null, null, null, null, null, null, null, '1');
INSERT INTO `user` VALUES ('6', 'google', '4297f44b13955235245b2497399d7a93', null, null, null, null, null, null, null, null, null, null, null, null, '1');
