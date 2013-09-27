package com.comdosoft.qixueguan.tool;

public interface Urlinterface {
	static final String tag="linshi";
	static final String IP = "http://192.168.2.9:3000";
	// 登陆
	static final String LOGIN_URL = IP
			+ "/api/users/login";
	//注册
	static final String REGIST_URL = IP
			+ "/api/users/regist";
	//编辑
	static final String UPDATE_USER = IP
			+ "/api/users/update";
}
