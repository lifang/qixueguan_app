package com.comdosoft.qixueguan;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.widget.EditText;

import com.comdosoft.qixueguan.tool.QiXueGuanTool;
import com.comdosoft.qixueguan.tool.Urlinterface;

public class LoginActivity extends Activity implements Urlinterface {

	public EditText email;
	public EditText pwd;
	public ProgressDialog prodialog;

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		// 去掉Activity上面的状态栏
		setContentView(R.layout.login);
		email = (EditText) findViewById(R.id.email);
		pwd = (EditText) findViewById(R.id.pwd);
		email.setText("123456");
		pwd.setText("q");
	}

	class RunHandler implements Runnable {
		public void run() {
			Looper.prepare();
			Message mes = new Message();
			Map<String, String> map = new HashMap<String, String>();
			map.put("email", email.getText().toString());
			map.put("password", pwd.getText().toString());
			String json = QiXueGuanTool.doPost(LOGIN_URL, map);
			Log.i(tag, json);
			if (json.equals("error_email")) {
				mes.what = 1;
			} else if (json.equals("error_pwd")) {
				mes.what = 2;
			} else {
				mes.what = 3;
				try {
					JSONObject item = new JSONObject(json);
					String user = item.getString("user");
					item = new JSONObject(user);
					String id = item.getString("id");
					String name = item.getString("name");
					String email = item.getString("email");
					String birthday = item.getString("birthday");
					String sex = item.getString("sex");
					String img = item.getString("img");

					SharedPreferences userInfo = getSharedPreferences("id", 0);
					Editor editor = userInfo.edit();//获取编辑器
					editor.putString("id", id);
					editor.putString("name", name);
					editor.putString("email", email);
					editor.putString("birthday",birthday);
					editor.putString("sex", sex);
					editor.putString("img", img);
					editor.commit();
				} catch (JSONException e) {
					e.printStackTrace();
				}

			}
			handler.sendMessage(mes);

			Looper.loop();
		}
	}

	private Handler handler = new Handler() {
		public void handleMessage(android.os.Message msg) {
			prodialog.dismiss();
			Builder builder = new Builder(LoginActivity.this);
			builder.setTitle("提示");
			switch (msg.what) {
			case 1:
				email.setText("");
				pwd.setText("");
				builder.setMessage("该Email不存在");
				builder.setPositiveButton("确定", null);
				builder.show();
				break;
			case 2:
				pwd.setText("");
				builder.setMessage("密码错误！");
				builder.setPositiveButton("确定", null);
				builder.show();
				break;
			case 3:

				LoginActivity.this.finish();
				Intent intent = new Intent(LoginActivity.this,
						UserActivity.class);
				startActivity(intent);
				break;
			}
		};
	};

	public void onclick(View v) {
		Builder builder = new AlertDialog.Builder(LoginActivity.this);
		builder.setTitle("提示");
		Intent intent = new Intent();
		switch (v.getId()) {
		case R.id.login:
			if (email.getText().toString().equals("")) {
				builder.setMessage("Email不可为空");
				builder.setPositiveButton("确定", null);
				builder.show();
			} else if (pwd.getText().toString().equals("")) {
				builder.setMessage("密码不可为空");
				builder.setPositiveButton("确定", null);
				builder.show();
			} else {
				prodialog = new ProgressDialog(LoginActivity.this);
				prodialog.setMessage("提交数据中，请稍后..");
				prodialog.show();
				Thread thread = new Thread(new RunHandler());
				thread.start();
			}
			break;
		case R.id.regist:
			LoginActivity.this.finish();
			intent.setClass(LoginActivity.this, RegistActivity.class);
			startActivity(intent);
			break;
		}
	}

	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			System.exit(0);
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}
}
