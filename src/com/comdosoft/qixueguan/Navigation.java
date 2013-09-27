package com.comdosoft.qixueguan;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Parcelable;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.TextView;

import com.qixueguan.dodowaterfall.LockableHorizontalScrollView;

public class Navigation extends Activity {

	public TextView left;
	public TextView right;
	public ViewPager pager;
	private ImagePagerAdapter adapter;
	public int[] image = new int[3];
	private LockableHorizontalScrollView scrollView;
	private LinearLayout cateMenu;
	private LinearLayout closeMenuLinear;
	private View closeMenu;
	private int screenWidth;
	private Button wide_btn;
	private boolean isOpen = false;// 右侧menu是否打开的标识
	private final Handler mHandler = new Handler();
	Handler initial = new Handler();

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		// 去掉Activity上面的状态栏
		setContentView(R.layout.navigation);

		Display display = this.getWindowManager().getDefaultDisplay();
		int width = display.getWidth();
		int height = display.getHeight();
		int pagerPosition = 0;
		if (savedInstanceState != null) {
			pagerPosition = savedInstanceState.getInt("STATE_POSITION");
		}
		adapter = new ImagePagerAdapter(image);
		pager = (ViewPager) findViewById(R.id.pager);
		LayoutParams lp = new LayoutParams(width/100*80, height/100*70);
		pager.setLayoutParams(lp);
		pager.setAdapter(adapter);
		pager.setCurrentItem(pagerPosition);

		TextView left = (TextView)findViewById(R.id.left);
		left.setWidth(width/10);
		TextView right = (TextView)findViewById(R.id.right);
		right.setWidth(width/10);
		initalize();
	}

	// 初始化侧边栏参数
	private void initalize() {
		wide_btn = (Button) findViewById(R.id.wide_btn);
		scrollView = (LockableHorizontalScrollView) this
				.findViewById(R.id.ScrollView);
		cateMenu = (LinearLayout) this.findViewById(R.id.cate_menu);
		closeMenuLinear = (LinearLayout) this
				.findViewById(R.id.close_menu_linear);
		closeMenu = this.findViewById(R.id.close_menu);
		DisplayMetrics metric = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(metric);
		// 窗口的宽度
		screenWidth = metric.widthPixels;
		LinearLayout left = (LinearLayout) findViewById(R.id.n_left);
		LayoutParams leftlp = new LayoutParams(screenWidth,
				LayoutParams.FILL_PARENT);
		left.setLayoutParams(leftlp);
		LayoutParams menuparams = (LayoutParams) cateMenu.getLayoutParams();
		menuparams.width = screenWidth / 10 * 4;
		cateMenu.setLayoutParams(menuparams);
		// 创建一个ScrollView对象
		LayoutParams scroll_params = (LayoutParams) scrollView
				.getLayoutParams();
		scroll_params.width = screenWidth;
		scrollView.setLayoutParams(scroll_params);
		LayoutParams closeparams = (LayoutParams) closeMenu.getLayoutParams();
		closeparams.width = screenWidth / 10 * 4;
		closeMenu.setLayoutParams(closeparams);

		wide_btn.setOnClickListener(mClickListener);// 添加点击事件监听
		setListener();
	}

	private TextView.OnClickListener mClickListener = new TextView.OnClickListener() {
		public void onClick(View v) {
			mHandler.post(mScrollToButton);// 传递一个消息进行滚动
		}
	};

	private void setListener() {
		closeMenu.setOnClickListener(new OnClickListener() {

			public void onClick(View arg0) {
				mHandler.post(mScrollToButton);// 传递一个消息进行滚动
			}
		});
	}

	private Runnable mScrollToButton = new Runnable() {
		public void run() {
			if (!isOpen) {
				scrollView.smoothScrollTo(screenWidth / 10 * 4, 0);// 改变滚动条的位置
				isOpen = true;
				closeMenuLinear.setVisibility(View.VISIBLE);
			} else {
				scrollView.smoothScrollTo(0, 0);
				isOpen = false;
				closeMenuLinear.setVisibility(View.GONE);
			}
		}
	};

	public void onSaveInstanceState(Bundle outState) {
		outState.putInt("STATE_POSITION", pager.getCurrentItem());
	}

	private class ImagePagerAdapter extends PagerAdapter {

		private int[] image;
		private LayoutInflater inflater;

		ImagePagerAdapter(int[] image) {
			this.image = image;
			inflater = getLayoutInflater();
		}

		@Override
		public void finishUpdate(View container) {
		}

		@Override
		public int getCount() {
			return image.length;
		}

		@Override
		public boolean isViewFromObject(View view, Object object) {
			return view.equals(object);
		}

		@Override
		public void restoreState(Parcelable state, ClassLoader loader) {
		}

		@Override
		public Parcelable saveState() {
			return null;
		}

		@Override
		public void startUpdate(View container) {
		}

		@Override
		public void destroyItem(View arg0, int arg1, Object arg2) {
			((ViewPager) arg0).removeView((View) arg2);

		}

		public int getItemPosition(Object object) {
			return POSITION_NONE;
		}

		public Object instantiateItem(View arg0, int arg1) {
			Log.i("linshi", "-----------");
			View nl = inflater.inflate(R.layout.navigation_layout,
					(ViewGroup) arg0, false);
			LinearLayout layout = (LinearLayout) nl.findViewById(R.id.layout);
//			layout.setBackgroundResource(image[arg1]);
			LinearLayout everday = (LinearLayout) nl
					.findViewById(R.id.everyday);
			switch (arg1) {
			case 0:
				Log.i("linshi", "1");
				everday.setVisibility(View.GONE);
				break;
			case 1:
				Log.i("linshi", "2");
				everday.setVisibility(View.GONE);
				break;
			}
			((ViewPager) arg0).addView(nl, 0);
			return nl;
		}
	}
}
