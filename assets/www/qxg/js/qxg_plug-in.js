$(document).ready(function(){
    //    jQuery.noConflict();
    //定义变量（值从 安卓端获取）
    //    daily_tasks = true;
    //如果是每日任务则请求后台获取json
    if(daily_tasks){
        //获取每日任务参数
        $.ajax({
            cache: false,
            async: false,
            crossDomain: true,
            type: 'get',
            url:"http://192.168.0.112:3000/api/user_manages/everyday_tasks",
            data:{
                uid : 3,
                course_id : 1
            },
            dataType:'json',
            success:function(data){
                if(data.status==1){
                    alert("用户暂无任务，请先完成更多的关卡挑战");
                }else if(data.status==0){
                    alert("已获取到json");
                    course = data;
                }
            }
        });
        

    //        course = {
    //            "course_id":1,
    //            "chapter_id":2,
    //            "round_id":3,
    //            "question_count":1,
    //            "blood":4,
    //            "points_score":100,
    //            "specified_time":10000,
    //            "questions":[
    //
    //            {
    //                "question_id":2,
    //                "content":"2多选题，此题可以选择多个答案<file>English.wav</file>",
    //                "question_types":1,
    //                "branch_questions":[{
    //                    "branch_content":"鸟毛",
    //                    "options":"one;||;two;||;three",
    //                    "answer":"one;||;two"
    //                },
    //
    //                {
    //                    "branch_content":"鸟蛋",
    //                    "options":"one;||;two;||;three",
    //                    "answer":"one;||;two"
    //                }],
    //                "card_id":1,
    //                "card_name":"7听力生词",
    //                "description":"knowledge n. 知识、学识",
    //                "card_types":"词汇"
    //            }]
    //        }
    }

    //    //先对course  乱序
    //    var course_questions = course.questions;
    //    $(".question_content").options_sort(course_questions);//打乱顺序
    //加载时间
    $(".loading_props").pro_showorhide();

    $(".loading_time").loading_time();
    existing_blood = course.blood;
    //加载血量
    $("#question_content").load_control_blood();
    //加载道具
    $(".loading_props").loading_props();
    //加载题目
    $("#question_content").loading_title();
    //加载收藏知识卡片方法
    $("#collection_knowledge_cards").collection_knowledge_cards();
    $(document).on('click',"input[id='loaddata']",function(){
        var type = course.questions[questions_index].question_types;   //获取题目类型
        var button = $(this);
        switch(type){
            case 0:
            case 1:
            case 3:
            case 4:
            case 5:
            case 7:
            case 8:
                if(button.val()=="核对")
                {
                    if(param_content==null){
                        alert("请先填写答案");
                    }else{
                        if(param_content==course.questions[questions_index].branch_questions[0].answer){
                            alert("答对了");
                            questions_index++;  //答题之后题目下标加一
                        }
                        else{
                            alert("答错了");
                            //加载收集错题方法
                            //                            $("#question_content").collecting_wrong_questions();
                            questions_index++;
                            existing_blood--;
                            if(existing_blood<=0){
                                alert("没血了");
                            //调用andriod方法结束答题
                            }
                            $(".progressbar").load_control_blood();
                        //调用扣血的方法
                        }
                        button.val("下一题");
                        param_content = null;
                    }
                }else
                {
                    button.val("核对");
                    $("#question_content").loading_title();
                    frequency_use_props = 0;
                }
                if(questions_index==course.question_count-1){
                    //调用提交数据到andriod方法
                    $(".question_content").complete_submission_data();
                }
                break;
            case 2:
                if(button.val()=="核对"){
                    if(param_content==null){
                        alert("请先填写答案");
                    }else{
                        var option_array = param_content.split(";=;");
                        var trueorfalse = true;
                        $.each(option_array, function(index){
                            if(option_array[index] != course.questions[questions_index].branch_questions[index].answer){
                                trueorfalse = false;
                                return false;
                            }
                        });
                        if(trueorfalse == true){
                            alert("答对了");
                            questions_index++;  //答题之后题目下标加一
                        }else{
                            alert("答错了");
                            //加载收集错题方法
                            //                            $("#question_content").collecting_wrong_questions();
                            questions_index++;
                            existing_blood--;
                            if(existing_blood<=0){
                                alert("没血了");
                            //调用andriod方法结束答题
                            }
                            $(".progressbar").load_control_blood();
                        }
                        button.val("下一题");
                        param_content = null;
                    }
                }else{
                    button.val("核对");
                    $("#question_content").loading_title();
                    frequency_use_props = 0;
                }
                if(questions_index==course.question_count){
                    //调用提交的方法
                    //调用提交数据到andriod方法
                    $(".question_content").complete_submission_data();
                }
                break;
            case 6:
                if(button.val()=="核对"){
                    if(arr_complex==""){
                        alert("请先填写答案");
                    }else{
                        var trueorfalse = true;
                        var arr_anwser = course.questions[questions_index].branch_questions;
                        $.each(arr_anwser,function(index){
                            if(arr_anwser[index].answer!=arr_complex[index]){
                                trueorfalse = false;
                                return false;
                            }
                        })
                        if(trueorfalse == true){
                            alert("答对了");
                            questions_index++;  //答题之后题目下标加一
                        }else{
                            alert("答错了");
                            //加载收集错题方法
                            //                            $("#question_content").collecting_wrong_questions();
                            questions_index++;
                            existing_blood--;
                            if(existing_blood<=0){
                                alert("没血了");
                            //调用andriod方法结束答题
                            }
                            $(".progressbar").load_control_blood();
                        }
                        button.val("下一题");
                        arr_complex = null;
                    }
                }else{
                    button.val("核对");
                    $("#question_content").loading_title();
                    frequency_use_props = 0;
                }
                if(questions_index==course.question_count){
                    //调用提交的方法
                    //调用提交数据到andriod方法
                    $(".question_content").complete_submission_data();
                }
                break;
            default:
                break;
        }
    })
});

//需要被调用到的jquery方法写在这里面
(function($){
    //通过获取json中的问题类型加载不同题型
    $.fn.loading_title = function(){
        var type = course.questions[questions_index].question_types;   //获取题目类型
        var questions_content = course.questions[questions_index].content;
        var questions_contents =  $("#question_option").filter_question(questions_content);
        $("#question_content").html(questions_contents);          //显示题目
        var options = course.questions[questions_index].branch_questions[0].options;   //拼凑答案选项
        var a_optons_split = options.split(";||;");  //分割选项。
        var html='';  //定义题目怎么显示
        //显示道具
        $(".loading_props").loading_props(type);
        //显示每一题的知识卡片
        $(".content_knowledge_cards").html(course.questions[questions_index].card_name);
        $("#card_of_knowledge").show_knowledge_card();

        switch(type){
            case 0:   //单选题
                $("#question_content").options_sort(a_optons_split);//打乱顺序
                $.each(a_optons_split, function( index, value ) {
                    var value1 = $("#question_option").filter_content(value);
                    if(value1.indexOf('.mp3') >= 0){
                        html +='<div class="listen_opt cf"><div class="tw_txt"><div class="tw_txt_check"><div class="tw_txt_check_pot"></div><input class="value_li_select" value="'+ value +'"/></div></div>'
                        + value1 +'</div>';
                    }else if(value1.indexOf('.jpg') >= 0){
                        html +='<div class="pic_picker">'+ value1 +'<div class="tw_txt_check"><div class="tw_txt_check_pot"></div></div><input class="value_li_select"value="'
                        + value +'"/></div>';
                    }else{
                        html +='<div class="tw_txt"><input class="value_li_select"value="'
                        + value +'"/><div class="tw_txt_check"><div class="tw_txt_check_pot"></div></div><span>'+ value1 +'</span></div>'
                    }
                });
                //显示答案选项
                $("#question_option").html(html);
                //调用选择单选方法
                $("#question_content").choose_options_one();
                break;
            case 1:  //多选题
                $("#question_content").options_sort(a_optons_split);
                $.each(a_optons_split, function( index, value ) {
                    var value1 = $("#question_option").filter_content(value);
                    if(value1.indexOf('.mp3') >= 0){
                        html +='<div class="listen_opt cf"><div class="tw_txt"><div class="tw_txt_check"><div class="tw_txt_check_pot"></div>'
                        + value1 +'<input class="value_li_select" value="'+ value +'"/></div></div>';
                    }else if(value1.indexOf('.jpg') >= 0){
                        html +='<div class="pic_picker">'+ value1 +'<div class="tw_txt_check"><div class="tw_txt_check_pot"></div></div><input class="value_li_select"value="'
                        + value +'"/></div>';
                    }else{
                        html +='<div class="tw_txt"><input class="value_li_select"value="'
                        + value +'"/><div class="tw_txt_check"><div class="tw_txt_check_pot"></div></div><span>'+ value1 +'</span></div>'
                    }
                });
                //显示答案选项
                $("#question_option").html(html);
                //调用选择多选方法
                $("#question_content").choose_options_maney();
                break;
    

            case 4: //连线题
                var arr1 = new Array();//取数组
                var arr2 = new Array();//取数组
                var arr1_left = new Array;// 传值数组
                $.each(a_optons_split, function( index, value ){
                    arr1[index] = value.split(";=;")[0];
                    arr2[index] = value.split(";=;")[1];
                    arr1_left[index] = value.split(";=;")[0];
                });
                $("#question_content").options_sort(arr1);
                $("#question_content").options_sort(arr2);
                $.each(arr1,function(index1,value1){
                    var value1_html = $("#question_content").filter_content(value1);
                    html += '<div class="qst_option cf"><div class="ligature_option_left" st="lx_img" value1="' + value1 + '">'
                    +value1_html+'<div class="hide_options"></div><div class="lx_img_bor"></div><div class="lx_img_txt"></div></div>';
                    $.each(arr2,function(index2,value2){
                        if(index1==index2){
                            var value2_html = $("#question_content").filter_content(value2);
                            if(value2_html.indexOf("<img")>=0){
                                html += '<div is_img="shi" class="ligature_option_right" st="lx_img" value2="' + value2 + '">'
                                +value2_html+'<div class="lx_img_bor"></div></div></div>';
                            }else{
                                html +='<div class="ligature_option_right" st="lx_txt" value2="'+ value2 +'">'
                                + value2_html +'</div></div>'
                            }
                        }
                    });
                });
                $("#question_option").html(html);
                $("#question_option").connection_effect(arr1_left);

                break;
            case 7: //拖拽提
                $("#question_content").html($("#question_content").html().replace(/\[\[text\]\]/g,'<input class="tk_txt" type="text"/>'));
                $("#question_option").options_sort(a_optons_split);
                $.each(a_optons_split,function(index,value){
                    $("#question_content").filter_content(value);
                    html +='<div class="ty_box"><input class="ty_block"value="'+ value +'"/></div>'
                });
                $("#question_option").html(html);
                $("#question_option").drag_mention();
                break;
            case 3: //排序题
                $("#question_option").options_sort(a_optons_split);
                html = '<button class="revert_sorting">还原</button>'
                var html_black='';
                $.each(a_optons_split,function(index){
                    html_black += '<div class="sort_block" index_blanks="'+index+'">__________</div>';
                })
                html +='<div class="sort_box">'+ html_black +'<hr /></div>'
                $.each(a_optons_split,function(index,value){
                    $("#question_content").filter_content(value);
                    html += '<div class="fillin_blank_option sort_block" index_blanks="'+index+'">'+ value +'</div>';
                });
                $("#question_option").html(html);
                $("#question_option").sequence_revert();
                break;
            case 5: //语音输入题
                html = '<div class="yy_icon"></div>';
                $("#question_option").html(html);
                break;
            case 2: // 完形填空s.mach(/\[\[text\]\]/)
                $("#question_content").html($("#question_content").html().replace(/\[\[text\]\]/g,"<div class='wxtk_box'><input class='tk_txt' type='text' /><div class='wxtk_opt_box'></div></div>"));
                $(".wxtk_opt_box").each(function(index){
                    options = course.questions[questions_index].branch_questions[index].options;
                    a_optons_split = options.split(";||;");
                    $("#question_content").options_sort(a_optons_split);//打乱顺序
                    html = '<span class="wxtk_opt_cor"></span>'
                    $.each(a_optons_split,function(index,value){
                        html += '<li class="wxtk_opt">'+ value +'</li>';
                    })
                    $(this).html(html);
                    html = "";
                });
                $("#question_option").html(html);
                $("#question_option").cloze_choice_option();
                break;
            case 8: //填空题
                $("#question_content").html($("#question_content").html().replace(/\[\[text\]\]/g,
                    '<input class="tk_txt" type="text" />'));
                $("#question_option").html(html);
                $("#question_content").fill_in_blanks();
                break;
            case 6://综合题
                var branch_questions = course.questions[questions_index].branch_questions;
                $.each(branch_questions,function(index,value){
                    //获取题型，获取小题答案数组
                    var branch_question_types = value.branch_question_types;
                    var branch_option = value.options.split(";||;");
                    var html_opton='';
                    $("#question_option").options_sort(branch_option);
                    //拼凑小题选项
                    $.each(branch_option,function(index,value){
                        var value1 = $("#question_option").filter_content(value);
                        if(value1.indexOf('.mp3') >= 0){
                            html_opton +='<div class="listen_opt cf"><div class="tw_txt"><div class="tw_txt_check"><div class="tw_txt_check_pot"></div>'
                            + value1 +'<input class="value_li_select" value="'+ value +'"/></div></div>';
                        }else if(value1.indexOf('.jpg') >= 0){
                            html_opton +='<div class="pic_picker">'+ value1 +'<div class="tw_txt_check"><div class="tw_txt_check_pot"></div></div><input class="value_li_select"value="'
                            + value +'"/></div>';
                        }else{
                            html_opton +='<div class="tw_txt"><input class="value_li_select"value="'
                            + value +'"/><div class="tw_txt_check"><div class="tw_txt_check_pot"></div></div><span>'+ value1 +'</span></div>'
                        }
                    });
                    switch(branch_question_types){
                        case 0: //单选
                            html += '<li class="multiple_choice" index_li="'+ index +'"><div class="question_branch_content">'
                            + value.branch_content +'</div><div class="branch_option_one">' + html_opton + '</div></li>';
                            break;
                        case 1: //多选
                            html += '<li class="multiple_choice" index_li="'+ index +'"><div class="question_branch_content">'
                            + value.branch_content +'</div><div class="branch_option_maney"><ul>' + html_opton + '<ul></div></li>';
                            break;
                        case 5: //语音
                            html += '<li class="multiple_choice" index_li="'+ index +'"><div class="question_branch_content">'
                            + value.branch_content +'</div><div class="yy_icon"></div></li>';
                            break;
                        case 8: //填空
                            html += '<li class="multiple_choice" index_li="'+ index +'"><div class="question_branch_content">'
                            + value.branch_content +'</div></li>';
                            break;
                        default:
                            break;
                    }
                });
                $("#question_option").html(html);
                $("#question_option").html($("#question_option").html().replace(/\[\[text\]\]/g,
                    '<input class="tk_txt" type="text" />'));
                $("#question_option").comprehensive_questions();
                break;
            default:
                break;
        }
    };
    //点击显示隐藏的道具功能
    $.fn.pro_showorhide = function(){
        $(".help").click(function(){
            $(this).find(".help_tit").toggle();
        });

        $(".help_box_1").click(function(){
            $(".help_box_2").show();
            $(".help_box_bg").show();
        });

        $(".help_box_bg").click(function(){
            $(".help_box_2").hide();
            $(".help_box_bg").hide();
        })
    }

    //数据提交到andriod端并关闭答题界面
    $.fn.complete_submission_data =  function(){
        //计算时间
        var  time_val = hour*3600 + minutes*60 + sec;  // 用时
        var question_count = course.question_count  //总题数
        var total_blood_volume = course.blood  //总血量
        // var existing_blood  现有血量
        var questions_correctly = question_count-(total_blood_volume-existing_blood); //正确题数
        var points_score = course.round_score//关卡分数
        var specified_time = course.round_time//规定时间
        var percent_time_correct = course.percent_time_correct;//正确率比例
        //(正确题数/总题数) * (正确率比列 * 关卡分数) + ((规定时间-用时+题数)/规定时间) * (时间比列 * 关卡分数)
        //调用提交的方法
        var json_return = {
            "daily_tasks":daily_tasks, //以此判断是不是每日任务
            "time_val":time_val,
            "question_count":question_count,
            "total_blood_volume":total_blood_volume,
            "questions_correctly":questions_correctly,
            "points_score":points_score,
            "specified_time":specified_time,
            "percent_time_correct":percent_time_correct
        }
        window.demo.test(json_return);
    }
    //综合题
    $.fn.comprehensive_questions =  function(){
        //单选选择题

        //文字选择题或者语音选择题
        $(".branch_option_one .tw_txt").click(function(){
            var index_li = $(this).parents("li").attr("index_li");
            $(".tw_txt").removeClass("current");
            $(this).addClass("current");
            arr_complex[index_li] = $(this).find("input").val();
        });
        // 图片选择题
        $(".branch_option_one.pic_picker").click(function(){
            var index_li = $(this).parents("li").attr("index_li");
            $(".pic_picker").removeClass("current");
            $(this).addClass("current");
            arr_complex[index_li] = $(this).find("input").val();
        });
        //多选题 文字或者语音
        $(".branch_option_maney .tw_txt").click(function(){
            //获取多选题的下标
            var index_li = $(this).parents("li").attr("index_li");
            //通过下标找到options
            var options = course.questions[questions_index].branch_questions[index_li].options;
            var this_a = options.split(";||;");
            if($(this).attr("class").indexOf("current")>=0){
                $(this).removeClass("current");
            }else{
                $(this).addClass("current");
            }
            arr_complex[index_li] = null;
            $.each(this_a,function(index,value){
                if (arr_complex[index_li] == null){
                    $('.current').map(function(){
                        if(value == $(this).find("input").val()){
                            arr_complex[index_li] =  value;
                        }
                    });
                }else{
                    $('.current').map(function(){
                        if(value == $(this).find("input").val()){
                            arr_complex[index_li] += ';||;' + value;
                        }
                    });
                }
            });
        });

        //   多选题 图片选择题
        $(".branch_option_maney .pic_picker").click(function(){
            //获取多选题的下标
            var index_li = $(this).parents("li").attr("index_li");
            //通过下标找到options
            var options = course.questions[questions_index].branch_questions[index_li].options;
            var this_a = options.split(";||;");
            if($(this).attr("class").indexOf("current")>=0){
                $(this).removeClass("current");
            }else{
                $(this).addClass("current");
            }
            param_content = null;
            $.each(this_a,function(index,value){
                if (param_content == null){
                    $('.current').map(function(){
                        if(value == $(this).find("input").val()){
                            param_content =  value;
                        }
                    });
                }else{
                    $('.current').map(function(){
                        if(value == $(this).find("input").val()){
                            param_content += ';||;' + value;
                        }
                    });
                }
            })
            alert(param_content);
        });

        $(".yy_icon").click(function(){
            var index_li = $(this).parents("li").attr("index_li");
            arr_complex[index_li] = "has";
            alert(arr_complex[index_li]);
        });
        // 填空题
        $(".tk_txt").blur(function(){
            var index_li = $(this).parents("li").attr("index_li");
            //获取到每个空格中所填的内容
            $(".tk_txt").each(function(index){
                if($(".tk_txt").index(index) == 0){
                    arr_complex[index_li] = $(this).val();
                }else{
                    arr_complex[index_li] += ';||;' + $(this).val();
                }
            });
        });
    }
    //填空题
    $.fn.fill_in_blanks = function(){
        $(".tk_txt").blur(function(){
            //获取到每个空格中所填的内容
            $(".tk_txt").each(function(index){
                if($(".tk_txt").index(index) == 0){
                    param_content = $(this).val();
                }else{
                    param_content += ';||;' + $(this).val();
                }
            });
        });
    };
    //收集错题
    $.fn.collecting_wrong_questions = function(){
        var course_id = course.course_id;
        var question_id = course.questions[questions_index].question_id;
        $.ajax({
            cache: false,
            async: false,
            crossDomain: true,
            type: 'post',
            url:"http://192.168.0.112:3000/api/chapters/add_wrong_question",
            data:{
                uid : 3,
                question_id : question_id,
                course_id : course_id
            },
            dataType:'text',
            success:function(data){
                if(data=="added"){
                    alert("错题已加载");
                }else if(data=="success"){
                    alert("错题加载成功");
                }else{
                    alert("错题加载失败");
                }
            }
        });
    }
    //获取道具值（数组）
    $.fn.get_props_json = function(){
    //        $.ajax({
    //            cache : false,
    //            async: false,
    //            type:"get",
    //            dataType:'json',
    //            crossDomain: true,
    //            data : {
    //                uid : 2,
    //                course_id : 1
    //            },
    //            url:"http://192.168.0.112:3000/api/chapters/user_prop",
    //            success: function(data){
    //                //                $.each(data,function(){
    //                //                   arr_number_props[data.id] = data.count;
    //                //                });
    //                arr_number_props = data;
    //                alert(arr_number_props[0].name);
    //            },
    //            error: function(){
    //                alert("error");
    //            }
    //        });
    //                http://192.168.0.112:3000/api/chapters/user_prop?callback=?
    //        $.getJSON("/123.js?callback=?",function(json){
    //            alert(11111111);
    //            alert(json);
    //        });
    }
    //加载道具
    $.fn.loading_props = function(type){
        var html="";
        var objs = [{
            id: 1,
            count: 1,
            name:"去错",
            applicable_questions:'0'
        }, {
            id: 2,
            count: 2,
            name:"换题",
            applicable_questions:'0,1,2,3,4,5,6,7,8'
        },{
            id: 3,
            count: 1,
            name:"作弊",
            applicable_questions:'1'
        },{
            id: 4,
            count: 5,
            name:"加血",
            applicable_questions:'0,1,2,3,4,5,6,7,8'
        }];
        var html_help_box_1 = '';
        $.each(objs,function(index,value){
            if(daily_tasks&value.id==2){
                return true;
            }
            var arrt_questions_type = value.applicable_questions.split(",");
            
            $.each(arrt_questions_type,function(index){
                if(arrt_questions_type[index]==type){
                    var  dj_id = "dj_" + value.id;
                    var  help_id = "help_"+value.id;
                    html_help_box_1 +='<div class="help '+ help_id +'"></div>';
                    if(value.count>0){
                        html += '<div onclick="use_of_props(this)" class="help '+ help_id +'" style_class="highlighted" prop_id="'
                        +  value.id + '" applicable_questions="'+ value.applicable_questions
                        +'"><div class="'+ dj_id +'"></div><div class="h_num">'+ value.count +'</div></div>';
                    }else{
                        html += '<div onclick="use_of_props(this)" class="help '+ help_id +'" style_class="show_gloomy" prop_id="'
                        +  value.id + '" applicable_questions="'+ value.applicable_questions
                        +'"><div class="'+ dj_id +'"></div><div class="h_num">'+ value.count +'</div></div>';
                    }
                }
            });
        });
        html_help_box_1 +='<div class="help help_5"></div>';
        html += '<div class="help help_5"><div class="kc" id="knowledge_card_input"></div><div class="help_tit"><span class="help_tit_cor"></span>知识卡片</div></div>'
        $(".help_box_1").html(html_help_box_1);
        $(".loading_props").html(html);
    }
    //使用道具方法
    
    //加载时间方法(时间改变)
    $.fn.loading_time = function(){
        sec++;
        if(sec==60)
        {
            minutes++;
            sec=0;
        }
        if(minutes==60)
        {
            hour++;
            minutes=0;
        }
        var hour_show;
        var minutes_show;
        var sec_show;
        if(hour<10){
            hour_show = "0"+hour;
        }else{
            hour_show = hour;
        }
        if(minutes<10){
            minutes_show = "0"+minutes
        }else{
            minutes_show = minutes;
        }
        if(sec<10){
            sec_show = "0"+sec;
        }else{
            sec_show = sec;
        }
        var time_val=hour_show+":"+minutes_show+":"+sec_show;
        $(".loading_time").html(time_val);
        setTimeout('$(".loading_time").loading_time()',1000);
    }
    //加载扣除血量
    $.fn.load_control_blood = function(){
        //获取当前进度条的总长度
        var width = $(".load_blood").width();
        var width_blood = width/course.blood;
        $(".progressbar").width(existing_blood*width_blood);
    }

    //点击显示知识卡片
    $.fn.show_knowledge_card = function(){
        $("#knowledge_card_input").click(function(){
            $(".knowledge_card_hidden").show();
        });
        $(".close").click(function(){
            $(".knowledge_card_hidden").hide();
        })
        $("#collection_knowledge_cards").click(function(){
            $(".knowledge_card_hidden").hide();
        });
    }

    // 收藏知识卡片
    $.fn.collection_knowledge_cards = function(){
        var card_id = course.questions[questions_index].card_id;
        var course_id = course.course_id;
        $("#collection_knowledge_cards").click(function(){
            $.ajax({
                cache: false,
                async: false,
                crossDomain: true,
                type: 'POST',
                url:"http://192.168.0.112:3000/api/chapters/save_card",
                data:{
                    uid : 3,
                    card_id : card_id,
                    course_id : course_id
                },
                dataType:'text',
                success:function(data){
                    if(data=="success"){
                        alert("收藏成功");
                    }
                    else if(data=="added"){
                        alert("已存在卡包中");
                    }else if(data=="not_enough"){
                        alert("卡槽容量不够");
                    }else{
                        alert("收藏错误");
                    }
                }
            });
        })
    }
    //完形填空选择答案
    $.fn.cloze_choice_option = function(){
        $(".tk_txt").focus(function(){
            $(this).parent().find(".wxtk_opt_box").show();
        })
        $(".wxtk_box input").blur(function(){
            $(this).parent().find(".wxtk_opt_box").hide(500);
        });
        //点击具体小题选项
        $(".wxtk_opt").click(function(){
            $(this).parents(".wxtk_box").children("input").val($(this).html());
            $(".wxtk_opt_box").hide();
            //获取到每个空格中所填的内容
            $(".tk_txt").each(function(index){
                if($(".tk_txt").index(index) == 0){
                    param_content = $(this).val();
                }else{
                    param_content += ';=;' + $(this).val();
                }
            });
            alert(param_content);
        });
    }
    //拖拽提
    $.fn.drag_mention = function(){
        //加载该方法的时候默认选择第一个空格
        $(".tk_txt").eq(0).addClass("vacancies_blank");
        $(".tk_txt").eq(0).attr("blanks","choice");
        //点击上面的空格做判断，如果该空格中的内容不是_____,则取到值，并在此替换
        $(".tk_txt").click(function(){
            //  所有class变为白色
            $(".tk_txt").removeClass("vacancies_blank");
            //当前样式便会被选中
            $(this).addClass("vacancies_blank");
            $(".tk_txt").removeAttr("blanks");  // 一处所有blanks属性
            $(this).attr("blanks","choice");   //给当前加上属性
            if($(this).val()!=''){
                //与选项内容相同的样式回复显示
                $("input[class='ty_block ty_block1'][value='" + $(this).val() +"']").removeClass("ty_block1");
                $("input[class='ty_block'][value='" + $(this).val() +"']")[0].disabled = false;
                $(this).val(""); //显示当前被点击的初始内容
            }
        });
        $(".ty_block").click(function(){
            //与选项内容相同的样式回复显示
            var choiced = $("input[blanks='choice']").val();
            $("input[class='ty_block ty_block1'][value='"+ choiced +"']").removeClass("ty_block1");
            //
            if(choiced!=""){
                $("input[class='ty_block'][value='"+choiced+"']")[0].disabled = false;
            }
            $("input[blanks='choice']").val($(this).val());
            $(this).addClass("ty_block1");
            $(this)[0].disabled = true;
            //给值到变量param_content中
            param_content = null;
            $(".tk_txt").each(function(){
                if(param_content==null){
                    param_content = $(this).val();
                }else{
                    param_content += ";||;"+$(this).val();
                }
            })
            alert(param_content);
        });
    };
    //排序题 排序，还原
    $.fn.sequence_revert = function(){
        var index = 0;
        $("div.sort_block").eq(index).addClass("vacancies_blank");
        $("div.sort_block").eq(index).attr("blanks","choice");
        //点击排序
        $(".fillin_blank_option").click(function(){
            $("div[class='sort_block vacancies_blank'][blanks='choice']").html($(this).html());
            $(this).css({
                display: "none"
            });
            $("div[class='sort_block vacancies_blank'][blanks='choice']").removeAttr("blanks");
            index++;
            $("div.sort_block").eq(index).addClass("vacancies_blank");
            $("div.vacancies_blank").eq(index).attr("blanks","choice");

            //给值到变量param_content中
            param_content = null;
            $("div[class='sort_block vacancies_blank']").each(function(){
                if(param_content==null){
                    param_content = $(this).html();
                }else{
                    param_content += ";||;"+$(this).html();
                }
            })
        });
        //还原排序
        $(".revert_sorting").click(function(){
            $("#question_content").loading_title();
            param_content = null;
        });
    };

    //单项选择题。选择答案，背景颜色改变，并把答案放进param_content变量中。
    $.fn.choose_options_one = function(){
        //选择答案,把选择的答案保存到全局变量中去。
        //文字选择题或者语音选择题
        $(".tw_txt").click(function(){
            $(".tw_txt").removeClass("current");
            $(this).addClass("current");
            param_content = $(this).find("input").val();
        });
        // 图片选择题
        $(".pic_picker").click(function(){
            $(".pic_picker").removeClass("current");
            $(this).addClass("current");
            param_content = $(this).find("input").val();
        });
        $(".listen").click(function(){
            $(this).find(".lis_src")[0].play();
        })
    };
    //多选题，选择答案
    $.fn.choose_options_maney = function(){
        //获取选项并拆分成数组
        var options = course.questions[questions_index].branch_questions[0].options;
        var this_a = options.split(";||;");
        //文字选择题或者语音选择题
        $(".tw_txt").click(function(){
            if($(this).attr("class").indexOf("current")>=0){
                $(this).removeClass("current");
            }else{
                $(this).addClass("current");
            }
            param_content = null;
            $.each(this_a,function(index,value){
                if (param_content == null){
                    $('.current').map(function(){
                        if(value == $(this).find("input").val()){
                            param_content =  value;
                        }
                    });
                }else{
                    $('.current').map(function(){
                        if(value == $(this).find("input").val()){
                            param_content += ';||;' + value;
                        }
                    });
                }
            })
            alert(param_content);

        });
        // 图片选择题
        $(".pic_picker").click(function(){
            if($(this).attr("class").indexOf("current")>=0){
                $(this).removeClass("current");
            }else{
                $(this).addClass("current");
            }
            param_content = null;
            $.each(this_a,function(index,value){
                if (param_content == null){
                    $('.current').map(function(){
                        if(value == $(this).find("input").val()){
                            param_content =  value;
                        }
                    });
                }else{
                    $('.current').map(function(){
                        if(value == $(this).find("input").val()){
                            param_content += ';||;' + value;
                        }
                    });
                }
            })
            alert(param_content);
        });
    }
    //选项随机排序
    $.fn.options_sort = function(option){
        return option.sort(function () {
            return Math.random()>0.5?1:-1;
        });
    };
    //把题目中的图片或者音频过滤显示
    $.fn.filter_question = function(text){
        var html_text = "";
        if(text.indexOf('<file>') >= 0){
            var arr_text = text.split("<file>");
            $.each(arr_text,function(index,value){
                if(index%2 == 1){
                    var file_text = value.split(".");
                    if(daily_tasks){
                        var url_prefix= course.questions[questions_index].prefix;
                        if(file_text[1]=="mp3"){
                            html_text += '<div class="listens"><div class="lis_icon"></div><audio class="lis_src" src="' + url_prefix + value + '" picture_name="' + value + '"></audio></div>';
                        }else{
                            html_text += '<div class="tw_pic"><img src="' + url_prefix + value + '"onload="if(this.width>this.height){if(this.width!=300)this.width=300; }else{if(this.height!=300) this.height=300;}"></img></div>';
                        }
                    }else{
                        if(file_text[1]=="mp3"){
                            html_text += '<div class="listens"><div class="lis_icon"></div><audio class="lis_src" src="' + value + '" picture_name="' + value + '"></audio></div>';
                        }else{
                            html_text += '<div class="tw_pic"><img src="' + value + '"onload="if(this.width>this.height){if(this.width!=300)this.width=300; }else{if(this.height!=300) this.height=300;}"></img></div>';
                        }
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

    }
    //判断文本中是否存在文件
    $.fn.filter_content = function(text){
        var html_text = "";
        if(text.indexOf('<file>') >= 0){
            var arr_text = text.split("<file>");
            $.each(arr_text,function(index,value){
                if(index%2 == 1){
                    var file_text = value.split(".");
                    if(daily_tasks){
                        var url_prefix= course.questions[questions_index].prefix;
                        if(file_text[1]=="mp3"){
                            html_text += '<div class="listen"><div class="lis_icon"></div><audio class="lis_src" src="' + url_prefix + value + '" picture_name="' + value + '"></audio></div>';
                        }else{
                            html_text += '<div class="file_img"><img src="' + url_prefix + value + '"onload="if(this.width>this.height){if(this.width!=200)this.width=200; }else{if(this.height!=200) this.height=200;}"></img></div>';
                        }
                    }else{
                        if(file_text[1]=="mp3"){
                            html_text += '<div class="listen"><div class="lis_icon"></div><audio class="lis_src" src="' + value + '" picture_name="' + value + '"></audio></div>';
                        }else{
                            html_text += '<div class="file_img"><img src="' + value + '"onload="if(this.width>this.height){if(this.width!=200)this.width=200; }else{if(this.height!=200) this.height=200;}"></img></div>';
                        }
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
        $(".ligature_option_left").click(function(){
            //判断如果在右边有被选中的内容，则点击左边两边匹配
            var has_selected = $("#selected_option");    //如果某个元素被选中则加上selected_option
            //判断如果没有匹配到值
            if($(this).find("div[class='lx_img_txt']").attr("value2")==undefined){
                //如果选中右边
                if(has_selected.attr("class")=="ligature_option_right current"){
                    if(has_selected.attr("is_img")=='shi'){
                        $(this).find("div[class='hide_options']").html(has_selected.html());
                        $(this).find("div[class='hide_options']").show();
                        $(this).find("div[class='lx_img_txt']").attr("value2",has_selected.attr("value2"));
                    }else{
                        $(this).find("div[class='lx_img_txt']").attr("value2",has_selected.attr("value2"));
                        $(this).find("div[class='lx_img_txt']").html(has_selected.html());
                        $(this).attr("name","current1");
                    }
                    has_selected.css({
                        display: "none"
                    });
                    $(this).removeClass("current")
                    has_selected.removeClass("current").removeAttr("id");
                }else{                //如果没被选中
                    has_selected.removeAttr("id");
                    has_selected.removeClass("current");
                    $(this).attr("id","selected_option");
                    $(this).addClass("current");
                }
            }else{       //如果已经连线了
                $("div[class='ligature_option_right'][value2='"+$(this).find("div[class='lx_img_txt']").attr("value2")+"']").show();
                $(this).find("div[class='lx_img_txt']").removeAttr("value2");
                $(this).find("div[class='hide_options']").html("");
                $(this).find("div[class='hide_options']").css({
                    display: "none"
                });
                $(this).removeAttr("id").removeAttr("name");
                $(this).find("div[class='lx_img_txt']").html("");
            }
            var lianxian;
            $.each(arr1_left,function(index,value){
                lianxian = $("div[class='ligature_option_left'][value1='"+ value +"']");
                if(index == 0){
                    param_content = lianxian.attr("value1") + ";=;" + lianxian.find("div[class='lx_img_txt']").attr("value2");
                }else{
                    param_content += ";||;" + lianxian.attr("value1") + ";=;" + lianxian.find("div[class='lx_img_txt']").attr("value2");
                }
            })
        });

        //点击右边
        $(".ligature_option_right").click(function(){
            var has_selected = $("#selected_option");    //如果某个元素被选中则加上selected_option
            if(has_selected.attr("class")=="ligature_option_left current"){
                if($(this).attr("is_img")=="shi"){
                    $(this).css({
                        display: "none"
                    });
                    has_selected.find("div[class='hide_options']").html($(this).html());
                    has_selected.find("div[class='hide_options']").show();
                    has_selected.find("div[class='lx_img_txt']").attr("value2",$(this).attr("value2"));
                }else{
                    has_selected.find("div[class='lx_img_txt']").attr("value2",$(this).attr("value2"));
                    $("#selected_option").find("div[class='lx_img_txt']").html($(this).html());
                    $("#selected_option").attr("name","current1");
                }
                $("#selected_option").removeAttr("id").removeClass("current");
                $(this).css({
                    display: "none"
                });
            }else{
                $(".ligature_option_right").removeAttr("id").removeClass("current");
                $(this).addClass("current").attr("id","selected_option");
            }
            var lianxian;
            $.each(arr1_left,function(index,value){
                //                var html_left = $("div[class='ligature_option_left']:contains('" + value +"')").html();
                lianxian = $("div[class='ligature_option_left'][value1='"+ value +"']");
                if(index == 0){
                    param_content = lianxian.attr("value1") + ";=;" + lianxian.find("div[class='lx_img_txt']").attr("value2");
                }else{
                    param_content += ";||;" + lianxian.attr("value1") + ";=;" + lianxian.find("div[class='lx_img_txt']").attr("value2");
                }
            })
        })
    };

})(jQuery)


function use_of_props(obj){
    //判断样式是不是 道具数量为0
    if($(obj).attr("style_class") == "show_gloomy"){
        alert("没有此道具");
    }else{
        //判断是否使用了这种道具
        if(frequency_use_props != 0){
            alert("已经使用过道具了");
        }else{
            //取道具适用的题型和当前题型
            var arrt_questions_type = $(obj).attr("applicable_questions").split(",");
            var type = course.questions[questions_index].question_types;
            //判断当前题目是否在此种道具使用行列
            if($.inArray(type.toString(),arrt_questions_type)>=0){
                var prop_id = $(obj).attr("prop_id");
                //                $.ajax({
                //                    cache: false,
                //                    async: false,
                //                    crossDomain: true,
                //                    type: 'post',
                //                    url:"http://192.168.0.112:3000/api/chapters/used_prop",
                //                    data:{
                //                        uid : 3,
                //                        prop_id : prop_id
                //                    },
                //                    dataType:'text',
                //                    success:function(data){
                //                        if(data=="success"){
                //道具效果

                var answer = course.questions[questions_index].branch_questions[0].answer;
                var type = course.questions[questions_index].question_types;   //获取题目类型
                //根据道具类型分类，达到每种道具的使用效果
                switch(prop_id){
                    //去错卡
                    case '1':
                        if(type==0){
                            $("#question_option").find(".tw_txt").each(function(){
                                if($(this).find("input").val()!=answer){
                                    $(this).css({
                                        color: "#000000",
                                        background: "red"
                                    });
                                    return false;
                                }
                            });
                            $("#question_option").find(".pic_picker").each(function(){
                                if($(this).find("input").val()!=answer){
                                    $(this).css({
                                        color: "#000000",
                                        background: "red"
                                    });
                                    return false;
                                }
                            });
                        }
                        frequency_use_props++;
                        break;
                    //换题
                    case '2':
                        if(questions_index==course.question_count-1){
                            alert("最后一题要提交了");
                        }else{
                            questions_index++;  //答题之后题目下标加一
                            param_content = null;
                            $("#question_content").loading_title();
                        }
                        break;
                    //作弊卡
                    case '3':
                        var arr_answer = answer.split(";||;")
                        var options = course.questions[questions_index].branch_questions[0].options;
                        var this_a = options.split(";||;");
                        if(type==1){
                            $("#question_option").find(".tw_txt").each(function(){
                                if($.inArray($(this).find("input").val(),arr_answer)>=0){
                                    if($(this).attr("class")=="tw_txt current"){
                                        return true;
                                    }
                                    $(this).addClass("current");
                                    return false;
                                }
                            });
                            $("#question_option").find(".pic_picker").each(function(){
                                if($.inArray($(this).find("input").val(),arr_answer)>=0){
                                    if($(this).attr("class")=="tw_txt current"){
                                        return true;
                                    }
                                    $(this).addClass("current");
                                    return false;
                                }
                            });
                        }
                        param_content = null;
                        $.each(this_a,function(index,value){
                            if (param_content == null){
                                $('.current').map(function(){
                                    if(value == $(this).find("input").val()){
                                        param_content =  value;
                                    }
                                });
                            }else{
                                $('.current').map(function(){
                                    if(value == $(this).find("input").val()){
                                        param_content += ';||;' + value;
                                    }
                                });
                            }
                        })
                        frequency_use_props++;
                        break;
                    //医疗卡
                    case '4':
                        //判断是不是满血
                        if(existing_blood >= course.blood){
                            alert("满血状态不可使用");
                        }else{
                            //加血调用加载血量方法
                            alert(existing_blood);
                            existing_blood++;
                            frequency_use_props++;
                            alert(existing_blood);
                            $(".progressbar").load_control_blood();
                        }
                        break;
                    default:
                        break;
                }
            //                            alert("道具使用成功");
            //                            alert(data);
            //                        }else{
            //                            alert("道具使用失败");
            //                        }
            //                    }
            //                });
            
            }
        }
    }
}
