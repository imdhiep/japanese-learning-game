import e from"./mario.js";import r from"./koopa.js";var a=new e;document.getElementById("mario").style.bottom=a.bottom,document.getElementById("mario").style.left=a.left,document.querySelector("#mario").style.display="none",document.querySelector("#input").style.display="none",document.querySelector("#restart").style.display="none",document.querySelector("#menu").style.display="none",document.querySelector("#settingtable button").onclick=back_to_ready,document.querySelector("#guidetable button").onclick=guide_to_ready;var arr_value=[1,60,!0];function back_to_ready(){document.querySelector("#settingtable").style.display="none",arr_value=get_value(),localStorage.setItem("level",arr_value[0]),localStorage.setItem("time",arr_value[1]),localStorage.setItem("hira",arr_value[2])}function guide_to_ready(){document.querySelector("#guidetable").style.display="none"}function playwinmusic(){document.querySelector("audio").remove();var e=document.createElement("audio");e.src="./assetMario/win.mp3",e.play()}function playdeadmusic(){document.querySelector("audio").remove();var e=document.createElement("audio");e.src="./assetMario/thua-cuoc.mp3",e.play()}function playbgmusic(){document.querySelector("audio").play()}function playshotmusic(){var e=document.createElement("audio");e.src="./assetMario/gun.mp3",e.play()}arr_value[0]=localStorage.getItem("level"),arr_value[1]=localStorage.getItem("time"),arr_value[2]=localStorage.getItem("hira"),document.querySelector("#ready").addEventListener("click",()=>{document.querySelector("#ready").style.display="none",document.querySelector("#score").style.visibility="visible",document.querySelector("#setting").style.display="none",document.querySelector("#guide").style.display="none",document.querySelector("#mario").style.display="block",document.querySelector("#input").style.display="block",playbgmusic();let e=0,t=arr_value[1],l=document.querySelector("#input").querySelector("input");l.focus();var o=new r;let u=0,i=0;var n=!1;let s=!1,y=setInterval(()=>{a.renderRun(arr_value),l.focus();var c=l.value;if(c.length>3){var m=c.length;c=l.value.substring(m-3,m)}c.includes(o.queue[0])&&(document.getElementById("curscore").textContent=`SCORE: ${++e}`,s=!0,n=!0,o.queue.shift(),l.value=""),i<=5&&!0==s?(a.renderMarioGun(),i++,playshotmusic(),!0==n&&(document.querySelectorAll(".kpEle")[0].querySelector("img").src="./assetMario/explode.gif",n=!1,document.querySelectorAll(".kpEle")[0].querySelector("div").textContent="")):"./assetMario/mariogun3.png"==a.curmario&&(a.curmario="./assetMario/mario1_move0.png",i=0,s=!1,document.querySelectorAll(".kpEle")[0].remove()),u%20==0&&o.renderRun(arr_value),!0==r.returnGameOver()&&(a.marioDead(),document.getElementById("input").remove(),document.getElementById("score").remove(),document.querySelector("#bg").style.animation="setGameOver 2s linear",playdeadmusic(),document.querySelector("#bg").style.backgroundImage='url("./assetMario/dead.png")',setTimeout(()=>{document.querySelector("#restart").style.display="block",document.querySelector("#menu").style.display="block"},3e3),clearInterval(y)),u%10==0&&(t--,document.getElementById("time").textContent=`TIME LEFT: ${t}s`),0==t&&!1==r.returnGameOver()&&(playwinmusic(),document.querySelector("#bg").style.animation="setGameWin 1s linear",document.querySelector("#bg").style.backgroundImage='url("./assetMario/winbg.png")',a.marioWin(),r.explodeAllKoopa(),setTimeout(()=>{r.deleteAllKoopa()},1500),setTimeout(()=>{document.querySelector("#restart").style.display="block",document.querySelector("#menu").style.display="block"},3e3),clearInterval(y)),u++},100)});