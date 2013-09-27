$(function(){
    //���ü�����Ŀ�ķ�����ʵ�ֽ�����Ŀ֮���Զ���
    $("#question_content").loading_title();
    $(document).on('click',".btn_div input[id='loaddata']",function(){
        var button = $(this);
        if(button.val()=="�˶�"){
            if(param_content==null){
                alert("������д��");
            }else{
                if(param_content==course.questions[questions_index].branch_questions[0].answer){
                    alert("�����");
                    questions_index++;  //����֮����Ŀ�±��һ
                    param_content = null; //��������������Ĵ�
                }
                else{
                    alert("�����");
                    questions_index++;
                    param_content = null;
                //���ÿ�Ѫ�ķ���
                }
                button.val("��һ��");
                param_content = null;
            }
        }else{
            button.val("�˶�");
            $("#question_content").loading_title();
            var type = course.questions[questions_index].question_types;   //��ȡ��Ŀ����
        }
        if(questions_index==course.question_total){
    //�����ύ�ķ���
    }
    })
});

//��Ҫ�����õ���jquery����д��������
(function($){
    //ͨ���ȡjson�е��������ͼ��ز�ͬ����
    $.fn.loading_title = function(){
        var type = course.questions[questions_index].question_types;   //��ȡ��Ŀ����
        $("#question_content").html(course.questions[questions_index].content);          //��ʾ��Ŀ
        var options = course.questions[questions_index].branch_questions[0].options;   //ƴ�մ�ѡ��
        var a = options.split("||");  //�ָ�ѡ�
        var html='';  //������Ŀ��ô��ʾ
        switch(type){
            case '1':   //��ѡ��
                $("#question_content").html(course.questions[questions_index].content);          //��ʾ��Ŀ
                $("#question_content").options_sort(a);//����˳��
                $.each(a, function( index, value ) {
                    html += '<li>' + value + '</li>';
                });
                //��ʾ��ѡ��
                $("#question_option").html(html);
                //����ѡ��ѡ����
                $("#question_content").choose_options_one();
                break;
            case '2':  //��ѡ��
                $("#question_content").html(course.questions[questions_index].content);          //��ʾ��Ŀ
                $("#question_content").options_sort(a);
                $.each(a, function( index, value ) {
                    html += '<li>' + value + '</li>';
                });
                //��ʾ��ѡ��
                $("#question_option").html(html);
                //����ѡ���ѡ����
                $("#question_content").choose_options_maney();
                break;
            case '3': //ͼƬ�����
                $("#question_content").html(course.questions[questions_index].content);          //��ʾ��Ŀ
                $("#question_content").options_sort(a);
                $.each(a, function( index, value ) {
                    html += '<li><div><img src="' + value +
                    '"onload="if(this.width>this.height){if(this.width!=300)this.width=300; }else{if(this.height!=300) this.height=300;}"/><input name="photos" type="checkbox" value="'
                    +value+'" /></div></li>';
                });
                $("#question_option").html(html);
                $("#question_content").choose_options_photos();
                break;
            case '4': //������
                $("#question_content").html(course.questions[questions_index].content);          //��ʾ��Ŀ
                var arr1 = new Array();//ȡ����
                var arr2 = new Array();//ȡ����
                var arr1_left = new Array;// ��ֵ����
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
            case '5': //�����
                $("#question_content").html(course.questions[questions_index].content);  //��ʾ��Ŀ
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

    //����ѡ���⡣ѡ��𰸣�������ɫ�ı䣬���Ѵ𰸷Ž�param_content�����С�
    $.fn.choose_options_one = function(){
        //ѡ���,��ѡ��Ĵ𰸱��浽ȫ�ֱ�����ȥ��
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

    //��ѡ�⣬ѡ���
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

            //��ȡÿ��li��ǩ�µ�ֵ  ��ݻ��json����е�˳��ѭ�������ҳ���ѡ�е�ѡ�
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
        //            ������˳�����ֱ��ƴ��
        //            param_content = $('.choice').map(function(){
        //                return $(this).text()
        //            }).get().join('||')
        });
    }

    //ͼƬѡ���� ���һ��ͼƬ������ͼƬ���ó�δѡ�У�ͬʱ�ٰ�����ͼƬ���ó�ѡ�С�
    $.fn.choose_options_photos = function(){
        $("#question_option img").click(function(){
            $("#question_option"). find("input").attr("checked",false);
            $(this).parents("li").find("input").attr("checked","checked");
            param_content = $(this).parents("li").find("input").val();
        })
    };
    //ѡ���������
    $.fn.options_sort = function(option){
        return option.sort(function () {
            return Math.random()>0.5?1:-1;
        });
    };
    //�ж��ı����Ƿ�����ļ�
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
    // ����Ч��
    $.fn.connection_effect = function(arr1_left,arr2_right){
        var  textorhtml="";
        //�������ж�
        $(".ligature_option_left").click(function(){
            //�ж�������ұ��б�ѡ�е����ݣ������������ƥ��
            var has_selected = $("div[class='ligature_option_right'][id='selected_option']");
            var index = has_selected.attr("index");
            var value2 = has_selected.attr("value2");
            if($(this).next().attr("index")==undefined){
                if(has_selected.attr("id")==undefined){
                    $(".ligature_option_left").removeAttr("id");
                    $(this).attr("id","selected_option");
                }else{         //����ұ�û��ѡ����ֻ�ж��Լ����
                    //�ѱ�ƥ����������ص�
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
            // ����ѡ��ļ��ϷŽ�param_content��var
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
        
        //������ز��ֽ����ж�
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
        //����ұ߽����ж�
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
//��ѡ�⣬ѡ���
//    $.fn.choose_options_maney = function(){
//        //ѡ���,��ѡ��Ĵ𰸱��浽ȫ�ֱ�����ȥ��
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
//                var existornot = $.inArray($(this).text(), option);  //�жϵ�ǰѡ���ѡ���ǲ����Ѿ����ڱ�����
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