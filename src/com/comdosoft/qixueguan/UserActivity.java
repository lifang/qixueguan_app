package com.comdosoft.qixueguan;

<<<<<<< HEAD
import com.comdosoft.qixueguan.tool.Urlinterface;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.widget.LinearLayout.LayoutParams;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class UserActivity extends Activity implements Urlinterface {

	public TextView name;
	public TextView sex;
	public TextView birthday;
	public String uid;

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.user);

		Display display = this.getWindowManager().getDefaultDisplay();
		int width = display.getWidth();
		int height = display.getHeight();
		RelativeLayout restitle = (RelativeLayout) findViewById(R.id.restitle);
		LayoutParams titlelp = new LayoutParams(width, height / 10);
		restitle.setLayoutParams(titlelp);

		SharedPreferences userInfo = getSharedPreferences("id", 0);
		String u_name = userInfo.getString("name", "未设置");
		String u_sex = userInfo.getString("sex", "未设置");
		String u_birthday = userInfo.getString("birthday", "未设置");

		uid = userInfo.getString("id", "");
		name = (TextView) findViewById(R.id.name);
		sex = (TextView) findViewById(R.id.user_sex);
		birthday = (TextView) findViewById(R.id.user_birthday);
		
		name.setText(u_name);
		sex.setText(u_sex);
		birthday.setText(u_birthday);

	}

	public void onclick(View v) {

=======
import android.app.Activity;
import android.os.Bundle;

public class UserActivity extends Activity {

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		
>>>>>>> be3859dc3d50513da46878871b14cf993d648647
	}
}
