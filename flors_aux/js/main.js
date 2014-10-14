function main() {
	document.addEventListener("deviceready", aplicacionIniciada, false); // Al inciar la app
	document.addEventListener("pause", aplicacionPausada, false);        // Al pausar la app
	document.addEventListener("resume", aplicacionReiniciada, false);    // Al reiniciar la app
	document.addEventListener("online", phonegapOnline, false);          // Phonegap tiene acceso a internet
	document.addEventListener("offline", phonegapOffline, false);        // Phonegap NO tiene acceso a internet
	document.addEventListener("menubutton", menuPulsado, false);         // Se ha pulsado la tecla menú
	document.addEventListener("searchbutton", menuPulsado, false);       // Se ha pulsado la tecla búsqued
}

function aplicacionIniciada()
{
	alert(checkConnection());
    if (checkConnection()=="none")
    {
        $.mobile.changePage("#dialegError");
    }    
    else{
		//checkLocale();
		onSoc();
		FastClick.attach(document.body);
		setTimeout(fixContentHeight,2000);
		
    }
	document.addEventListener("backbutton", atrasPulsado, false);
}

function atrasPulsado()
{
    if  ($.mobile.activePage.is('#mainContainer')){
    	var msgOut="";
    	if (currentIdioma=="ca") msgOut="Desitges sortir?";
    	if (currentIdioma=="es") msgOut="Deseas salir?";
    	
	    if (confirm(msgOut) == true) {
	        navigator.app.exitApp();
	    }    	
    }
}
 
function aplicacionPausada()
{
}
 
function aplicacionReiniciada()
{
}
 
function phonegapOnline()
{
}
 
function phonegapOffline()
{
}
 
function menuPulsado()
{
	
}
 
function busquedaPulsado()
{
}