function init(){
	var selex;//班级列表
		sele="<select id='pid' onchange='gradeChange()'>"
		for (selex in date){
			sele+="<option value="+selex+">"+date[selex].bj+"</option>";
		}
		sele+="</select>"
		document.getElementById("bj").innerHTML=sele;
		jsq();
		bjsele(0);//选择第一个班级
}

function gradeChange(){//班级改变
    var objS = document.getElementById("pid");
    var grade = objS.options[objS.selectedIndex].value;
    bjsele(grade);
    }

function jsq(){//计数器
	bjjsq=localStorage.getItem("bjsq");
	//alert(bjjsq);
	if(bjjsq==null){
		initdata();//初始化数据
		bjjsq=1;//计数器置1		
	}
	else
	{
		bjjsq=Number(bjjsq)+1;//计数器+1
	}
    localStorage.setItem("bjsq",bjjsq);
}

function initdata(){//初始化数据
initstr="";
 var di;//
 for (di in date){
   initstr=sjsl(date[di].xm.length); //重新排序
   localStorage.setItem(date[di].bc,initstr);//存储
 }
 
 kbstr="";
  for(i=0;i<60;i++){//初始化课程表
	 	kbstr+= String.fromCharCode(0);
	 }
   localStorage.setItem("kbcc",kbstr);//存储
 }

function dm(){//点名
index=bjstr.substr(0,1).charCodeAt(0);
bjstr=bjstr.substr(1,bjstr.length-1);
if (bjstr.length<=0){
	bjstr=sjsl(date[dqbj].xm.length);
	}
	localStorage.setItem(date[dqbj].bc,bjstr);	
	twxm.push(xm[index]);
	xstwxm();
return xm[index];
}

function xstwxm(){//点名列表
xsstr="";
j=twxm.length;
for (i=0;i<j;i++){
	xsstr+="<div onclick='deltwxm("+i+")'>"+twxm[i]+"</div><br>";
	}
	document.getElementById("txm").innerHTML=xsstr;
}

function deltwxm(deli){//删除点名列表
twxm.splice(deli,1);
xstwxm();
}

function sjsl(sjzs){//重新排序
	var a =new Array();
	str="";
	for (i=0;i<sjzs;i++){
		a[i]=i;
		}
	for (i=sjzs;i>0;i--){
		j=Math.floor(Math.random()*i);
		temp=a[i-1];
		a[i-1]=a[j];
		a[j]=temp;
		}
	for(i=0;i<sjzs;i++){
		str+=String.fromCharCode(a[i]);
		}
	return	str;
	}

function bjsele(bjindex){//班级选择
		twxm.length=0;
        xm=date[bjindex].xm;
		bjstr=localStorage.getItem(date[bjindex].bc);
		dqbj=bjindex;
		//alert(xm+bjstr);
}

function xskb(){
	kbsj=localStorage.getItem("kbcc");
	kbstr="";
	kbstr+="<table width=100% border=='1' cellpadding='1'>";
	kbstr+="<tr>";
	kbstr+="<td onclick='kbkgc()'>";
	if(kbkg==1){kbstr+="edit";}else{kbstr+=" ";}
	kbstr+="</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td> </tr>";
	for(i=0;i<imax;i++){
		kbstr+="<tr>";
		kbstr+="<td>"+jc[i]+"</td>";
		for(j=0;j<=4;j++){
			kindex=i*5+j;
			kcbj=Number(kbsj.substr(kindex,1).charCodeAt(0));
			kbstr+="<td onclick='editkb("+kindex+","+kcbj+")'>";
			if(kcbj==0){
				kbstr+="";
			}else{
				//alert(kcbj);
			kbstr+=date[kcbj-1].bj;}
			kbstr+="</td>";
		}
		kbstr+="</tr>";
	}
	kbstr+="</table>";
	document.getElementById("txm").innerHTML=kbstr;
}


function kbkgc(){//课表编辑开关
	kbkg=kbkg*-1;
	xskb();
}

function editkb(kindex,k){//编辑课表
    kbsj=localStorage.getItem("kbcc");
	if (kbkg==1){
		k--;
		if (k<0){k=bjzs;}
	}
	kbsjtemp=kbsj.substr(0,kindex)+String.fromCharCode(k)+kbsj.substr(kindex+1,(imax*5-kindex));
	localStorage.setItem("kbcc",kbsjtemp);
	xskb();
    //alert("wz:"+kindex+"kc:"+k+"shuju:" +kbsjtemp);
}
/*功能:
能添加删除学生
能选择尖子生、vip学生
使用次数计数		

*/