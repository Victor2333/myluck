//抽奖人员名单
//var n = 100;
let allPerson = "";
let luckGuy = "";
//for(var i = 1; i <= n; i++) {
//    if(i === n) {
//        allPerson += i;
//        break;
//    }
//    allPerson += i + ";"
//}
//领导人员名单
//var leaderArr = [];
//未中奖人员名单
let remainPerson = allPerson.toString().split(";");
//中奖人员名单
let luckyMan = [];
let timer;//定时器
let times = 1;//分几个奖项
let bgm = document.getElementById("hyl");
let con = document.getElementById("hyll");
$(function () {
    iconAnimation();
    //开始抽奖
    $("#btnStart").on("click", function () {
        //判断是开始还是结束
        if ($("#btnStart").text() === "开始") {
            if (!$("#txtNum").val()) {
                showDialog("请输入中奖人数");
                return false;
            }
            if ($("#txtNum").val() > 49) {
                showDialog("一次最多只能输入49人");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>" + $("#txtNum").val() +
                    "</b>人,奖池人数：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            $("#result").fadeOut();
            //显示动画框，隐藏中奖框
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");
            bgm.play();
            con.currentTime = 0;
        }
        else {
            $("#btnStart").text("开始");//设置按钮文本为开始
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//抽奖开始

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止输入框动画展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//隐藏输入框，显示中奖框
            $("#bgLuckyDrawEnd").addClass("bg");//添加中奖背景光辉
            $("#txtNum").attr("placeholder", "输入中奖人数(" + remainPerson.length + ")");
            bgm.pause();
            bgm.currentTime = 0;
            con.play();
        }
    });

    $("#btnReset").on("click", function () {
        //确认重置对话框
//        var confirmReset = false;
        showConfirm("确认重置吗？所有已中奖的人会重新回到抽奖池！", function () {
            //熏置未中奖人员名单
            n = parseInt(prompt("请输入总人数"));
            allPerson = "";
            for(var i = 1; i <= n; i++) {
                if(i === n) {
                    allPerson += i;
                    break;
                }
                allPerson += i + ";"
            }
            remainPerson = allPerson.toString().split(";");
            //中奖人数框置空
            $("#txtNum").val("").attr("placeholder", "请输入中奖人数");
            $("#showName").val("");
            luckGuy = "";
            $("#allResult").html(luckGuy);
            times = 1;
            //隐藏中奖名单,然后显示抽奖框
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光辉
            //deleteFile('./luckMan.txt')
        });
    });
});

//抽奖主程序
function startLuckDraw() {
    //抽奖人数
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("抽奖人数大于奖池人数！请修改人数。或者点重置开始将新一轮抽奖！");
        return false;
    }
    //随机中奖人
    var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
    var tempHtml = "";
    var temp2 = "";
    $.each(randomPerson, function (i, person) {
//        if (leaderArr.indexOf(person) > -1 && times == 1) {
//           tempHtml += "<span><b>" + person + "</b></span>";
//        }
//        else {
        tempHtml += "<span>" + person + "</span>";
        temp2 += person + " ";
//        }
    });
    $("#result>div").html(tempHtml);
    //剩余人数剔除已中奖名单
    remainPerson = remainPerson.delete(randomPerson);
    let $selectPrice = $("#select").find("option:selected");
    $("#allResult").append("<b>" + $selectPrice.text() + "获奖者("+ luckyDrawNum +"位)：<br />" + "</b>");
    $("#allResult").append(temp2 + "<br />");
    times++;
    //TODO:MAKE PRICE ON SCREEN
    //中奖人员
    luckyMan = luckyMan.concat(randomPerson);
    //设置抽奖人数框数字为空
    $("#txtNum").val("");
}

//参考这篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳动的数字
function move() {
    var $showName = $("#showName"); //显示内容的input的ID
    var interTime = 30;//设置间隔时间
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//输入框赋值
    }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
    var interTime = 200;//设置间隔时间
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//输入框赋值
    }, interTime);

}

