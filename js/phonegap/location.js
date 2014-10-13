var currentMunicipi="07000";
var newMunicipi="";
var idTemporitzador=null; 
var watch_idGPS = null;    
var watch_idHTML5 = null;    

var currentLat=null
var currentLon=null
    
var currentAccuracy=null
var currentHeading=null

var currentLatGPS=0
var currentLonGPS=0
var currentHeadingGPS=0
var currentHeadingHTML5=0
var currentSpeedGPS=0
var currentAccuracyGPS=0

var currentLatHTML5=0
var currentLonHTML5=0
var currentSpeedHTML5=0
var currentAccuracyHTML5=0

var tempsInicialCerca=0;
var tempsExcedit=false;

var sucessGPS=false;
var sucessHTML5=false;

var selectedLon=0
var selectedLat=0
var selectedMuni=false;
var srsCoords="ETRS89";

var map3;
var vectors3;

function startMonitor()
{
    //alert("startMonitor")
    if (idTemporitzador==null) 
    {
    	tempsInicialCerca = 0;
    	tempsExcedit = false;
        idTemporitzador = setInterval("getLoc()",5000)
    }
}

function stopMonitor()
{
    if (idTemporitzador!=null) clearInterval(idTemporitzador)
}

function getLoc()
{
	tempsInicialCerca = parseInt(parseInt(tempsInicialCerca) + 5);
	if (tempsInicialCerca>10)
	{
		if (tempsExcedit==false)
		{
			//alert("temps excedit")
			tempsExcedit=true
			$.mobile.hidePageLoadingMsg( 'Searching' );
			return;
		}
	}
	
	if (sucessGPS==true)
	{
		//Forçar Barna
		//currentLonGPS = 2.169886
		//currentLatGPS = 41.390075

		currentAccuracy = currentAccuracyGPS;

		var p1 = new OpenLayers.LonLat(currentLonGPS, currentLatGPS);
		p1.transform(new OpenLayers.Projection("EPSG:4326" ), new OpenLayers.Projection("EPSG:25831"));	

		currentLon = parseFloat(p1.lon).toFixed(0);
		currentLat = parseFloat(p1.lat).toFixed(0);
		
		alert(currentHeadingGPS);

		if (currentHeadingGPS!=null) currentHeading = parseInt(currentHeadingGPS).toFixed(0);
		
		ubica();
		
		//alert("GPS actiu: " + currentLat + "   " + currentLon + "   " + currentAccuracy)
	    //dibuixaUbicacio();	
	}
	else{
		//alert("HTML5 " + sucessHTML5)
		if (sucessHTML5==true)
		{
			//Forçar Barna
			//currentLonHTML5 = 2.169886
			//currentLatHTML5 = 41.390075
			
			currentAccuracy = currentAccuracyHTML5;
			
			var p1 = new OpenLayers.LonLat(currentLonHTML5, currentLatHTML5);
			p1.transform(new OpenLayers.Projection("EPSG:4326" ), new OpenLayers.Projection("EPSG:25831"));	
			
			currentLon = parseFloat(p1.lon).toFixed(0);
			currentLat = parseFloat(p1.lat).toFixed(0);
			
			alert(currentHeadingHTML5);
			
			if (currentHeadingHTML5!=null) currentHeading = parseInt(currentHeadingHTML5).toFixed(0);
			ubica();

			//alert("HTML5 actiu: " + currentLat + "   " + currentLon + "   " + currentAccuracy)
			//dibuixaUbicacio();	
			//initMunicipi();
		}	
	}
	
}

function onSoc()
{
    //alert("onsoc");
    if (navigator.geolocation)  
    {
    	$.mobile.showPageLoadingMsg( 'Searching' );
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
	//alert("no es pot");
    }
    
	sucessGPS=false;
	sucessHTML5=false;
	initLocationHTML5();
	initLocationGPS();
	startMonitor();
	

    //Loc SILME 
    /*
    currentAccuracy = 50;
    currentLon4326 = 4.266373;
    currentLat4326 = 39.882685;
    var p1 = new OpenLayers.LonLat(4.266373, 39.882685);
    p1.transform(new OpenLayers.Projection("EPSG:4326" ), new OpenLayers.Projection("EPSG:25831")); 
    currentLon = parseFloat(p1.lon).toFixed(0);
    currentLat = parseFloat(p1.lat).toFixed(0);
    //setHeader();
    dibuixaUbicacio(p1);    
    initMunicipi();
    */
            
	
}

function showPosition(position)
{
    currentAccuracyHTML5 = position.coords.accuracy;
    currentLonHTML5=position.coords.longitude;
    currentLatHTML5=position.coords.latitude;
    
    currentHeadingHTML5=position.coords.heading;
    sucessHTML5=true;
    if (idTemporitzador==null) 
    {
		currentAccuracy = currentAccuracyHTML5;
		var p1 = new OpenLayers.LonLat(currentLonHTML5, currentLatHTML5);
		p1.transform(new OpenLayers.Projection("EPSG:4326" ), new OpenLayers.Projection("EPSG:25831"));
		
		if (currentHeadingHTML5!=null) currentHeading = parseInt(currentHeadingHTML5).toFixed(0);
		alert(currentHeadingHTML5 + "  " + currentHeading);
		ubica();    	
    }
    $.mobile.hidePageLoadingMsg( 'Searching' );
}

function initLocationGPS()
{
    watch_idGPS = navigator.geolocation.watchPosition(
    
        // Success
        function(position){

			sucessGPS=false;
			
            currentLatGPS = position.coords.latitude
            currentLonGPS = position.coords.longitude
            currentSpeedGPS = position.coords.speed
            currentAccuracyGPS = position.coords.accuracy   
            
            
            try{
                if (parseFloat(currentAccuracyGPS)<40)
                {
                	sucessGPS=true;
                	if (position.coords.heading!=null) currentHeadingGPS = position.coords.heading
                	//alert("gps:" + position.coords.heading);
                	//alert("gps - Ok");
                	/*
                	currentLat=currentLatGPS
                	currentLon=currentLonGPS
                	currentAccuracy=currentAccuracyGPS
                	*/
                	//alert("GPS: " + currentLatGPS.toFixed(8) + " " + currentAccuracyGPS)
                	/*
                	stopLocationGPS();
                	if ((sucessHTML5==false) || (currentMunicipi=="07000"))
                	{
                		//alert("ubicacio GPS")
                		ubica();	
                	}
                	*/
                	
                }
                else{
                	sucessGPS=false;
                }
            }
            catch(err)
            {
                console.log(err.toString())
            }
        },
        
        // Error
        function(error){
        	//alert("error loc GPS")
        	sucessGPS=false;
        	/*
        	initMunicipi();
        	stopLocationGPS();
        	*/
        },
        // Settings
        { frequency: 1000, enableHighAccuracy: true, timeout: 20000});
}

function stopLocationGPS()
{
	 if (watch_idGPS != null) {
         navigator.geolocation.clearWatch(watch_idGPS);
         watch_idGPS = null;
     }
}

function MiraGeoHTML5()
{
	//alert("MiraGeoHTML5");
	/*
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }	
    */
   
	if (navigator.geolocation) {
			var timeoutVal = 10 * 1000 * 1000;
			navigator.geolocation.watchPosition(
				showPosition, 
				displayError,
				{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
			);
	}
		else {
		document.getElementById("locDataBottom").innerHTML="El teu dispositiu no permet la geolocalizació";
	}
}

function displayError(error) {
	var errors = { 
		1: 'Accéss denegat',
		2: 'Posició no disponible',
		3: 'Temps de resposta superat'
	};
	//alert("Error: " + errors[error.code]);
}

function parseTimestamp(timestamp) {
	var d = new Date(timestamp);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	var hour = d.getHours();
	var mins = d.getMinutes();
	var secs = d.getSeconds();
	var msec = d.getMilliseconds();
	return day + "." + month + "." + year + " " + hour + ":" + mins + ":" + secs;
}   




function initLocationHTML5()
{
	MiraGeoHTML5();
}

function stopLocationHTML5()
{
	 if (watch_idHTML5 != null) {
         navigator.geolocation.clearWatch(watch_idHTML5);
         watch_idHTML5 = null;
     }
}

function dibuixaUbicacio()
{
	//alert("dibuixaUbicacio: " + currentLon);
	var p1 = new OpenLayers.LonLat(currentLon, currentLat);
	//alert(p1)
	try {
		if (window.map && window.map instanceof OpenLayers.Map) {

		    vector.removeAllFeatures();
		    
		    if (!map.getMaxExtent().containsLonLat(new OpenLayers.LonLat(currentLon,currentLat))) {
		    	//alert(nls.MA_GEOLOCATE_LIMITES);
		    	document.getElementById("locDataBottom").innerHTML="&nbsp;&nbsp;" + nls.MA_GEOLOCATE_LIMITES;
		    	return;
		    }

		    var circle = new OpenLayers.Feature.Vector(
		        OpenLayers.Geometry.Polygon.createRegularPolygon(
		        	new OpenLayers.Geometry.Point(currentLon, currentLat),
		            currentAccuracy/2, //L'exactitud dividit per 2 pel radi
		            40,
		            0
		        ),
		        {},
		        { 
		          fillColor: '#000',
				  fillOpacity: 0.1,
				  strokeWidth: 0
		        }
		    );
		    
		    var punt = new OpenLayers.Geometry.Point(currentLon,currentLat);
		    alert("currentHeading: " + currentHeading + "  currentHeadingGPS: " + currentHeadingGPS + "  currentHeadingHTML5: " + currentHeadingHTML5 + " sucessGPS:" + sucessGPS + " currentAccuracy:" + currentAccuracy);
		    
			mostraPosUbi();

		    var centreMapa;
		    if (currentHeading!=null)
		    {
		    	centreMapa = [new OpenLayers.Feature.Vector(punt, { icon:'img/myLocation_ini.png', etiqueta:'', width:45, height:45, rotacio:parseInt(currentHeading).toFixed(0)})];	
		    }
		    else{
		    	centreMapa = [new OpenLayers.Feature.Vector(punt, { icon:'img/myLocation_HTML5.png', etiqueta:'', width:45, height:45, rotacio:0})];
		    }
		    
		    vector.addFeatures(centreMapa);			    
		    vector.addFeatures(circle);	
		    //map.setCenter(vector.getDataExtent().getCenterLonLat());
		}
		
	} 
	catch (e) {
		//alert("Error en dibuixaUbicacio: " + e.toString(),e);
	}	
	
}



function ubica()
{
    var p1 = new OpenLayers.LonLat(currentLon, currentLat);
    dibuixaUbicacio();	
}

function centerMe()
{
		ubica();
        position=new OpenLayers.LonLat(currentLon,currentLat);
        if(position!=null)
        {
            map.setCenter(position, 12);
        }     
}

function setCoords(valor)
{
	srsCoords=valor;
	mostraPosUbi();
	$.mobile.changePage($("#mainContainer"));
}

function mostraPosUbi()
{
	    var cHlbl="0";
	    if (currentHeading!=null) cHlbl = parseInt(currentHeading).toFixed(0);
	
	    var myPos = new OpenLayers.LonLat(currentLon, currentLat);
	    var myPosLon;
	    var myPosLat;
	    
	    if (srsCoords=="WSG84")
	    {
			myPos.transform(new OpenLayers.Projection("EPSG:25831"), new OpenLayers.Projection("EPSG:4326"));
		    myPosLon = parseFloat(myPos.lon).toFixed(4);
		    myPosLat = parseFloat(myPos.lat).toFixed(4);
	    }
	    else{
		    myPosLon = parseInt(myPos.lon).toFixed(0);
		    myPosLat = parseInt(myPos.lat).toFixed(0);
	    }
	    
		if (currentIdioma=="es")
		{
			document.getElementById("locDataBottom").innerHTML="<b>&nbsp;Ubicaci&oacute;n</b> X:" + myPosLon + ", Y:" + myPosLat + "; Buf: " + parseInt(currentAccuracy).toFixed(0) + " m.;  Rumbo:" + cHlbl;	
		}
		if (currentIdioma=="ca")
		{
			document.getElementById("locDataBottom").innerHTML="<b>&nbsp;Ubicaci&oacute;</b> X:" + myPosLon + ", Y:" + myPosLat + "; Buf: " + parseInt(currentAccuracy).toFixed(0) + " m.;  Rumb:" + cHlbl;	
		}
}


function map3()
{
	try{
		
	    //=======================================
	    //Mapa3
	    //=======================================
		var resoluciones =[529.16772500211675,264.58386250105838,211.66709000084668,105.83354500042334,52.916772500211671,26.458386250105836,13.229193125052918,6.6145965625264589,5.2916772500211673,3.9687579375158752,2.6458386250105836,1.3229193125052918,0.52916772500211673,0.26458386250105836,0.13229193125052918];
		var layerResolutions = [529.16772500211675,264.58386250105838,211.66709000084668,105.83354500042334,52.916772500211671,26.458386250105836,13.229193125052918,6.6145965625264589,5.2916772500211673,3.9687579375158752,2.6458386250105836,1.3229193125052918,0.52916772500211673,0.26458386250105836,0.13229193125052918];
	    
	        
	   var baseReferencia3 = new OpenLayers.Layer.ArcGISCache("Base refer�ncia", "http://ide.cime.es/Cache/IDEMenorca/baserefcatxe/_alllayers", {
	        projection: new OpenLayers.Projection('EPSG:25831')
	        //, maxExtent:new OpenLayers.Bounds(240000,4231160.131673529,655000,4698000)
	        , maxExtent:new OpenLayers.Bounds(562130, 4407407, 615999, 4440533)
	        , useArcGISServer:false
	        , units: "m"
	        , type: "jpg"
	        , tileSize:new OpenLayers.Size(256,256)
	        , tileOrigin: new OpenLayers.LonLat(240000, 4698000)
	        , transitionEffect: 'resize'
	        , buffer:1
	        , resolutions: layerResolutions
	    });
	    
	    //Capes WMS Base
	    var layerRef3 = new OpenLayers.Layer.WMS(
	        "Base efer&egrave;ncia WMS",
	        "http://ide.cime.es/menorca/wms/base_referencia", 
	        {layers: 
	            [
	                'RE007RUS_xarxaviaria',
	                //'RE007URB_equipaments',
	                'RE007URB_equipamentsp',
	                'RE007RUS_xarxaviaria_s2',
	                'RE007URB_eixcarrerprod',
	                'RE007TOP_topo05',
	                'RE007TOP_topo10',
	                'RE007TOP_topo25',
	                'RE007TOP_topo50',
	                'RE007TOP_top100',
	                'RE007RUS_costal',
	                'RE007TOP_top200',
	            ],
	            transparent: 'TRUE'
	        },
	        {isBaseLayer: false, visibility: true, opacity: 0.65}
	    );     
	    
	    vectors3 = new OpenLayers.Layer.Vector(
	        "routing",
	        {
	            styleMap: new OpenLayers.StyleMap({
	                "default": {
	                    externalGraphic: "${icon}",
	                    graphicWidth: "${width}",
	                    graphicHeight: "${height}",
	                    labelYOffset: 25,
	                    graphicYOffset: -20,
	                    label: "${etiqueta}",
	                    strokeWidth: 5,
	                    strokeColor: "#ff0000"                    
	                }
	            })
	        }
	    );    
	    
	    var options3 = { 
	                    div: "mapCanvas3",
	                    maxExtent: new OpenLayers.Bounds(562130, 4407407, 615999, 4440533)
	                    , restrictedExtent: new OpenLayers.Bounds(562130, 4397407, 615999, 4440533)
	                    , projection: new OpenLayers.Projection('EPSG:25831')
	                    , displayProjection: new OpenLayers.Projection('EPSG:25831')
	                    , resolutions: resoluciones
						, theme: null
	        			, controls: [
	            	        new OpenLayers.Control.TouchNavigation({
	            			dragPanOptions: {
	                    		enableKinetic: true
	                		}
	            			})
	            		, new OpenLayers.Control.Zoom({zoomInText: "", zoomOutText: ""})
	        ]	                    
	    };
	    map3 = new OpenLayers.Map(options3);
	    
	    var mapLon=593380;
	    var mapLat=4422249;
	    var mapZoom=1;
	
	    map3.addLayers([baseReferencia3,vectors3]);
	    
	    map3.setBaseLayer(map3.layers[0]);
	    map3.layers[0].setIsBaseLayer(true);
	    map3.setCenter(new OpenLayers.LonLat(mapLon, mapLat),5);  		
			
			
		}
		catch(e)
		{
			//alert("error: "  + e.toString())
		}
 	
}

function findRoute(x, y)
{
    var idioma="";
    if (currentIdioma=="ca") idioma="ca";
    if (currentIdioma=="es") idioma="es";
    
    
    var myPos = new OpenLayers.LonLat(currentLon, currentLat);
	myPos.transform(new OpenLayers.Projection("EPSG:25831"), new OpenLayers.Projection("EPSG:4326"));
    var currentLon4326 = myPos.lon;
    var currentLat4326 = myPos.lat;
    
    var target = new OpenLayers.LonLat(x, y);
	target.transform(new OpenLayers.Projection("EPSG:25831"), new OpenLayers.Projection("EPSG:4326"));
    var targetLon = target.lon;
    var targetLat = target.lat;

    
    url="http://www.yournavigation.org/api/1.0/gosmore.php?format=kml&flat=" + currentLat4326 + "&flon=" + currentLon4326 + "&tlat=" + targetLat + "&tlon=" + targetLon + "&v=motorcar&fast=1&layer=mapnik&instructions=1&lang=" + idioma;
    //alert(url);
    console.log(url);
    $.ajax({
        url: url,
        cache: false,
        dataType: 'xml',
        success: function(xml){
            var kmlDistance =  $(xml).find('distance').text();
            document.getElementById("contentKMLDistancia").innerHTML =  parseFloat(kmlDistance).toFixed(2) + " km.";
            var kmlTraveltime =  toHHMMSS($(xml).find('traveltime').text());
            document.getElementById("contentKMLTravelTime").innerHTML = kmlTraveltime;
            var kmlDescription =  $(xml).find('description').text();
            var kmlCoordinates =  $(xml).find('coordinates').text();
            
            try
            {
                vectors3.destroyFeatures();
                var matCoord = new Array();
                matKmlCoordinates = String(kmlCoordinates).split("\n");
                for (var i=0; i<matKmlCoordinates.length;i++)
                {
                    try
                    {
                        var coords = matKmlCoordinates[i].split(",");
                        if ( (isNaN(coords[0])==false) && (isNaN(coords[1])==false) )  
                        var punt = new OpenLayers.Geometry.Point(coords[0], coords[1]).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:25831"));
                        matCoord[i] = punt;
                    }
                    catch(Err)
                    {}
                }

                var feature = new OpenLayers.Feature.Vector(
                        new OpenLayers.Geometry.LineString(matCoord)
                );
                vectors3.addFeatures(feature);
                map3.zoomToExtent(feature.geometry.getBounds(), closest=true);
            }
            catch(Err)
            {
                var errMsg=Err.toString();
                //alert(errMsg)
            }            

        },
        error: function(data) {
            $.mobile.hidePageLoadingMsg( 'Searching' );
        },
        timeout:10000
    });
    //Mostrem la p�gina d'encerts
    $.mobile.changePage("#Yours");
}

function toHHMMSS(valor) {
    var sec_num = parseInt(valor, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}
