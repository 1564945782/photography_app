/*
Navicat MySQL Data Transfer

Source Server         : wl
Source Server Version : 50200
Source Host           : localhost:3306
Source Database       : photoapp

Target Server Type    : MYSQL
Target Server Version : 50200
File Encoding         : 65001

Date: 2018-12-14 08:52:52
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
  `both` date DEFAULT NULL COMMENT '生日',
  `signs` varchar(255) DEFAULT NULL COMMENT '签名',
  `tel` int(11) DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL COMMENT '职业',
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `loginnum` int(11) DEFAULT NULL,
  `lasttime` datetime DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'leaf', '4297f44b13955235245b2497399d7a93', null, null, null, null, null, null, null, null, null, '24', '2018-12-13 20:07:27', '1');
INSERT INTO `user` VALUES ('2', 'lan', '4297f44b13955235245b2497399d7a93', null, null, null, null, null, null, null, null, null, '1', '2018-12-10 18:08:03', '1');
INSERT INTO `user` VALUES ('3', 'tom', '4297f44b13955235245b2497399d7a93', null, null, null, null, null, null, null, null, null, '1', '2018-12-10 18:08:54', '1');

-- ----------------------------
-- Table structure for `works`
-- ----------------------------
DROP TABLE IF EXISTS `works`;
CREATE TABLE `works` (
  `wid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(11) DEFAULT NULL,
  `u_name` char(6) DEFAULT NULL,
  `descript` varchar(255) CHARACTER SET gbk DEFAULT NULL,
  `pic_address` varchar(255) CHARACTER SET gbk COLLATE gbk_bin DEFAULT NULL,
  `addtimes` datetime DEFAULT NULL,
  `zan_nums` int(20) DEFAULT '0',
  `com_nums` int(20) DEFAULT '0',
  `comment` varchar(255) DEFAULT NULL,
  `saw_nums` int(20) DEFAULT '0',
  `w_status` int(1) DEFAULT '1',
  PRIMARY KEY (`wid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of works
-- ----------------------------
INSERT INTO `works` VALUES ('58', '1', 'leaf', '摄影从时间中截取一个瞬间，让它静止不动，从而改变生活。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164463063_90001036.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544164463065_59128015.gif\"]}', '2018-12-07 00:00:00', '10', '20', null, '10', '1');
INSERT INTO `works` VALUES ('59', '1', 'leaf', '照相机是一个教具，教给人们在没有相机时如何看世界。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164495578_60361133.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544164495608_16641487.gif\"]}', '2018-12-07 00:00:00', '11', '12', null, '13', '1');
INSERT INTO `works` VALUES ('60', '1', 'leaf', '找到最适合拍的是最难的。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164515252_17508598.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544164515284_26504734.gif\"]}', '2018-12-07 00:00:00', '15', '0', null, '20', '1');
INSERT INTO `works` VALUES ('61', '1', 'leaf', '运气是用心摄影师之最好的老师。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164534787_76818129.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544164534788_84991032.gif\"]}', '2018-12-07 00:00:00', '1', '2', null, '10', '1');
INSERT INTO `works` VALUES ('62', '1', 'leaf', '有时最简单的照片是最难拍的。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164555011_39765401.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544164555076_81236417.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544164555077_65655818.gif\"]}', '2018-12-07 00:00:00', '15', '25', null, '10', '1');
INSERT INTO `works` VALUES ('63', '1', 'leaf', '有光即可摄影。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164580836_23697798.ico\"]}', '2018-12-07 00:00:00', '30', '10', null, '50', '1');
INSERT INTO `works` VALUES ('64', '1', 'leaf', '不在于对相机的投入，而在于对相机的透视。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164595842_85524013.ico\",\"http://192.168.7.145:81/uploads/2018/12/1544164595845_78042448.ico\"]}', '2018-12-07 00:00:00', '30', '20', null, '10', '1');
INSERT INTO `works` VALUES ('65', '1', 'leaf', '一卷36张均为满意曝光意味着摄影师无任何新的尝试。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164612876_26510066.ico\",\"http://192.168.7.145:81/uploads/2018/12/1544164612877_29105838.ico\",\"http://192.168.7.145:81/uploads/2018/12/1544164612877_64958982.ico\"]}', '2018-12-07 00:00:00', '150', '150', null, '140', '1');
INSERT INTO `works` VALUES ('66', '1', 'leaf', '一个真正的摄影师像真正的诗人或真正的画家那样少见。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164631801_52958901.jpg\"]}', '2018-12-07 00:00:00', '10', '0', null, '0', '1');
INSERT INTO `works` VALUES ('67', '1', 'leaf', '想象力跑焦了，眼力就靠不住了。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164648942_34185452.jpg\"]}', '2018-12-07 00:00:00', '0', '30', null, '0', '1');
INSERT INTO `works` VALUES ('68', '1', 'leaf', '永远不要以为相机是最重要的。他只是你的工具，合手就好。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544164662389_36495426.jpg\"]}', '2018-12-07 00:00:00', '0', '0', null, '45', '1');
INSERT INTO `works` VALUES ('73', '1', 'leaf', '爱德华?布巴——摄影师其实就是那个什么也没找到的人，可是他总是保持希望到最后一刻。这种希望激励着他，使他能坚持下去。摄影家能保持年轻，是因为他们一直到最后一刻，还希望能拍出一张成功的照片。安德烈?柯特兹——相机是我的工具，经由它，我给予我周遭的所有事物一个理由。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544167458730_11736240.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544167458731_68768880.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544167458736_67498968.gif\"]}', '2018-12-07 00:00:00', '0', '50', null, '0', '1');
INSERT INTO `works` VALUES ('75', '1', 'leaf', '寇德卡——我对摄影哲学没兴趣，我感兴趣的是极限。我总是拍同样的人、同样的情景。因为我要知道这些人、这些情景的极限和我自己的极限，至于是第一张成功、还是第五张、乃至第十张都不重要。17.卡夫卡——人们为事物拍照是为了将其赶出心中，我的故事则是一种闭眼的方式。18.拉尔夫?吉卜生——我不理会照相机如何看事物，20.马克?吕布——梦与纪律并不冲突，它们是一体两面。就像音乐，它建构在数学的精确之上，却从感觉和肺腑来打动我们。技巧和感性是分不开的。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544167458730_11736240.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544167458731_68768880.gif\",\"http://192.168.7.145:81/uploads/2018/12/1544167458736_67498968.gif\"]}', '2018-12-07 00:00:00', '110', '0', null, '222', '1');
INSERT INTO `works` VALUES ('81', '1', 'leaf', '尤金?史密斯——平常老是叫我浪漫派的人，都是由于他们在生活中嘲讽愤世并受尽挫折，所以才什么也信不过了。而当我坚持信念的时候，他们就把我称作浪漫主义。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544168471425_99278398.png\",\"http://192.168.7.145:81/uploads/2018/12/1544168471426_80067741.png\"]}', '2018-12-07 00:00:00', '0', '0', null, '72', '1');
INSERT INTO `works` VALUES ('82', '1', 'leaf', '深入理解你的拍摄主题，让你镜头前的人参与进来。你并不能把眼睛贴着取景框不离开，多多建立摄影师与模特的信任，多多交流，最后才是，按下快门。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544168622505_04867896.png\",\"http://192.168.7.145:81/uploads/2018/12/1544168622508_64530842.png\"]}', '2018-12-07 15:43:43', '115', '45', null, '0', '1');
INSERT INTO `works` VALUES ('83', '1', 'leaf', '每时每刻都要注意光线的变化，摄影是光的艺术，不管是阳光、烛光，还是电脑屏幕产生的光。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544168704804_71643270.png\",\"http://192.168.7.145:81/uploads/2018/12/1544168704805_44366900.png\",\"http://192.168.7.145:81/uploads/2018/12/1544168704807_45009972.png\"]}', '2018-12-07 15:45:06', '0', '40', null, '0', '1');
INSERT INTO `works` VALUES ('84', '1', 'leaf', '赫尔穆特?纽顿——知识分子热衷于讨论摄影的意义，于是摄影师按下快门的手越来越犹疑，这种情况发展下去，可能导致摄影两极分化，到最后只剩下两种人：新闻摄影师和哲学家。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544168995936_70284483.png\",\"http://192.168.7.145:81/uploads/2018/12/1544168995938_55190151.png\"]}', '2018-12-07 15:50:05', '98', '0', null, '83', '1');
INSERT INTO `works` VALUES ('112', '1', 'leaf', '不在于对相机的投入，而在于对相机的透视。\n', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544436628859_87599462.png\",\"http://192.168.7.145:81/uploads/2018/12/1544436628866_70162762.png\"]}', '2018-12-10 18:10:36', '0', '96', null, '0', '1');
INSERT INTO `works` VALUES ('113', '1', 'leaf', '每时每刻都要注意光线的变化，摄影是光的艺术，不管是阳光、烛光，还是电脑屏幕产生的光。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544436661300_40069932.png\",\"http://192.168.7.145:81/uploads/2018/12/1544436661300_51600082.png\",\"http://192.168.7.145:81/uploads/2018/12/1544436661300_93735840.png\"]}', '2018-12-10 18:11:10', '0', '0', null, '71', '1');
INSERT INTO `works` VALUES ('114', '2', 'lan', '寇德卡——我对摄影哲学没兴趣，我感兴趣的是极限。我总是拍同样的人、同样的情景。因为我要知道这些人、这些情景的极限和我自己的极限，至于是第一张成功、还是第五张、乃至第十张都不重要。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544436910849_18464807.png\",\"http://192.168.7.145:81/uploads/2018/12/1544436910851_77954289.png\",\"http://192.168.7.145:81/uploads/2018/12/1544436910852_45630474.png\"]}', '2018-12-10 18:15:19', '0', '87', null, '0', '1');
INSERT INTO `works` VALUES ('115', '2', 'lan', '实验和冒险精神很重要，就像我们的杂志——Dazed&Confused在创办初期时那样，多多欣赏别人的作品，不过拒绝抄袭!', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544436930397_58361876.png\"]}', '2018-12-10 18:15:40', '77', '97', null, '0', '1');
INSERT INTO `works` VALUES ('116', '3', 'tom', '一个真正的摄影师像真正的诗人或真正的画家那样少见。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544437010880_32249016.png\",\"http://192.168.7.145:81/uploads/2018/12/1544437010882_20732646.png\"]}', '2018-12-10 18:17:02', '0', '47', null, '24', '1');
INSERT INTO `works` VALUES ('117', '3', 'tom', '马克?吕布——梦与纪律并不冲突，它们是一体两面。就像音乐，它建构在数学的精确之上，却从感觉和肺腑来打动我们。技巧和感性是分不开的。', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544437044996_92091325.png\",\"http://192.168.7.145:81/uploads/2018/12/1544437044997_71460902.png\"]}', '2018-12-10 18:17:36', '0', '55', null, '0', '0');
INSERT INTO `works` VALUES ('121', '3', 'tom', 'rrr', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544577548968_17785671.png\"]}', '2018-12-12 09:19:13', '0', '0', null, '0', '1');
INSERT INTO `works` VALUES ('122', '3', 'tom', '测试中数据', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544579004098_24155305.png\",\"http://192.168.7.145:81/uploads/2018/12/1544579004100_97545842.png\",\"http://192.168.7.145:81/uploads/2018/12/1544579004101_54120960.png\"]}', '2018-12-12 09:43:26', '0', '0', null, '0', '1');
INSERT INTO `works` VALUES ('123', '3', 'tom', '手机测试', '{\"errno\":0,\"data\":[\"http://192.168.7.145:81/uploads/2018/12/1544661815765_32328818.jpg\"]}', '2018-12-13 08:43:51', '0', '0', null, '0', '1');
