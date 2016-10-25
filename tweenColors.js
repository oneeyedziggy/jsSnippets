function leftPad( str, len, char ){
    var pad = new Array( len + 1 ).join( char || "0" ),
        buffer = (pad + str),
        output = buffer.substr( buffer.length - len );
    return output;
}

function tweenColors( fromColor, toColor, steps = 1, inclusive ){
  var r1,g1, b1, r2, g2, b2, output = [], i,
      rDiff, gDiff, bDiff, rBuffer, gBuffer, bBuffer,
      rInc, gInc, bInc;

  //steps = ( typeof( steps ) === "number" && setpe ) || 1; //legacy versioin of defaulting steps

  r1 = parseInt( fromColor.slice( 1,3 ), 16 );
  g1 = parseInt( fromColor.slice( 3,5 ), 16 );
  b1 = parseInt( fromColor.slice( 5,7 ), 16 );
  
  r2 = parseInt( toColor.slice( 1,3 ), 16 );
  g2 = parseInt( toColor.slice( 3,5 ), 16 );
  b2 = parseInt( toColor.slice( 5,7 ), 16 );
  
  rDiff = r1 - r2;
  gDiff = g1 - g2;
  bDiff = b1 - b2;
  
  rInc = rDiff / ( steps + 1 );
  gInc = gDiff / ( steps + 1 );
  bInc = bDiff / ( steps + 1 );
  
  if( inclusive ){
    output.push( toColor );
  }
  
  for( i = 0; i < steps; i++){
      rBuffer = leftPad( Math.round( r2 + ( rInc * ( i + 1 ) ) ).toString( 16 ), 2, "0" );
      gBuffer = leftPad( Math.round( g2 + ( gInc * ( i + 1 ) ) ).toString( 16 ), 2, "0" );
      bBuffer = leftPad( Math.round( b2 + ( bInc * ( i + 1 ) ) ).toString( 16 ), 2, "0");
      output.push( "#" + rBuffer + gBuffer + bBuffer ); 
  }
  
  if( inclusive ){
    output.push( fromColor );
  }
  
  return output;
};

// demonstration
function showGradient( gradient ){
  console.log(gradient);
  var body = document.getElementsByTagName("body")[0];
  var containerDiv = document.createElement("div");
  var bufferDiv;
  for( let i = 0; i < gradient.length; i++ ){
    bufferDiv = document.createElement("div");
    //bufferDiv.setAttribute( "height", 50 );
    //bufferDiv.setAttribute( "width", 50 );
    bufferDiv.innerHTML = "__"; //TODO: make this smarter than sizing w/ text and stop using innerHTML
   /* bufferDiv.style["height"] = 25;
    bufferDiv.style["max-height"] = 25;
    bufferDiv.style["width"] = 25;
    bufferDiv.style["max-width"] = 25;*/
    bufferDiv.style["display"] = "inline-block";
    bufferDiv.style["background-color"] = gradient[ i ];
    containerDiv.appendChild( bufferDiv );
  }
  body.appendChild(containerDiv);
}

console.clear();

var numSteps = 5,
    color1 = "#FF0000",
    color2 = "#00FFFF";

showGradient( tweenColors(color1, color2, numSteps, true) );