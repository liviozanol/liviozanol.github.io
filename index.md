<html>
    <head>
        <title>Teste TSP</title>
        <style>
            /* Set the size of the div element that contains the map */
           #map {
             height: 400px;  /* The height is 400 pixels */
             width: 100%;  /* The width is the width of the web page */
            }
         </style>
         <script>
            function loadMapsAPI(){
                if (document.getElementById('APIKey') && document.getElementById('APIKey').value) {
                    loadJS("https://maps.googleapis.com/maps/api/js?key="+document.getElementById('APIKey').value+"&callback=updateMap");
                } else {
                    alert("fill form correctly");
                }
            }
         </script>
    </head>
    <body>
        <h2>Caminho mínimo</h2><br/>
        Teste de cálculo de caminho mínimo com restrição de tempo<br/>
        <div id="map"></div>
        <br/>
        <br/>
        <form>
            <strong><label for="locationsJson">Locations Json:</label><br/></strong>
            <textarea id="locationsJson" rows="15" cols="60">
[{"lat":"-20.378212","lng":"-40.318356","timeLimit":"5"},{"lat":"-20.343198","lng":"-40.284668","timeLimit":"10"},{"lat":"-20.347332","lng":"-40.296781","timeLimit":"15"},{"lat":"-20.333843","lng":"-40.33445","timeLimit":"10"},{"lat":"-20.315498","lng":"-40.289719","timeLimit":"2"},{"lat":"-20.3141","lng":"-40.297526","timeLimit":"30"}]</textarea><br/>
            <br/>
            <strong><label for="depotlatlng">Depot lat/lng:</label><br/></strong>
            <input type="text" id="depotlatlng" size="58" value='{"lat":"-20.336125","lng":"-40.291.214"}'><br/>
            <strong><label for="APIKey">Google API Key:</label><br/></strong>
            <input type="text" id="APIKey" size="58" ><br/>
            <br/>
            <br/>
            <input type="button" value="Ok" onclick="loadMapsAPI()"><br/>
            <br/>
            <br/>
            Json Format:[{"lat":"LAT1","lng":"LONG1","timeLimit":"TIME_LIMIT_IN_MINUTES1"},{"lat":"LAT2","lng":"LONG2","timeLimit":"TIME_LIMIT_IN_MINUTES2"}...]<br/>
            <div id="Result">
            </div>
        </form>
        <script>

            function updateMap() {
                if (document.getElementById('APIKey') && 
                    document.getElementById('APIKey').value && 
                    document.getElementById('depotlatlng') && 
                    document.getElementById('depotlatlng').value && 
                    document.getElementById('locationsJson').innerHTML) {
                    //Ok
                    var tempVar; //Used for lat/lng of points
                    var marker; //used for create marker
                    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //used for set marker labels
                    var labelIndex = 0; //used for set marker labels

                    var tempLatLngObj; //Used for distance matrix api
                    var originsArray = new Array(); //used for distance matrix api
                    var destinationsArray = new Array(); //used for distance matrix api
                    
                    //DecodedDepotJSON
                    var decodedJsonDepot = JSON.parse(document.getElementById('depotlatlng').value);
                    //DecodedJson
                    var decodedJsonLocations = JSON.parse(document.getElementById('locationsJson').innerHTML);



                    var map = new google.maps.Map(
                        document.getElementById('map'), {zoom: 12, center: {"lat":parseFloat(decodedJsonDepot.lat),"lng":parseFloat(decodedJsonDepot.lng)}}
                    );
                    tempVar = {"lat": parseFloat(decodedJsonDepot.lat), "lng": parseFloat(decodedJsonDepot.lng)};

                    tempLatLngObj = new google.maps.LatLng(parseFloat(decodedJsonDepot.lat), parseFloat(decodedJsonDepot.lng));
                    originsArray.push(tempLatLngObj);
                    destinationsArray.push(tempLatLngObj);

                    var depotMarker = new google.maps.Marker({
                        position: tempVar, 
                        map: map, 
                        label: "Z",
                        icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        }
                    });
                    


                    decodedJsonLocations.forEach(element => {
                        tempVar = {"lat": parseFloat(element.lat), "lng": parseFloat(element.lng)};
                        marker = new google.maps.Marker({
                            position: tempVar, 
                            map: map, 
                            label:labels[labelIndex++ % labels.length]
                        });
                        tempLatLngObj = new google.maps.LatLng(parseFloat(element.lat), parseFloat(element.lng));
                        originsArray.push(tempLatLngObj);
                        destinationsArray.push(tempLatLngObj);
                    });

                    var distanceMatrixAPI = new google.maps.DistanceMatrixService();
                    distanceMatrixAPI.getDistanceMatrix(
                    {
                        origins: originsArray,
                        destinations: destinationsArray,
                        travelMode: google.maps.TravelMode.DRIVING,
                        //travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC
                    },  processDistanceMatrixResult);

                } else {
                    alert("please fill the input forms");
                }

            }
            function processDistanceMatrixResult(response, status) {
                //console.log ('distance matrix array calculated');
                //console.log ('response:');
                //console.log (response);
                //console.log ('status:');
                //console.log (status);

                var data = {}
                data['time_matrix'] = new Array(); //Matriz que armarena tempo de deslocamento entre todos os pontos passados.
                data['time_windows'] = new Array(); //Matriz que armazena o limite de tempo em que o "caxeiro" deve estar em cada nó.
                var tempArray = new Array();

                response.rows.forEach(child => {
                    child.elements.forEach(elementChild => {
                        tempArray.push(elementChild.duration.value);
                    });
                    //console.log("TEMP ARRAY:");
                    //console.log(tempArray);
                    data['time_matrix'].push(tempArray.concat());
                    tempArray.length = 0;
                });

                //Time Windows
                data['time_windows'].push(0);
                var decodedJsonLocations = JSON.parse(document.getElementById('locationsJson').innerHTML);
                decodedJsonLocations.forEach(element => {
                    data['time_windows'].push(parseInt(element.timeLimit) * 60); //Convert to seconds
                });

                data['num_vehicles'] = 1
                data['depot'] = 0

                //Matrizes geradas.
                //Matrizes geradas.
                //Matrizes geradas.
                //Fazer um a um mesmo (custo altíssimo!, mas é só pra teste)


                console.log ('DATA:');
                console.log (data);
                dump(data['time_matrix'], 'body');

                //document.getElementById('Result').innerHTML = response;
            }
            

            var loadJS = function(url){
                //url is URL of external file, implementationCode is the code
                //to be called from the file, location is the location to 
                //insert the <script> element
                var scriptTag = document.createElement('script');
                scriptTag.src = url;

                document.body.appendChild(scriptTag);
            };









    /* repeatString() returns a string which has been repeated a set number of times */
function repeatString(str, num) {
    out = '';
    for (var i = 0; i < num; i++) {
        out += str;
    }
    return out;
}

/*
dump() displays the contents of a variable like var_dump() does in PHP. dump() is
better than typeof, because it can distinguish between array, null and object.
Parameters:
    v:              The variable
    howDisplay:     "none", "body", "alert" (default)
    recursionLevel: Number of times the function has recursed when entering nested
                    objects or arrays. Each level of recursion adds extra space to the
                    output to indicate level. Set to 0 by default.
Return Value:
    A string of the variable's contents
Limitations:
    Can't pass an undefined variable to dump(). 
    dump() can't distinguish between int and float.
    dump() can't tell the original variable type of a member variable of an object.
    These limitations can't be fixed because these are *features* of JS. However, dump()
*/
function dump(v, howDisplay, recursionLevel) {
    howDisplay = (typeof howDisplay === 'undefined') ? "alert" : howDisplay;
    recursionLevel = (typeof recursionLevel !== 'number') ? 0 : recursionLevel;

    var vType = typeof v;
    var out = vType;

    switch (vType) {
        case "number":
        /* there is absolutely no way in JS to distinguish 2 from 2.0
           so 'number' is the best that you can do. The following doesn't work:
           var er = /^[0-9]+$/;
           if (!isNaN(v) && v % 1 === 0 && er.test(3.0)) {
               out = 'int';
           }
        */
        out += ": " + v;
        break;
    case "boolean":
        out += ": " + v;
        break;
    case "string":
        out += "(" + v.length + '): "' + v + '"';
        break;
    case "object":
        //check if null
        if (v === null) {
            out = "null";
        }
        //If using jQuery: if ($.isArray(v))
        //If using IE: if (isArray(v))
        //this should work for all browsers according to the ECMAScript standard:
        else if (Object.prototype.toString.call(v) === '[object Array]') {
            out = 'array(' + v.length + '): {\n';
            for (var i = 0; i < v.length; i++) {
                out += repeatString('   ', recursionLevel) + "   [" + i + "]:  " +
                    dump(v[i], "none", recursionLevel + 1) + "\n";
            }
            out += repeatString('   ', recursionLevel) + "}";
        }
        else {
            //if object
            let sContents = "{\n";
            let cnt = 0;
            for (var member in v) {
                //No way to know the original data type of member, since JS
                //always converts it to a string and no other way to parse objects.
                sContents += repeatString('   ', recursionLevel) + "   " + member +
                    ":  " + dump(v[member], "none", recursionLevel + 1) + "\n";
                cnt++;
            }
            sContents += repeatString('   ', recursionLevel) + "}";
            out += "(" + cnt + "): " + sContents;
        }
        break;
    default:
        out = v;
        break;
    }

    if (howDisplay == 'body') {
        var pre = document.createElement('pre');
        pre.innerHTML = out;
        document.getElementById('Result').appendChild(pre);
        //document.body.appendChild(pre);
    }
    else if (howDisplay == 'alert') {
        alert(out);
    }

    return out;
}










        </script>
    </body>
</html>

<!--
    Pricing:
        maps API $0,007
        directions API $0,005
        distance matrix API $0,005
        https://developers.google.com/maps/documentation/javascript/usage-and-billing
        https://developers.google.com/maps/documentation/directions/usage-and-billing?hl=pt_BR
        https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing?hl=pt-br
-->