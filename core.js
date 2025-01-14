
import Mario from "./mario.js";
import Koopa from "./koopa.js";




//main
var a = new Mario();
document.getElementById("mario").style.bottom = a.bottom;
document.getElementById("mario").style.left = a.left;
//ready step
document.querySelector("#mario").style.display = "none";
document.querySelector("#input").style.display = "none";
document.querySelector("#restart").style.display = "none";
document.querySelector("#menu").style.display = "none";

document.querySelector("#settingtable button").onclick = back_to_ready;
document.querySelector("#guidetable button").onclick = guide_to_ready;
var arr_value = [1, 60, true];
arr_value[0] = localStorage.getItem("level");
arr_value[1] = localStorage.getItem("time");
arr_value[2] = localStorage.getItem("hira");
function back_to_ready(){
    document.querySelector("#settingtable").style.display = "none";
    arr_value = get_value();
    localStorage.setItem("level", arr_value[0]);// lưu vào bộ nhớ người dùng
    localStorage.setItem("time", arr_value[1]);
    localStorage.setItem("hira", arr_value[2]);
}
function guide_to_ready(){
    document.querySelector("#guidetable").style.display = "none";
}
document.querySelector("#ready").addEventListener("click", ()=>{
    document.querySelector("#ready").style.display = "none";
    document.querySelector("#score").style.visibility = "visible";
    document.querySelector("#setting").style.display = "none";
    document.querySelector("#guide").style.display = "none";
    document.querySelector("#mario").style.display = "block";   
    document.querySelector("#input").style.display = "block";
    playbgmusic();
    //tính điểm 
    let score = 0;
    let time = arr_value[1];
    //xử lý tín hiệu nhận input
    let inputTextTag = document.querySelector("#input").querySelector("input");
    inputTextTag.focus();
    //xử lý koopa
    var b = new Koopa();
    //loop

    let count = 0;
    let countDisplayGun = 0;
    var isExplode = false;
    let isDisplayGun = false;

    let mainInterval = setInterval(()=>{
        //vòng for tần số cao
        //mario chạy
        
        a.renderRun(arr_value);
        //xử lý string input
        inputTextTag.focus();
        var stringInput = inputTextTag.value;
        if(stringInput.length > 3){
            var len = stringInput.length;
            stringInput = inputTextTag.value.substring(len-3, len);
            inputTextTag.value = stringInput;
        }
        //check từ đang xét
        if(stringInput.includes(b.queue[0]) && a.curmario != "./assetMario/mariogun3.png"){
            //nếu trúng 1 con koopa
            document.getElementById("curscore").textContent = `SCORE: ${++score}`;
            isDisplayGun = true;
            isExplode = true;
            b.queue.shift();
            inputTextTag.value = "";
            stringInput = "";
        }
        if(countDisplayGun <= 7 && isDisplayGun == true){
            a.renderMarioGun();
            countDisplayGun++;
            playshotmusic();
            if(isExplode ==true){
                document.querySelectorAll(".kpEle")[0].querySelector("img").src = "./assetMario/explode.gif";
                isExplode = false;
                document.querySelectorAll(".kpEle")[0].querySelector("div").textContent = "";
            }
        }else if(a.curmario == "./assetMario/mariogun3.png"){
            a.curmario = "./assetMario/mario1_move0.png";
            countDisplayGun = 0;
            isDisplayGun = false;
            document.querySelectorAll(".kpEle")[0].remove();
        }
        //vòng for tần số thấp để xuất koopa
        if(count%20==0){
            b.renderRun(arr_value);
        }
        

        //kiểm tra game over
        if(Koopa.returnGameOver() == true){
            a.marioDead();
            document.getElementById("input").remove();
            document.getElementById("score").remove();       
            document.querySelector("#bg").style.animation = "setGameOver 2s linear";
            playdeadmusic();
            document.querySelector("#bg").style.backgroundImage = "url(\"./assetMario/dead.png\")";  
            setTimeout(()=>{
                document.querySelector("#restart").style.display = "block";
                document.querySelector("#menu").style.display = "block";
            }, 3000);
            clearInterval(mainInterval);
        }
        
        //for tần số thấp để countdown thời gian
        if(count%10 == 0){
            time--;
            document.getElementById("time").textContent = `TIME LEFT: ${time}s`
        }
        //xử lý nếu hết tg rồi mà vẫn chưa thua => thắng
        if(time == 0  && Koopa.returnGameOver() == false){
            playwinmusic();
            document.querySelector("#bg").style.animation = "setGameWin 1s linear";   
            document.querySelector("#bg").style.backgroundImage = "url(\"./assetMario/winbg.png\")"; 

            a.marioWin();
            Koopa.explodeAllKoopa();
            setTimeout(()=>{
                Koopa.deleteAllKoopa();
            }, 1500);
            setTimeout(()=>{
                document.querySelector("#restart").style.display = "block";
                document.querySelector("#menu").style.display = "block";
            }, 3000);
            clearInterval(mainInterval);
        }
        count++;
    }, 100);

})



function playwinmusic(){
    document.querySelector("audio").remove();
    var a = document.createElement("audio");
    a.src = "./assetMario/win.mp3";
    a.play();
}
function playdeadmusic(){
    document.querySelector("audio").remove();
    var a = document.createElement("audio");
    a.src = "./assetMario/thua-cuoc.mp3";
    a.play();
}
function playbgmusic(){
    var a = document.querySelector("audio");
    a.play();
}
function playshotmusic(){
    var a = document.createElement("audio");
    a.src = "./assetMario/gun.mp3";
    a.play();
}

