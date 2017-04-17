var bjs="";//
var xsarr=[];//学生列表
var ydxm=[];//点名堆栈
var bjtree=[];//全校班级信息
var mybj=[];//我的班级信息
var dqbjxh=0//当前班级序号（我的班级信息）
var bjdmxh=1;//当前点名序号
var disbz=false;//显示标志
var jfbz=false;
var json="";//json字符串
var mm=0;//分
var ms=0;//秒
var mdate=new Date();//
var mms=mdate.getTime();//
var mstime=0;//
        
    function showDlg(){ //显示遮盖的层
        var objDeck = document.getElementById("deck");
        if(!objDeck)
        {
            objDeck = document.createElement("div");
            objDeck.id="deck";
            document.body.appendChild(objDeck);
        }
        objDeck.className="showDeck";
        objDeck.style.filter="alpha(opacity=50)";
        objDeck.style.opacity=40/100;
        objDeck.style.MozOpacity=40/100;//显示遮盖的层end        
        document.getElementById('divBox').className='showDlg';//改变样式
        starshow();  
    }

    function addsele(mybj){
        for(var i=0;i<mybj.length;i++){
            alert(mybj[i]);
            document.getElementById('sele1').Options[i]=new Option(mybj[i],i);
        }
    }

    function starshow(){
        jfbz=false;
        var star = document.getElementById("star");
        var star_li = star.getElementsByTagName("li");
        var result = document.getElementById("result");
        var i=0;
        var len = star_li.length;
          for(i=0; i<len; i++){
          star_li[i].index = i;
            
            star_li[i].onmouseover = function(){
                    for(i=5; i<=this.index; i++){
                        star_li[i].className = "act";                  
                    }
                    for(i=5; i>=this.index; i--){
                        star_li[i].className = "act-";                  
                    }
                      document.getElementById('result').innerHTML =(this.index-5)+"分";
            }

            star_li[i].onmouseout = function(){
                     for(i=0; i<len; i++){
                     star_li[i].className = "";
                    }
            }
            
            star_li[i].onclick = function(){
            	cancel();
            	return(this.index-5);
            }        
    }        
}

    function enter()
    {
    	jfbz=true;
        document.getElementById('divBox').className='hideDlg';
        document.getElementById("deck").className="hideDeck";        
    }

    function cancel()
    {
        document.getElementById('divBox').className='hideDlg';
        document.getElementById("deck").className="hideDeck";        
    }

function init() {
	resettime();
	mybj=JSON.parse(localStorage.getItem("mybj"));
	if (mybj!==null) {
		dispbj();
		bjtree=JSON.parse(localStorage.getItem("bjstree"));
		dqbjxh=0;
		selebj(dqbjxh);
	}else {
		loadFromData();
		bj_menu();
	}
}

function adfromjosn(){//chrom don't support
	$.getJSON('test.txt',function(data){ 
	alert(data); 
}); 
}

function selebj(xzbjxh){
	xsarr=JSON.parse(localStorage.getItem(mybj[xzbjxh][0]));
	document.getElementById("dqbj").innerHTML=mybj[xzbjxh][0].substr(1,1)+"年级"+mybj[xzbjxh][0].substr(3,2) +"班";	
	document.getElementById("xsxm").innerHTML="点名";
	dqbjxh=xzbjxh;
	bjdmxh=xsarr[0][7];
}


function dispbj(){
	tmpstr="";
	for (var i = 0; i < mybj.length; i++) {
		tmpstr+="<div class='lef_menu' onClick=selebj("+i+") >"+mybj[i][0].substr(1,1)+"年级"+mybj[i][0].substr(3,2) +"班</div>";
	}
	document.getElementById("top").innerHTML=tmpstr;   
}


function bj_menu(){
	tmpstr="<table>";
		tmpstr+="<tr><td>";
		if(mybj==null){

		}else{
			for(i=0;i<mybj.length;i++){
				tmpstr+="<div class='lef_menu' onClick=delbj("+i+")>"+mybj[i][0].substr(1,1)+"年级"+mybj[i][0].substr(3,2) +"班</div>";
			}
		}
		tmpstr+="</td></tr>";
	for (var i = 0; i < bjtree.length; i++) {
		tmpstr+="<tr><td align='center' width='100%'><div  class='row' >"+bjtree[i][0][2].substr(1,1) 
		+"年级</div><div id=a"+i+" style='block'  >";
		for (var j = 1; j <bjtree[i].length; j++) {
			if(bjtree[i][j][3]==0){
			tmpstr+="<div class='lef_menu' onClick=addbj("+bjtree[i][j][0]+","+bjtree[i][j][1]+") >"
			+bjtree[i][j][2].substr(3,2) +"</div>";
			}else{
			tmpstr+="<div class='lef_menu_xz'  >"+bjtree[i][j][2].substr(3,2) +"</div>";
			}
		}
		tmpstr+="</div></td></tr>";
		}
	tmpstr+="</table>";
	document.getElementById("bjtree").innerHTML=tmpstr;   
}

function delbj(i){
	bjtree[mybj[i][1]][mybj[i][2]][3]=0;
	mybj.splice(i,1);
	bj_menu();
	dispbj();
	selebj(0);
	localStorage.setItem("mybj", JSON.stringify(mybj));
	localStorage.setItem("bjstree", JSON.stringify(bjtree));
}

function addbj(nj,bj){
	if(mybj==null){mybj=[];}
	addxs(bjtree[nj][bj][2],data[nj][bj]);
	tmp=[bjtree[nj][bj][2],nj,bj];
	mybj.push(tmp);
	bjtree[nj][bj][3]=1;
	selebj(mybj.length-1);
	dispbj();
	bj_menu();
	localStorage.setItem("mybj", JSON.stringify(mybj));
	localStorage.setItem("bjstree", JSON.stringify(bjtree));
}


function loadFromData(){
   bjtree=[];
	for(i=0;i<data.length;i++){	
			n=((mdate.getMonth()<8)?mdate.getFullYear()-data[i][0]:mdate.getFullYear()-data[i][0]+1);
      		bjitem=[];
      		bjm="n"+n;
      	for(j=0;j<data[i].length;j++){
      		njm="b"+data[i][j][0];
			bjxx=[i,j,bjm+njm,0];
			bjitem.push(bjxx);
		}
		bjtree.push(bjitem);
     }
localStorage.setItem("bjstree", JSON.stringify(bjtree));
}

function addFromNet() {
	
}

function lx() {//乱序
	zs=xsarr.length-2;
	for(i=zs;i>0;i--){
			r=Math.floor(Math.random()*i)+1;
			j=xsarr[i][7];
			xsarr[i][7]=xsarr[r][7];
			xsarr[r][7]=j;
		}
	}

function pzw() {//排座位
		
}
	
function xssave(){
	json=JSON.stringify(xsarr);
	localStorage.setItem(mybj[dqbjxh][0],json); 
}

function dm() {//随机点名
	bjdmxh++;
 		if(bjdmxh>xsarr.length-1){
   			lx();
   			bjdmxh=1;
   		}
   	xsarr[0][7]=bjdmxh;	
	ydxm.push(xsarr[bjdmxh][7]);
	document.getElementById("xsxm").innerHTML=xsarr[xsarr[bjdmxh][7]][1];
	xssave();
//	jflb();
}
	
function jflb(){
		dmstr="";
		for (var xi = 0; xi < ydxm.length; xi++) {
			dmstr+="<div onClick=deljf("+xi+")>"+xsarr[ydxm[xi]][1]+"</div>";
		}
		document.getElementById("bar").innerHTML=dmstr;   
}

function deljf(dmxs){
	xsarr[ydxm[dmxs]][5]+=showDlg();
	ydxm.splice(dmxs,1);
	jflb();
}

function addxs(bj,xss){//添加学生
	xsarr=[];
	for (k=0;k<xss.length;k++) {
		addNewxs(xss[k],k);
	}	
	lx();
	json=JSON.stringify(xsarr);//对象转化为josn字符串         
	localStorage.setItem(bj,json);          
}
	  
function addNewxs(xm,xsxh){
	var tem=new Array();
	tem[0]=xsxh;
	tem[1]=xm;//序号
	tem[2]=-1;//座位x
	tem[3]=-1;//座位
	tem[4]=-1;//组号
	tem[5]=0;//分数
	tem[6]=0;
	tem[7]=xsxh;//列表
	xsarr.push(tem);
}
		 
function delxs(index) {//删除学生
	alert("del"+index);
	xsarr.splice(index,1);
	xinxi(true);
	xssave();
}
	
function xinxi(editbz) {//返回信息
   	var xstr=bjdmxh+"<br/><table width='100%'>";
   	xstr+="<tr><td>序号</td><td>姓名</td><td>座位x</td><td>座位y</td><td>组号</td><td>分数</td><td>类别</td><td>shunx</td>";
   	if(editbz){
   			xstr+="<td>编辑</td><td>删除</td></tr><tr>";
   		}else{
   			xstr+="</tr><tr>";
   		}
   	for(i=1;i<xsarr.length;i++){
   		   	for(j=0;j<xsarr[i].length;j++){      		
      		xstr+="<td>"+xsarr[i][j]+"</td>";
      	}
    	if(editbz){
   	 	 	xstr+="<td><div>E</div></td><td><div onClick='delxs("+i+")'>X<div></td><tr/>";
    	}else{
      		xstr+="<tr/>";
		}   	
   	}
   	xstr+="</table>";
   document.getElementById("test").innerHTML=xstr;   
}

function mytime(){
 	var ldate=new Date();
	mstime=ldate.getTime();
	document.getElementById("mtime").innerHTML=mm+":"+ms;
	if(mstime-mms>999){  ms++; mms=mstime;}
	if(ms>59){   ms=0; mm++; }
	setTimeout("mytime()",500);
	}
function resettime(){
	ms=0;
	mm=0;
	mytime();
	}
