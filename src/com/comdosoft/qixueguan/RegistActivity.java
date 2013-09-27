package com.comdosoft.qixueguan;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;
import android.view.Display;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.widget.EditText;
import android.widget.LinearLayout.LayoutParams;
import android.widget.RelativeLayout;

import com.comdosoft.qixueguan.tool.QiXueGuanTool;
import com.comdosoft.qixueguan.tool.Urlinterface;

public class RegistActivity extends Activity implements Urlinterface {

	private EditText email;
	private EditText pwd;
	private EditText pwds;
	private EditText name;
	public ProgressDialog prodialog;
	public Intent intent = new Intent();

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		// 去掉Activity上面的状态栏
		setContentView(R.layout.regist);
		email = (EditText) findViewById(R.id.email);
		pwd = (EditText) findViewById(R.id.pwd);
		pwds = (EditText) findViewById(R.id.pwds);
		name = (EditText) findViewById(R.id.name);
		
		Display display = this.getWindowManager().getDefaultDisplay();
		int width = display.getWidth();
		int height = display.getHeight();
		RelativeLayout restitle = (RelativeLayout)findViewById(R.id.restitle);
<<<<<<< HEAD
		LayoutParams titlelp = new LayoutParams(width, height/10*2);
=======
		LayoutParams titlelp = new LayoutParams(width, height/10);
>>>>>>> be3859dc3d50513da46878871b14cf993d648647
		restitle.setLayoutParams(titlelp);
		
		pwds.setOnFocusChangeListener(new View.OnFocusChangeListener() {
			public void onFocusChange(View v, boolean hasFocus) {
				if (pwds.hasFocus() == false) {
					if (!(pwd.getText().toString().equals(pwds.getText()
							.toString()))) {
						Builder builder = new AlertDialog.Builder(
								RegistActivity.this);
						builder.setTitle("错误");
						builder.setMessage("两次密码不一致！");
						builder.setPositiveButton("确定",
								new DialogInterface.OnClickListener() {
									public void onClick(DialogInterface dialog,
											int which) {
										pwd.setText("");
										pwds.setText("");
										pwd.requestFocus();
									}
								});
						builder.show();
					}
				}
			}
		});
	}

	class Regist implements Runnable {
		public void run() {
			Looper.prepare();
			Message mes = new Message();
			Map<String, String> map = new HashMap<String, String>();
			map.put("email", email.getText().toString());
			map.put("name", name.getText().toString());
			map.put("password", pwd.getText().toString());
			String json = QiXueGuanTool.doPost(REGIST_URL, map);
			Log.i(tag, json);
			if (json.equals("success")) {
				mes.what = 1;
			} else {
				mes.what = 2;
			}
			handler.sendMessage(mes);
			Looper.loop();
		}
	}

	private Handler handler = new Handler() {
		public void handleMessage(android.os.Message msg) {
			prodialog.dismiss();
			Builder builder = new Builder(RegistActivity.this);
			builder.setTitle("提示");
			switch (msg.what) {
			case 1:
				builder.setMessage("注册成功");
				builder.setPositiveButton("确定",
						new DialogInterface.OnClickListener() {
							public void onClick(DialogInterface dialog,
									int which) {
								RegistActivity.this.finish();
								intent.setClass(RegistActivity.this,
										LoginActivity.class);
								startActivity(intent);
							}
						});
				builder.show();
				break;
			case 2:
				builder.setMessage("注册失败,该Email已存在！");
				builder.setPositiveButton("确定",
						new DialogInterface.OnClickListener() {
							public void onClick(DialogInterface dialog,
									int which) {
								email.setText("");
								pwd.setText("");
								pwds.setText("");
								name.setText("");
							}
						});
				builder.show();
				break;
			case 3:
				break;
			}
		};
	};

	public void onclick(View v) {
		Builder builder = new AlertDialog.Builder(RegistActivity.this);
		builder.setTitle("提示");
		switch (v.getId()) {
		case R.id.regist:
			if (email.getText().toString().equals("")) {
				builder.setMessage("Email不可为空");
				builder.setPositiveButton("确定", null);
				builder.show();
			} else if (!isEmail(email.getText().toString())) {
				email.setText("");
				builder.setMessage("邮箱格式不正确");
				builder.setPositiveButton("确定", null);
				builder.show();
			} else if (pwd.getText().toString().equals("")) {
				builder.setMessage("密码不可为空");
				builder.setPositiveButton("确定", null);
				builder.show();
			} else if (name.getText().toString().equals("")) {
				builder.setMessage("昵称不可为空");
				builder.setPositiveButton("确定", null);
				builder.show();
			} else {
				prodialog = new ProgressDialog(RegistActivity.this);
				prodialog.setMessage("提交数据中，请稍后..");
				prodialog.show();
				Thread thread = new Thread(new Regist());
				thread.start();
			}
			break;
		case R.id.btnreturn:
			RegistActivity.this.finish();
			intent.setClass(RegistActivity.this, LoginActivity.class);
			startActivity(intent);
			break;
		}
	}

	public static boolean isEmail(String email) {
		String str = "^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\.][A-Za-z]{2,3}([\\.][A-Za-z]{2})?$";
		Pattern p = Pattern.compile(str);
		Matcher m = p.matcher(email);
		return m.matches();
	}

	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			RegistActivity.this.finish();
			intent.setClass(RegistActivity.this, LoginActivity.class);
			startActivity(intent);
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}
}