var height = 0;
var width = 0;

var x_offset;
var y_offset;
var row;

var colomn;
var matrix = [];
var filtorEnabled = false;

var rowArray = [];
var colArray = [];

// Get the modal

var span = document.getElementsByClassName("close")[0];

function loadFile(){
    $("#file-loader").click();
}

$("#file-loader").change(function(){
    //submit the form here
    loadToCanavas();
});

$("#file-loader").bind('blur', function(){
    //submit the form here
    loadToCanavas();
});


var  loadToCanavas = function (){

    clearCanvas("gridLayer");
    clearCanvas("myImg");
    clearCanvas("cellMarker");

    var fileSrc = document.getElementById("file-loader");
    //img.src = event.target.result;
    var img = new Image();

    var canvas = document.getElementById("myImg");
    context = canvas.getContext('2d');
    addImgToCanvas(URL.createObjectURL(fileSrc.files[0]), canvas, context);
}


function addImgToCanvas(objectUrl, canvas , ctx){
    var img = new Image();
    var reader = new FileReader();
    reader.onload = (function(aImg) {
        return function(e) {
          aImg.onload = function() {
              // draw the aImg onto the canvas
              canvas.height = this.height;
              canvas.width = this.width;
              height = this.height;
              width = this.width;
              context.clearRect(0, 0, this.width, this.height);
              context.drawImage(aImg, 0, 0);
            }
            // e.target.result is a dataURL for the image
          aImg.src = objectUrl;
        };
      })(img)
      reader.onload();
}

function clearCanvas(id){
    var canvas = document.getElementById(id);
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGrid(){
    var canvas = document.getElementById("gridLayer");
    var  ctx = canvas.getContext('2d');

    var color = $("#gridColor").val()  
    row = $("#rowCount").val() != undefined ? $("#rowCount").val() : 0 ;
    row = parseInt(row);
   
    colomn = $("#colomnCount").val()!= undefined ? $("#colomnCount").val() : 0;
    colomn = parseInt(colomn);

    var rowProp = $('#rowProp').val();
    var ColsProp = $('#ColsProp').val();
    var partial = document.getElementById('partial').checked;
    canvas.height = height;
    canvas.width = width;
    closeModel('myModal');
    clearCanvas("cellMarker");

    //row = parseInt(row )+1;
    //colomn = parseInt(colomn) +1;
    y_offset  = height / (row + 1);
    x_offset  = width / (colomn + 1);


    y_offset = (height * 0.0264583333) / (rowProp  *(row+1));
   x_offset  = (width * 0.0264583333)/ (ColsProp * (colomn + 1));
   
   y_offset = y_offset * 37.7952; 
   x_offset = x_offset * 37.7952; 
 

   if(Math.round(y_offset) < Math.round(x_offset) && partial){

        x_offset = y_offset;
   } 
   
   if(Math.round(y_offset) >Math.round(x_offset) && partial){

         y_offset = x_offset ;
    } 

   //console.log( height  , y_offset);
   //console.log(width , x_offset)

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth=0.5;
    rowArray = [];
    colArray = [];

    //draw row -----------
    //(0,0) (width,0)
    //(0,1),(width,0)
    for(var i = 0; i< row; ++i){
        ctx.moveTo(0, i* y_offset + y_offset);
        ctx.lineTo(width, i * y_offset + y_offset);
        rowArray.push(i * y_offset + y_offset);
        //y_offsetArray.push(i * y_offset + y_offset)

    }
    //draw colomn |
    // (0,0),(x , height)           | 
    //            |
    for(var j = 0; j< colomn ; ++j){
        ctx.moveTo(j * x_offset + x_offset, 0);
        ctx.lineTo(j * x_offset + x_offset, height);
        colArray.push(j * x_offset + x_offset)
        //y_offsetArray.push(j *x_offset);
    }

    ctx.stroke();
    $("#showConvertor").val("asdas")
    var  warningModel = $('#Warning');
    var warningBody = $('#warningBody');

    if( Math.round(x_offset) > Math.round(y_offset)){

        warningBody.text("Please consider Increesing number  of Colomns for better result !");
        $('#Warning').removeClass("fade");
        $('#Warning').css("display" , "block");
    }else if(Math.round(x_offset) < Math.round(y_offset)){

        warningBody.text("Please consider Increesing number  of Rows for better result!");
        $('#Warning').removeClass("fade");
        $('#Warning').css("display" , "block");
    }
    

}

function markCel(){
    var canvas = document.getElementById("cellMarker");
    var  ctx = canvas.getContext('2d');
    canvas.height = height;
    canvas.width = width;
    
    var rect = canvas.getBoundingClientRect();
    var canvasX = rect.x;
    var canvasY = rect.y;

    var mcolor = $("#markerColor").val();
    var mOpc  = $("#markerOpac").val();
    var fontSize = $('#fontSize').val();

    closeModel('MarkerModel');

    ctx.font=  fontSize + "px"+"  Georgia"
    ctx.fillStyle= hex2rgba(mcolor,mOpc);
    

    if(width == y_offset){
        return;
    }
    if(height == x_offset){
        return;
    }
    
    
    for (var rows = 0; rows < rowArray.length; ++rows) {
        markAllVerticalCols((rows * rowArray[0]) + rowArray[0], rows , ctx);
        if (rows == (rowArray.length - 1)) {
            //mark last row;
            markAllVerticalCols(((rows + 1 ) * rowArray[0]) + rowArray[0], rows +1, ctx);
        }
    }

   
    
}

function markAllVerticalCols(rowPosition, rowNo, ctx) {
    for (var cols = 0; cols < colArray.length; ++cols){
        var markText = rowNo + "," + cols;
        
        xpos = x_offset * cols;
        xpos = xpos + colArray[0] - x_offset/2;
        ypos = rowPosition - y_offset/2;
        fillTheCell(xpos, ypos, markText, ctx);

        if (cols == (colArray.length -1)) {
            xpos = x_offset * (cols + 1);
            xpos = xpos + colArray[0] - x_offset/2;
            ypos = rowPosition - y_offset / 2;
            var markText = rowNo + "," + (cols +1) ;
            fillTheCell(xpos, ypos, markText, ctx);
        }

    }
}

function fillTheCell(x, y, text, ctx) {

    console.log(x, y);
    ctx.fillText(text, x, y);
}

function hex2rgba(hexa, opc){
    var r = parseInt(hexa.slice(1,3), 16);
        g = parseInt(hexa.slice(3,5), 16);
        b = parseInt(hexa.slice(5,7), 16);
        
    return 'rgba('+r+', '+g+', '+b+', '+opc+')';
  }

function mouseclick(event){
    myCanvas =  document.getElementById("cellMarker");
    var rect = myCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //console.log("x: " + x + " y: " + y); 
}

function showModel(id){
    model = $('#' + id +'');
    if(model.hasClass("fade")){
        model.removeClass("fade")
    }
    model.css('display','block');
}
function closeModel(id){
    model = $('#' + id +'');
    model.addClass("fade")
    model.css('display','none');
}


$( document ).ready(function() {
    $("#modelClose").bind('click', function(){closeModel()})
});

function saveImage(){

    var imgcnvs = document.getElementById("myImg");
    var grdcnvs = document.getElementById("gridLayer");
    var mrkrcnvs = document.getElementById("cellMarker");
    var finalCnvs = document.getElementById("finalImg");
    var context = finalCnvs.getContext("2d");
    finalCnvs.height = height;
    finalCnvs.width = width; 
    
    context.drawImage(imgcnvs,0,0)
    context.drawImage(grdcnvs,0,0)
    context.drawImage(mrkrcnvs,0,0)

    link = $("#a");
    link.on('click', function(){
       link.attr("href", finalCnvs.toDataURL())
        link.attr("download", "finalImg.png")
        
    })

    $('#a').get(0).click();
}


/*
$.ajax({
            url: finalCnvs.toDataURL(),
            dataType: "image/png",
            success: function(data){            
                $("#a").attr({
                    "value": "Download",
                    "href": URL.createObjectURL(new Blob([data], {
                          type: "application/octet-stream"
                    })),
                    "download": "outputFile.png"
                });
            }
        });
*/
// Get the <span> element that closes the modal


// When the user clicks on the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
