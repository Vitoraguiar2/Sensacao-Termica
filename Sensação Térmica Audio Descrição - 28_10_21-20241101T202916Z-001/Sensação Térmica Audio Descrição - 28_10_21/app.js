function HeatIndex(){
    const TA = document.getElementById("TA");
    var aux_tmp = TA.value;
    aux_tmp = aux_tmp.replace(/,/g, '.');
    aux_tmp = parseFloat(aux_tmp);
    if((aux_tmp%1)!=0)
        aux_tmp = aux_tmp.toFixed(1);
    document.getElementById("TA").value = aux_tmp;
    const RH = document.getElementById("RH");
    var aux_rh = RH.value;
    aux_rh = aux_rh.replace(/,/g, '.');
    aux_rh = parseFloat(aux_rh);
    if((aux_rh%1)!=0)
        aux_rh = aux_rh.toFixed(1);
    document.getElementById("RH").value = aux_rh;
    if(aux_tmp>100){
        aux_tmp=100;
        document.getElementById("TA").value = 100;
    }
    if(aux_tmp<-100){
        aux_tmp=-100;
        document.getElementById("TA").value = -100;
    }
    if(isNaN(aux_tmp)||isNaN(aux_rh))
        document.getElementById("HI").value = "";
    if(aux_rh > 100){
        aux_rh=100;
        document.getElementById("RH").value = 100;
    }
    if(aux_rh < 0){
        aux_rh=0;
        document.getElementById("RH").value = 0;
    }
    aux_rh = parseFloat(aux_rh);
    aux_tmp = parseFloat(aux_tmp); 
    var IC = aux_tmp - (0.55 / 100) * (1 - aux_rh) * (aux_tmp-14);
    if(isNaN(IC)==false){
        IC=IC.toFixed(1);
        document.getElementById("HI").value=IC+"° C";   
    }
    return IC;
}

function Tocar(){//ideia básica
    var ic = HeatIndex();
    const TA = document.getElementById("TA");
    var tmp = parseFloat(TA.value);
    const RH = document.getElementById("RH");
    var ur = parseFloat(RH.value);
    var audiotmp = new Audio("audio/temperatura.ogg");
    var audiorh = new Audio("audio/umidade.ogg");
    var audioic = new Audio("audio/indice.ogg");
    var medidatmp = new Audio("audio/celsius.ogg");
    var medidarh = new Audio("audio/porcento.ogg");
    var medidaic = new Audio("audio/celsius.ogg");
    if(isNaN(ic)==false){
        audiotmp.play();
        audiotmp.onended=function(){
            AudioNum(tmp).onended=function(){
                medidatmp.play();
                medidatmp.onended=function(){
                    audiorh.play();
                    audiorh.onended=function(){
                        AudioNum(ur).onended=function(){
                            medidarh.play();
                            medidarh.onended=function(){
                                audioic.play();
                                audioic.onended=function(){
                                    AudioNum(ic).onended=function(){
                                        medidaic.play();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else{
        if(isNaN(tmp)==false){
            audiotmp.play();
            audiotmp.onended=function(){
                AudioNum(tmp).onended=function(){
                    medidatmp.play();
                }
            }
        }
        if(isNaN(ur)==false){
            audiorh.play();
            audiorh.onended=function(){
                AudioNum(ur).onended=function(){
                    medidarh.play();
                }
            }
        }
    }
}

function AudioNum(num){//descobrir o valor e tocar ele;
    if(num < 0){
        negativo = 1;
        num = (num)*(-1);
        var menos = new Audio("audio/menos.ogg");
    }
    else
        negativo = 0;
    aux = num - (num%100);
    if(aux != 0){
        var centena = new Audio("audio/100.ogg");
        var audio = centena;
    }
    aux2 = num - aux;
    aux = num - (num%10);
    if(aux!=0){
        if(aux2<20){
            aux3 = aux2 - parseInt(num%1);
            aux3 = parseInt(aux3);
            var dezena = new Audio("audio/"+aux3+".ogg");
            var audio = dezena;
        }
        else{
            aux3 = aux2 - parseInt(num%10);
            aux3 = parseInt(aux3);
            var dezena = new Audio("audio/"+aux3+".ogg");
            var audio = dezena;
        }
        if(aux2 >= 20 && (num%10)!=0)
            var complemento = new Audio("audio/e.ogg");
    }
    aux3 = (num%10);
    aux3 = parseInt(aux3);
    if((aux3 != 0) && ((num >= 20)|| (num < 10))){
        var unidade = new Audio("audio/"+aux3+".ogg");
        var audio = unidade;
    }
    else{
        if(num < 1){
            var unidade = new Audio("audio/0.ogg");
            var audio = unidade;
        }
    }
    if((num%1)!= 0){
        aux3 = Math.floor(num);
        aux3 = num - aux3;
        aux3 = aux3.toFixed(1);
        aux3 = aux3*10;
        var virgula = new Audio("audio/virgula.ogg");
        var decimal = new Audio("audio/"+aux3+".ogg");
        var audio = decimal;
    }
    if(num==100){//|100|
        audio=centena;
        if(negativo==1){//-100
            menos.play();
            menos.onended=function(){
                centena.play();
            }
        }
        else{//100
            centena.play();
        }
    }
    else{
        if(negativo==1){
            menos.play();
            menos.onended=function(){
                if(num>=10){
                    if((num%10)!=0 && num >= 20){ 
                        dezena.play();
                        dezena.onended=function(){
                            if((num%10)-(num%1)==0){
                                virgula.play();
                                virgula.onended=function(){
                                    decimal.play();
                                }
                            }
                            else{
                                complemento.play();
                                complemento.onended=function(){
                                    if((num%1)==0){
                                        unidade.play();
                                    }
                                    else{
                                        unidade.play();
                                        unidade.onended=function(){
                                            virgula.play();
                                            virgula.onended=function(){
                                                decimal.play();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else{
                        if((num%1)==0){
                            dezena.play();
                        }
                        else{
                            dezena.play();
                            dezena.onended=function(){
                                virgula.play();
                                virgula.onended=function(){
                                    decimal.play();
                                }
                            }
                        }
                    }
                }
                else{
                    if((num%1)==0){
                        unidade.play();
                    }
                    else{
                        unidade.play();
                        unidade.onended=function(){
                            virgula.play();
                            virgula.onended=function(){
                                decimal.play();
                            }
                        }
                    }
                }
            }
        }
        else{
            if(num>=10){
                if((num%10)!=0 && num >= 20){ 
                    dezena.play();
                    dezena.onended=function(){
                        if((num%10)-(num%1)==0){
                            virgula.play();
                            virgula.onended=function(){
                                decimal.play();
                            }
                        }
                        else{
                            complemento.play();
                            complemento.onended=function(){
                                if((num%1)==0){
                                    unidade.play();
                                }
                                else{
                                    unidade.play();
                                    unidade.onended=function(){
                                        virgula.play();
                                        virgula.onended=function(){
                                            decimal.play();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    if((num%1)==0){
                        dezena.play();
                    }
                    else{
                        dezena.play();
                        dezena.onended=function(){
                            virgula.play();
                            virgula.onended=function(){
                                decimal.play();
                            }
                        }
                    }
                }
            }
            else{
                if((num%1)==0){
                    unidade.play();
                }
                else{
                    unidade.play();
                    unidade.onended=function(){
                        virgula.play();
                        virgula.onended=function(){
                            decimal.play();
                        }
                    }
                }
            }
        }
    }
    return audio;
}

var isPlaying = false;
var som = new Audio('audio/sensacaotermica.ogg');
 
som.onended=function(){
    isPlaying = false;
    som.pause();
    som.currentTime = 0;
}

function SensacaoTermica(){
    if (!isPlaying){
        isPlaying = true;
        som.play();
    } 
    else{
        isPlaying = false;
        som.pause();
        som.currentTime = 0;
    }
}