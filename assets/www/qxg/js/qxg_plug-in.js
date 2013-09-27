$(function(){
    //调用加载题目的方法，实现进入题目之后自动家
    $("#question_content").loading_title();
    $(document).on('click',".btn_div input[id='loaddata']",function(){
        var button = $(this);
        if(button.val()=="核对"){
            if(param_content==null){
                alert("请先填写答案");
            }else{
                if(param_content==course.questions[questions_index].branch_questions[0].answer){
                    alert("答对了");
                    questions_index++;  //答题之后题目下标加一
                    param_content = null; //并且清除掉所填入的答案
                }
                else{
                    alert("答错了");
                    questions_index++;
                    param_content = null;
                //调用扣血的方法
                }
                button.val("下一题");
                param_content = null;
            }
        }else{
            button.val("核对");
            $("#question_content").loading_title();
            var type = course.questions[questions_index].question_types;   //获取题目类型
        }
        if(questions_index==course.question_total){
    //调用提交的方法
    }
    })
});

//需要被调用到的jquery方法写在这里面
(function($){
    //通过获取json中的问题类型加载不同题型
    $.fn.loading_title = function(){
        var type = course.questions[questions_index].question_types;   //获取题目类型
        $("#question_content").html(course.questions[questions_index].content);          //显示题目
        var options = course.questions[questions_index].branch_questions[0].options;   //拼凑答案选项
        var a = options.split("||");  //分割选项。
        var html='';  //定义题目怎么显示
        switch(type){
            case '1':   //单选题
                $("#question_content").html(course.questions[questions_index].content);          //显示题目
                $("#question_content").options_sort(a);//打乱顺序
                $.each(a, function( index, value ) {
                    html += '<li>' + value + '</li>';
                });
                //显示答案选项
                $("#question_option").html(html);
                //调用选择单选方法
                $("#question_content").choose_options_one();
                break;
            case '2':  //多选题
                $("#question_content").html(course.questions[questions_index].content);          //显示题目
                $("#question_content").options_sort(a);
                $.each(a, function( index, value ) {
                    html += '<li>' + value + '</li>';
                });
                //显示答案选项
                $("#question_option").html(html);
                //调用选择多选方法
                $("#question_content").choose_options_maney();
                break;
            case '3': //图片题加载
                $("#question_content").html(course.questions[questions_index].content);          //显示题目
                $("#question_content").options_sort(a);
                $.each(a, function( index, value ) {
                    html += '<li><div><img src="' + value +
                    '"onload="if(this.width>this.height){if(this.width!=300)this.width=300; }else{if(this.height!=300) this.height=300;}"/><input name="photos" type="checkbox" value="'
                    +value+'" /></div></li>';
                });
                $("#question_option").html(html);
                $("#question_content").choose_options_photos();
                break;
            case '4': //连线题
                $("#question_content").html(course.questions[questions_index].content);          //显示题目
                var arr1 = new Array();//取数组
                var arr2 = new Array();//取数组
                var arr1_left = new Array;// 传值数组
                $.each(a, function( index, value ){
                    arr1[index] = value.split(";=;")[0];
                    arr2[index] = value.split(";=;")[1];
                    arr1_left[index] = value.split(";=;")[0];
                });
                $("#question_content").options_sort(arr1);
                $("#question_content").options_sort(arr2);
                $.each(arr1,function(index1,value1){
                    var value1_html = $("#question_content").filter_content(value1);
                    html += '<div class="ligature_two"><div class="ligature_option_left" value1="' + value1 + '">'+value1_html+'</div>';
                    $.each(arr2,function(index2,value2){
                        if(index1==index2){
                            var value2_html = $("#question_content").filter_content(value2);
                            html +='<div class="hide_options"></div><br/><br/><br/><div class="ligature_option_right" index="' + index2 + '" value2="' + value2 +'">'+value2_html+'</div></div>';
                        }
                    });
                });
                $("#question_option").html(html);
                $("#question_option").connection_effect(arr1_left);
                break;
            case '5': //填空题
                $("#question_content").html(course.questions[questions_index].content);  //显示题目
                $("#question_content").html($("#question_content").html().replace(/__text__/g,"<div class='vacancies_blank'>__________<div>"));
                $("#question_option").options_sort(a);
                $.each(a,function(index,value){
                    $("#question_content").filter_content(value);
                    html += '<div class="fillin_blank_option">'+ value +'</div>';
                })
                $("#question_option").html(html);
                break;
            case '6':
                break;
            case '7':
                break;
            default:
                break;
        }
    };

    //单项选择题。选择答案，背景颜色改变，并把答案放进param_content变量中。
    $.fn.choose_options_one = function(){
        //选择答案,把选择的答案保存到全局变量中去。
        $("#question_option li").click(function(){
            param_content = $(this).text();
            $("#question_option").find("li").css({
                color: "#000000",
                background: "white"
            })
            $(this).css({
                color: "#ff0011",
                background: "blue"
            });
        })
    };
    //多选题，选择答案
    $.fn.choose_options_maney = function(){
        $("#question_option li").click(function(){
            var options = course.questions[questions_index].branch_questions[0].options;
            var this_a = options.split("||");
            var option_class = $(this).attr('class');
            if(option_class=="choice"){
                $(this).removeAttr("class");
                $(this).css({
                    color: "#000000",
                    background: "white"
                });
            }else{
                $(this).addClass("choice");
                $(this).css({
                    color: "#ff0011",
                    background: "blue"
                });
            }

            //获取每个li标签下的值  根据获得json数据中的顺序，循环遍历找出被选中的选项。
            param_content = null
            $.each(this_a,function(index,value){
                if (param_content == null){
                    $('.choice').map(function(){
                        if(value == $(this).text()){
                            param_content =  value;
                        }
                    });
                }else{
                    $('.choice').map(function(){
                        if(value == $(this).text()){
                            param_content += '||' + value;
                        }
                    });
                }
            })
        //            alert(param_content);
        //            不打乱顺序可以直接拼凑
        //            param_content = $('.choice').map(function(){
        //                return $(this).text()
        //            }).get().join('||')
        });
    }

    //图片选择题 点击一张图片把所有图片设置成未选中，同时再把这张图片设置成选中。
    $.fn.choose_options_photos = function(){
        alert(1111)
        $("#question_option img").click(function(){
            if($(this).parents("li").find("input").attr("checked") == "checked"){

            }else{
                $("#question_option"). find("input").removeAttr("checked");
                $(this).parents("li").find("input").click();
                param_content = $(this).parents("li").find("input").val();
                alert(param_content);
            }
        })
    };
    //选项随机排序
    $.fn.options_sort = function(option){
        return option.sort(function () {
            return Math.random()>0.5?1:-1;
        });
    };
    //判断文本中是否存在文件
    $.fn.filter_content = function(text){
        var html_text = "";
        if(text.indexOf('<file>') >= 0){
            var arr_text = text.split("<file>");
            $.each(arr_text,function(index,value){
                if(index%2 == 1){
                    var file_text = value.split(".");
                    if(file_text[0]=="mp3"){
                        html_text += '<audio src="' + value + '"></audio>';
                    }else{
                        html_text += '<img src="' + value + '"></img>';
                    }
                }
                else{
                    html_text += value;
                }
            })
        }else{
            html_text = text;
        }
        return html_text;
    };
    // 连线效果
    $.fn.connection_effect = function(arr1_left,arr2_right){
        var  textorhtml="";
        //点击左边判断
        $(".ligature_option_left").click(function(){
            //判断如果在右边有被选中的内容，则点击左边两边匹配
            var has_selected = $("div[class='ligature_option_right'][id='selected_option']");
            var index = has_selected.attr("index");
            var value2 = has_selected.attr("value2");
            if($(this).next().attr("index")==undefined){
                if(has_selected.attr("id")==undefined){
                    $(".ligature_option_left").removeAttr("id");
                    $(this).attr("id","selected_option");
                }else{         //如果右边没被选中则只判断自己这边
                    //把被匹配的内容隐藏掉
                    has_selected.css({
                        display: "none"
                    });
                    textorhtml = has_selected.html();
                    $(this).next().attr("index",index);
                    $(this).next().attr("value2",value2);
                    $(this).next().html(textorhtml);
                    has_selected.removeAttr("id");
                }
            }else{
                index = $(this).next().attr("index");
                $("div[class='ligature_option_right'][index="+ index +"]").css({
                    display: "block"
                });
                $(this).next().removeAttr("index");
                $(this).next().removeAttr("value2");
                $(this).next().html("");
            }
            // 把已选择的集合放进param_content中var
            var lianxian;
            $.each(arr1_left,function(index,value){
                //                var html_left = $("div[class='ligature_option_left']:contains('" + value +"')").html();
                lianxian = $("div[class='ligature_option_left'][value1='"+ value +"']");
                if(index == 0){
                    param_content = lianxian.attr("value1") + ";=;" + lianxian.next().attr("value2");
                }else{
                    param_content += "||" + lianxian.attr("value1") + ";=;" + lianxian.next().attr("value2");
                }
            })
        });
        
        //点击隐藏部分进行判断
        $(".hide_options").click(function(){
            if($(this).attr("index")==undefined){
                alert(111111111);
            }else{
                var index = $(this).attr("index");
                $("div[class='ligature_option_right'][index="+ index +"]").css({
                    display: "block"
                });
                $(this).removeAttr("index");
                $(this).removeAttr("value2");
                $(this).html("");
            }
        })
        //点击右边进行判断
        $(".ligature_option_right").click(function(){
            var index = $(this).attr("index");
            var value2 = $(this).attr("value2");
            var has_selected = $("div[class='ligature_option_left'][id='selected_option']");
            if(has_selected.attr("id")==undefined){
                $(".ligature_option_right").removeAttr("id");
                $(this).attr("id","selected_option");
            }else{
                $(this).css({
                    display: "none"
                });
                textorhtml = $(this).html();
                has_selected.next(".hide_options").attr("index",index);
                has_selected.next(".hide_options").attr("value2",value2);
                has_selected.next(".hide_options").html(textorhtml);
                has_selected.removeAttr("id");
            }

            var lianxian;
            $.each(arr1_left,function(index,value){
                //                var html_left = $("div[class='ligature_option_left']:contains('" + value +"')").html();
                lianxian = $("div[class='ligature_option_left'][value1='"+ value +"']");
                if(index == 0){
                    param_content = lianxian.attr("value1") + ";=;" + lianxian.next().attr("value2");
                }else{
                    param_content += "||" + lianxian.attr("value1") + ";=;" + lianxian.next().attr("value2");
                }
            })
        })
    };
//    $(this).parent("div").find(".ligature_option_right").addClass("hide_content");
//多选题，选择答案
//    $.fn.choose_options_maney = function(){
//        //选择答案,把选择的答案保存到全局变量中去。
//        $("#question_option li").click(function(){
//            if(param_content==null){
//                param_content=$(this).text();
//                $(this).css({
//                    color: "#ff0011",
//                    background: "blue"
//                });
//                var attrs = $(this).attributes;
//                alert(attrs);
//            }else{
//                var option = param_content.split("||");
//                var existornot = $.inArray($(this).text(), option);  //判断当前选择的选项是不是已经存在变量中
//                if(existornot>=0){
//                    alert(1111111111111);
//                    param_content = null;
//                    $(this).css({
//                        color: "#000000",
//                        background: "white"
//                    })
//                    alert(222222);
//                    $.each(option, function(index,value){
//                        if(value!=$(this).text()){
//                            if(param_content!=null){
//                                param_content +="||"+ value ;
//                            }else{
//                                param_content=value;
//                            }
//                        }
//                    })
//                    alert(param_content);
//                }else{
//                    $(this).css({
//                        color: "#ff0011",
//                        background: "blue"
//                    })
//                    alert(33333);
//                    param_content = param_content+"||"+$(this).text();
//                }
//            }
//        })
//    };
})(jQuery)