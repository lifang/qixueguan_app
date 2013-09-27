package com.comdosoft.qixueguan.tool;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import android.util.Log;

public class QiXueGuanTool implements Urlinterface {

	private static int connectTimeOut = 500000;
	private static int readTimeOut = 100000;
	private static String requestEncoding = "UTF-8";

	public static String doPost(String reqUrl, Map parameters) {
		String tempLine = "";
		HttpURLConnection url_con = null;
		String responseContent = null;
		try {
			StringBuffer params = new StringBuffer();
			for (Iterator iter = parameters.entrySet().iterator(); iter
					.hasNext();) {
				Entry element = (Entry) iter.next();
				params.append(element.getKey().toString());
				params.append("=");
				params.append(URLEncoder.encode(element.getValue().toString(),
						QiXueGuanTool.requestEncoding));
				params.append("&");
			}

			if (params.length() > 0) {
				params = params.deleteCharAt(params.length() - 1);
			}

			URL url = new URL(reqUrl);
			url_con = (HttpURLConnection) url.openConnection();
			url_con.setRequestMethod("POST");
			Log.i("linshi", url.toString());
			System.setProperty("sun.net.client.defaultConnectTimeout",
					String.valueOf(QiXueGuanTool.connectTimeOut));// ����λ�����룩jdk1.4�������,���ӳ�ʱ
			System.setProperty("sun.net.client.defaultReadTimeout",
					String.valueOf(QiXueGuanTool.readTimeOut)); // ����λ�����룩jdk1.4�������,��������ʱ
			// url_con.setConnectTimeout(5000);//����λ�����룩jdk
			// 1.5�������,���ӳ�ʱ
			// url_con.setReadTimeout(5000);//����λ�����룩jdk 1.5�������,��������ʱ
			url_con.setDoOutput(true);
			byte[] b = params.toString().getBytes();
			url_con.getOutputStream().write(b, 0, b.length);
			url_con.getOutputStream().flush();
			url_con.getOutputStream().close();

			InputStream in = url_con.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(in,
					"GBK"));
			tempLine = rd.readLine();
			rd.close();
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (url_con != null) {
				url_con.disconnect();
			}
		}
		return tempLine;
	}

	/**
	 * @see com.hengpeng.common.web.HttpRequestProxy#connectTimeOut
	 */
	public static int getConnectTimeOut() {
		return QiXueGuanTool.connectTimeOut;
	}

	/**
	 * @see com.hengpeng.common.web.HttpRequestProxy#readTimeOut
	 */
	public static int getReadTimeOut() {
		return QiXueGuanTool.readTimeOut;
	}

	/**
	 * @see com.hengpeng.common.web.HttpRequestProxy#requestEncoding
	 */
	public static String getRequestEncoding() {
		return requestEncoding;
	}

	/**
	 * @param connectTimeOut
	 * @see com.hengpeng.common.web.HttpRequestProxy#connectTimeOut
	 */
	public static void setConnectTimeOut(int connectTimeOut) {
		QiXueGuanTool.connectTimeOut = connectTimeOut;
	}

	/**
	 * @param readTimeOut
	 * @see com.hengpeng.common.web.HttpRequestProxy#readTimeOut
	 */
	public static void setReadTimeOut(int readTimeOut) {
		QiXueGuanTool.readTimeOut = readTimeOut;
	}

	/**
	 * @param requestEncoding
	 * @see com.hengpeng.common.web.HttpRequestProxy#requestEncoding
	 */
	public static void setRequestEncoding(String requestEncoding) {
		QiXueGuanTool.requestEncoding = requestEncoding;
	}

	public static boolean isNull(ArrayList<ArrayList<String>> data) {
		for (int i = 0; i < data.size(); i++) {
			if (data.get(i).get(2).equals("")) {
				return false;
			}
		}
		return true;
	}
}
