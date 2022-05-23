var alfa=0;
var gif=0;
var full=0;
var min=0;
var cam=0;
var terminal=document.getElementsByClassName("terminal");
var calcolatrice=document.getElementsByClassName("calcolatrice");
var weath=document.getElementsByClassName("weath");
var count=0;
var n1=0; var n2=0;
var expression=0;
var op=0;
var typing=1;
var temp=document.querySelector(".temp");
var desc=document.querySelector(".desc");
var city=document.querySelector(".city");
var img=document.querySelector(".img_temp");


document.addEventListener("keypress", function(event) {
    if (event.code === 'Enter') {
        let obj=document.activeElement;
        let text=document.getElementById("textarea");
        if(obj.id==text.id){
            myfunction(obj);  
        }          
    }
    else{
        let obj=document.activeElement;
        let text=document.getElementById("textarea");
        if(obj.id==text.id){
            if(event.code != "Escape")
                obj.value+=event.key;
        }
    }        
});

document.addEventListener("keyup", function(event){
});

document.addEventListener("keyup", function(event) {
    let text=document.getElementById("textarea");
    let obj=document.activeElement;
    if (event.code === 'Escape') {
        if(obj.id==text.id){
            if(alfa==1) {
                alfa=2;
                myfunction(obj);
            }
        }
    }
    else if(event.code === 'Backspace'){
        if(obj.id==text.id){
        if(obj.value[obj.value.length-2] != "$")
            obj.value = obj.value.slice(0, obj.value.length - 1);
        }
    }
});

const d = document.getElementsByClassName("draggable");

for (let i = 0; i < d.length; i++) {
    d[i].style.position = "relative";
}

window.onload=function(){
    document.body.style.backgroundImage="url(assets/background/jelly.jpg)";
    document.getElementById("textarea").value="howtogeek@ubuntu:~$ ";
    terminal[0].style.display="none";
    calcolatrice[0].style.display="none";
    weath[0].style.display="none";
}

function weather(obj){
    obj=obj.parentNode;
    obj=obj.childNodes[1];
    let città=obj.value;
    città=città.toLowerCase();
    obj=obj.parentNode;
    obj=obj.parentNode; 
    obj=obj.childNodes[5];
    var url="https://api.openweathermap.org/data/2.5/weather?q="+città+"&appid=6603940fe74f4b6b882fabe11eb31047";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var nameValue=data["name"];
            var tempValue=data["main"]["temp"];
            var descValue=data["weather"][0]["description"];
            var imgValue="http://openweathermap.org/img/wn/"+data["weather"][0]["icon"]+"@2x.png";
            obj=obj.childNodes[1];
            obj=obj.childNodes[3];
            obj.innerHTML=nameValue;
            obj=obj.parentNode;
            obj=obj.childNodes[1];
            obj.src=imgValue;
            obj=obj.parentNode.parentNode;
            obj=obj.childNodes[3];
            tempValue=Math.floor(tempValue);
            obj.innerHTML=tempValue-273;
            obj.innerHTML+=" C°";
            obj=obj.parentNode;
            obj=obj.childNodes[5];
            console.log(obj);
            obj.innerHTML=descValue;
        })
    .catch(err => alert("Wrong city name"));
}

function filter(e) {
    let target = e.target;
  
    if (!target.classList.contains("draggable")) {
        return;
    }
    if((target.id=="bar" && min==1) || (target.id=="bar" && full==1)){
        return;
    }
    target = target.parentNode;
    console.log(target);
    target.moving = true;
    target.style.zIndex=1000;
  
    //NOTICE THIS 👇 Check if Mouse events exist on users' device
    if (e.clientX) {
      target.oldX = e.clientX; // If they exist then use Mouse input
      target.oldY = e.clientY;
    } else {
      target.oldX = e.touches[0].clientX; // Otherwise use touch input
      target.oldY = e.touches[0].clientY;
    }
    //NOTICE THIS 👆 Since there can be multiple touches, you need to mention which touch to look for, we are using the first touch only in this case
  
    target.oldLeft = window.getComputedStyle(target).getPropertyValue('left').split('px')[0] * 1;
    target.oldTop = window.getComputedStyle(target).getPropertyValue('top').split('px')[0] * 1;
  
    document.onmousemove = dr;
    //NOTICE THIS 👇
    document.ontouchmove = dr;
    //NOTICE THIS 👆
  
    function dr(event) {
      event.preventDefault();
  
      if (!target.moving) {
        return;
      }
      //NOTICE THIS 👇
      if (event.clientX) {
        target.distX = event.clientX - target.oldX;
        target.distY = event.clientY - target.oldY;
      } else {
        target.distX = event.touches[0].clientX - target.oldX;
        target.distY = event.touches[0].clientY - target.oldY;
      }
      //NOTICE THIS 👆
  
      target.style.left = target.oldLeft + target.distX + "px";
      target.style.top = target.oldTop + target.distY + "px";
    }
  
    function endDrag() {
      target.moving = false;
      target.style.zIndex=0;
    }
    target.onmouseup = endDrag;
    //NOTICE THIS 👇
    target.ontouchend = endDrag;
    //NOTICE THIS 👆
  }
  document.onmousedown = filter;
  //NOTICE THIS 👇
  document.ontouchstart = filter;
  //NOTICE THIS 👆

const order=new Promise((resolve) =>{
    setTimeout(() =>{
        resolve(appear(document.getElementsByClassName('interface')[0], 0, 5, 60))
    }, 500);
});
order
    .then(appear(document.getElementsByClassName('title')[0], 0, 5, 60));

function appear(elm, i, step, speed){
    var t_o;
    //initial opacity
    i = i || 0;
    //opacity increment
    step = step || 5;
    //time waited between two opacity increments in msec
    speed = speed || 50; 

    t_o = setInterval(function(){
        //get opacity in decimals
        var opacity = i / 100;
        //set the next opacity step
        i = i + step; 
        if(opacity > 1 || opacity < 0){
            clearInterval(t_o);
            //if 1-opaque or 0-transparent, stop
            return; 
        }
        //modern browsers
        elm.style.opacity = opacity;
        //older IE
        elm.style.filter = 'alpha(opacity=' + opacity*100 + ')';
    }, speed);
}

function wait(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function command(str){
    let count=0;
    let i=str.length-1;
    let comando="";
    for(; str[i]!="$" && str[i]!="\n"; i--){
        count++;
    }
    if(str[i]=="$"){
        for(var j=2; j<count+1; j++){
            comando+=str[i+j];
        }
    }
    if(str[i]=="\n"){
        for(var j=1; j<count+1; j++){
            comando+=str[i+j];
        }
    }
    return comando;
}

function somma(str, pos){
    var a=0;
    while(pos<str.length){
        let num="";
        while(str[pos]!=" ") {
            num+=str[pos];
            pos++;
        }
        a+=parseFloat(num);
        if(str[pos]!=" ") pos+=2;
        else pos++;
    }
    return a;
}

function sottrazione(str, pos){
    var a;
    let count=0;
    while(pos<str.length){
        let num="";
        while(str[pos]!=" ") {
            num+=str[pos];
            pos++;
        }
        if(count==0) a=parseFloat(num);
        else a-=parseFloat(num);
        if(str[pos]!=" ") pos+=2;
        else pos++;
        count++;
    }
    return a;
}

function moltiplicazione(str, pos){
    var a;
    let count=0;
    while(pos<str.length){
        let num="";
        while(str[pos]!=" ") {
            num+=str[pos];
            pos++;
        }
        if(count==0) a=parseFloat(num);
        else a*=parseFloat(num);
        if(str[pos]!=" ") pos+=2;
        else pos++;
        count++;
    }
    return a;
}

function divisione(str, pos){
    var a;
    let count=0;
    while(pos<str.length){
        let num="";
        while(str[pos]!=" ") {
            num+=str[pos];
            pos++;
        }
        if(count==0) a=parseFloat(num);
        else a/=parseFloat(num);
        if(str[pos]!=" ") pos+=2;
        else pos++;
        count++;
    }
    return a;
}

function suono(){
    alfa=1;
    let res="Scegliere cosa suonare o premere esc per uscire: \n";
    res+="-> Za Warudo\n";
    res+="-> Mario Fall\n";
    return res;
}

function playSound(str){
    str=str.toLowerCase();
    switch(str){
        case "za warudo ":
            chgBK("z");
            var a=new Audio("assets/music/ZAWARUDO.mp3");
            a.play();
            break;
        case "mario fall ":
            var a=new Audio("assets/music/MarioFall.mp3");
            a.play();
            break;
        default: break;
    }
    let res="Now Playing.";
    alfa=0;
    return res;
}

function chgBK(str, pos){
    var changeBK=document.body; 
    if(str.length<=1){
        switch(str){
            case "z":
                gif=1;
                changeBK.style.backgroundImage="url(assets/background/ZA_WARUDO.gif)";
                changeBK.style.backgroundSize="100% 100%";
                changeBK.style.backgroundRepeat="no-repeat";
                break;
            default: break;
        }
    }   
    else{
        let col="";
        while(str[pos]!=" "){
            col+=str[pos];
            pos++;
        }
        changeBK.style.backgroundImage="";
        changeBK.style.backgroundColor=col;
        
        var res="Fatto!";
        return res; 
    }
    return;
}

function fullscreen(obj){
    var button=obj;
    obj=obj.parentNode;
    obj=obj.parentNode;
    obj=obj.parentNode;
    var bar=obj;
    obj=obj.parentNode;
    var ter=obj;
    obj=obj.childNodes[3];
    var write=obj;

    
    if(full==0){
        ter.style.left="-40px";
        ter.style.top="15.5%";
        ter.style.width="100%";
        ter.style.height="100%";
        write.style.overflow="hidden";
        write.style.width="100.2%";
        write.style.height="100%";
        bar.style.borderRadius="0px";
        bar.style.width="100%";
        bar.style.height="3%";
        ter.style.zIndex="1000";
        full=1;
        min=0;
    }
    else if(full==1){
        ter.style.top="300px";
        ter.style.width="40%";
        ter.style.height="40%";
        write.style.overflow="hidden";
        bar.style.borderTopLeftRadius="10px";
        bar.style.borderTopRightRadius="10px";
        bar.style.height="6%";
        ter.style.zIndex="0";
        full=0;
    }
}

function minimize(obj){
    obj=obj.parentNode;
    obj=obj.parentNode;
    obj=obj.parentNode;
    var bar=obj;
    obj=obj.parentNode;
    var ter=obj;
    obj=obj.childNodes[3];
    var write=obj;
    if(min==0){
        ter.style.left="-40px";
        ter.style.top="15.5%";
        ter.style.width="0%";
        ter.style.height="0%";
        write.style.overflow="hidden";
        write.style.width="0%";
        write.style.height="0%";
        bar.style.width="22px";
        bar.style.height="58px";
        bar.style.borderBottomLeftRadius="10px";
        bar.style.borderBottomRightRadius="10px";
        bar.style.overflow="hidden";
        ter.style.zIndex="0";
        min=1;
        full=0;
    }
    else if(min==1){
        ter.style.top="300px";
        ter.style.width="40%";
        ter.style.height="40%";
        write.style.overflow="hidden";
        write.style.width="100.2%";
        write.style.height="100%";
        bar.style.borderTopLeftRadius="10px";
        bar.style.borderTopRightRadius="10px";
        bar.style.borderBottomRightRadius="0px";
        bar.style.borderBottomLeftRadius="0px";
        bar.style.width="100%";
        bar.style.height="6%";
        ter.style.zIndex="0";
        min=0;
    }
}

function xClose(obj){
    obj=obj.parentNode;
    obj=obj.parentNode;
    obj=obj.parentNode;
    obj=obj.parentNode;
    obj.style.zIndex=0;
    full=0;
    min=0;
    obj.remove();
    tExists=0;
}
function cClose(obj){
    obj=obj.parentNode;
    obj=obj.parentNode;
    obj.style.zIndex=0;
    obj.remove();
}
function wClose(obj){
    obj=obj.parentNode;
    obj=obj.parentNode;
    obj=obj.parentNode;
    obj.style.zIndex=0;
    obj.remove();
}

function webcam(){
    let video=document.getElementById("vid");
    let canvas=document.getElementById("canvas");
    if(cam==0){
        var mediaDevices=navigator.mediaDevices;
        video.style.width="50%";
        video.style.height="50%";
        video.muted="true";

        //prende la fonte media utilizzata dallo user
        mediaDevices
        .getUserMedia({
            video:true,
            audio:true,
        })
        //dice cosa fare col media acquisito
        .then((stream) =>{
            video.srcObject=stream;
            video.addEventListener("loadedmetadata", () =>{
                video.play();
            })
        })
        .catch(alert);
        cam=1;

        return "Che sei bello!";
    }
    if(cam==1){
        video.style.width="0%";
        video.style.height="0%";
        cam=0;
        return "Ok ciao :("
    }   
}

function comandi(){
    var str="";
    str+="Ecco la lista dei comandi: \n";
    str+="-> sum <num num ...> \n";
    str+="-> sub <num num ...> \n";
    str+="-> mul <num num ...> \n";
    str+="-> div <num num ...> \n";
    str+="-> background <colore> \n"
    str+="-> sound \n";
    str+="-> video";
    return str;
}

function clear(){
    return "clear";
}

function display(n, o){
    o=o.parentNode;
    o=o.parentNode;    
    o=o.parentNode;    
    o=o.parentNode;    
    o=o.parentNode;    
    o=o.parentNode;
    o=o.childNodes[3];
    o=o.childNodes[0];
    let text=o;
    if(n=="C"){
        count=0;
        n1=0; n2=0;
        text.value="";
        expression=0;
        op="";
        typing=0;
    }
    else if((n!="+") && (n!="-") && (n!="/") && (n!="x") && (n!="=")){
        if(text.value=="0" && n!="."){
            text.value="";
        }
        if(expression==1){
            if(op!="=" && typing==0) {
                n1=text.value;
                text.value=op;
                typing=1;
            }
            count=2;
        }
        text.value+=n;
    }
    else if(n=="=" && text.value=="") {
        text.value="0";
        count=0;
    }
    else{
        typing=0;
        count++;
        if(count==1){
            n1=text.value;
            if(n!="=") text.value=n;
            return;
        }
        else if(count>=2){
            count=0;
            n2=text.value;
            calcSelector(n, text);
        }
    }
}

function calcSelector(n, text){
    let res;
    if(n!="="){
        switch(n2[0]){
            case "+": res=cSum(n1, n2); expression=1; op=n; text.value=res; n1=0; n2=0; break;
            case "-": res=cSub(n1, n2); expression=1; op=n; text.value=res; n1=0; n2=0; break;
            case "x": res=cMul(n1, n2); expression=1; op=n; text.value=res; n1=0; n2=0; break; 
            case "/": res=cDiv(n1, n2); expression=1; op=n; text.value=res; n1=0; n2=0; break;
            case "=":
                switch(text.value[0]){
                    case "+": res=cSum(n1, n2); text.value=res; n1=0; n2=0; expression=0; break;
                    case "-": res=cSub(n1, n2); text.value=res; n1=0; n2=0; expression=0; break;
                    case "x": res=cMul(n1, n2); text.value=res; n1=0; n2=0; expression=0; break; 
                    case "/": res=cDiv(n1, n2); text.value=res; n1=0; n2=0; expression=0; break;
                    case "=": text.value="0"; expression=0; break;
                    default: break;
                }
        }
    }
    else{
        switch(n){
            case "+": res=cSum(n1, n2); expression=1; op=n; text.value=res; n1=0; n2=0; break;
            case "-": res=cSub(n1, n2); expression=1; op=n; text.value=res; n1=0; n2=0; break;
            case "x": res=cMul(n1, n2); expression=1; op=n; text.value=res; n1=0; n2=0; break; 
            case "/": res=cDiv(n1, n2); expression=1; op=n; text.value=res; n1=0; n2=0; break;
            case "=":
                switch(text.value[0]){
                    case "+": res=cSum(n1, n2); text.value=res; n1=0; n2=0; expression=0; break;
                    case "-": res=cSub(n1, n2); text.value=res; n1=0; n2=0; expression=0; break;
                    case "x": res=cMul(n1, n2); text.value=res; n1=0; n2=0; expression=0; break; 
                    case "/": res=cDiv(n1, n2); text.value=res; n1=0; n2=0; expression=0; break;
                    case "=": text.value="0"; expression=0; break;
                    default: break;
                }
        }
    }
}

function cSum(text1, text2){
    console.log("n1:"+text1+"n2:"+text2);
    let numero="";
    console.log(text1, text2);
    let n1; let n2;
    for(let i=0; i<text1.length; i++){
        numero+=text1[i];
    }
    if(text1=="") numero="0";
    n1=parseFloat(numero);
    numero="";
    for(let i=1; i<text2.length; i++){
        numero+=text2[i];
    }
    n2=parseFloat(numero);
    let res=n1+n2;
    console.log(res);
    return res;
}
function cSub(text1, text2){
    let numero="";
    console.log(text1, text2);
    let n1; let n2;
    for(let i=0; i<text1.length; i++){
        numero+=text1[i];
    }
    if(text1=="") numero="0";
    n1=parseFloat(numero);
    numero="";
    for(let i=1; i<text2.length; i++){
        numero+=text2[i];
    }
    n2=parseFloat(numero);
    let res=n1-n2;
    console.log(res);
    return res;
}
function cMul(text1, text2){
    let numero="";
    console.log(text1, text2);
    let n1; let n2;
    for(let i=0; i<text1.length; i++){
        numero+=text1[i];
    }
    if(text1=="") numero="0";
    n1=parseFloat(numero);
    numero="";
    for(let i=1; i<text2.length; i++){
        numero+=text2[i];
    }
    n2=parseFloat(numero);
    let res=n1*n2;
    console.log(res);
    return res;
}
function cDiv(text1, text2){
    let numero="";
    console.log(text1, text2);
    let n1; let n2;
    for(let i=0; i<text1.length; i++){
        numero+=text1[i];
    }
    if(text1=="") numero="0";
    n1=parseFloat(numero);
    numero="";
    for(let i=1; i<text2.length; i++){
        numero+=text2[i];
    }
    n2=parseFloat(numero);
    let res=n1/n2;
    console.log(res);
    return res;
}

function copyT(){
    const div = terminal[0];
    const clone = div.cloneNode(true);
    clone.classList = "terminal";
    clone.style.display="inline-block"
    clone.style.marginTop="-150px";
    clone.style.zIndex="0";
    document.body.appendChild(clone);
    return;
}

function copyC(){
    const div = calcolatrice[0];
    const clone = div.cloneNode(true);
    clone.classList = "calcolatrice";
    clone.style.display="inline-block"
    clone.style.marginTop="-150px";
    clone.style.zIndex="0";
    document.body.appendChild(clone);   
    return;
}
function copyW(){
    const div = weath[0];
    const clone = div.cloneNode(true);
    clone.classList = "weath";
    clone.style.display="inline-block"
    clone.style.marginTop="-150px";
    clone.style.zIndex="0";
    document.body.appendChild(clone);   
    return;
}

function funzioni(str){
    if(gif==1){
        let changeBK=document.body; 
        changeBK.style.backgroundImage="url(assets/background/jelly.jpg)";
    }
    var command="";
    var pos=0;
    var res;
    var Sres="";
    while(str[pos]!=" "){
        command+=str[pos];
        pos++;
    }
    pos++;
    command=command.toLowerCase();
    switch(command){
        case "sum":
            res=somma(str, pos); break;
        case "div":
            res=divisione(str, pos); break;
        case "mul":
            res=moltiplicazione(str, pos); break;
        case "sub":
            res=sottrazione(str, pos); break;
        case "sound":
            Sres=suono(); break;
        case "background":
            Sres=chgBK(str, pos); break;
        case "video":
            Sres=webcam(); break;
        case "clear":
            Sres=clear(); break;
        case "commands":
            Sres=comandi(); break;
        case "comandi":
            Sres=comandi(); break;
        default: break;
    }
    if(Sres=="") return res;
    else return Sres;
}

function myfunction(obj){
    console.log(obj);
    var txtra=obj;
    str=txtra.value;
    str+=" ";
    var comando = command(str);
    console.log("comando: "+comando);
    if(alfa==0) var risultato=funzioni(comando);
    else if(alfa==1) var risultato=playSound(comando);
    else if(alfa==2) {
        var risultato="Va bene :(";
        alfa=0;
    }

    console.log("tipo del risultato: "+typeof(risultato));
    if(typeof(risultato)==='number') txtra.value+="\nIl risultato è: "+risultato;
    else if(risultato=="clear") txtra.value="";
    else if(typeof(risultato)==='string') txtra.value+="\n"+risultato;
    else txtra.value+="\ncomando non valido";

    if(alfa==0){
        if(str[str.length-1]!="\n")
            txtra.value+="\nhowtogeek@ubuntu:~$ ";
        else txtra.value+="howtogeek@ubuntu:~$ "; 
    }

}
    