flag = false;
$(document).ready(function(){
	$('#info > nav:first-child').slideDown(500);
	$.getJSON("build.json", function(result){
		for(i=0;i<result.content.length;i++){
			$('#main_menu ol').append('<li>'+result.content[i].desc+'</li>');
			sects = '';
			for(j=0;j<result.content[i].sections.length;j++){
				header = "<h3>"+result.content[i].sections[j].head+"</h3>";
				section = result.content[i].sections[j].sect;
				sects = sects + '<div class="col_section">'+header+section+'</div><div class="separation"></div>';
			}
			$('#info').append("<nav><div>"+sects.toString()+"</div></nav>");
		}
		contact = '<div class="col_section"><h3>Contactanos para cualquier duda o informe que requieras</h3><table><tr><td>Nombre:</td><td><input id="nombre" type="text"></td></tr><tr><td>Email:</td><td><input id="email" type="text"></td></tr><tr><td>Asunto:</td><td><input id="asunto" type="text"></td></tr><tr><td>Mensaje:</td><td><textarea id="mensaje" rows="8" cols="35"></textarea></td></tr><tr><td><input id="enviarmail" type="button" value="Enviar"></td><td><input id="deleteall" type="button" value="Borrar"></td></tr></table></div>';
		$('#main_menu ol').append('<li>Contacto</li>');
		$('#info').append("<nav><div>"+contact+"</div></nav>");
		$('#main_menu ol li:first-child').click();
	});
});

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
});

$(document).on('click', '#main_menu > ol > li', function(){
	numind = $(this).index();
	if($('#info > nav:eq('+numind+')').is(':hidden')){
		$('#info > nav').slideUp(500);
		$('#info > nav:eq('+numind+')').slideDown(500);
		if($('#info > nav:eq('+numind+') .your-class').length && flag == false){
			$('.your-class').slick({
				dots: true,
				infinite: true,
				speed: 500,
				fade: true,
				cssEase: 'linear',
				adaptiveHeight: true
			});
			flag = true;
		}/*else if(flag == true){
			$('.your-class').slick('unslick');
		}*/
	}
});

$('#enviarmail').click(function(){
	nombre = $('#nombre').val();
	email = $('#email').val();
	asunto = $('#asunto').val();
	mensaje = $('#mensaje').val();
	$.post("php/email.php", {nombrephp:JSON.stringify(nombre),emailphp:JSON.stringify(email),asuntophp:JSON.stringify(asunto),mensajephp:JSON.stringify(mensaje)}, function(data){
		alert(data);
		if(data == "Su mensaje fue recibido con exito. Nos pondremos en contacto con usted a la brevedad posible"){
			$('#contacto input[type="text"], #contacto textarea').val('');
		}
	});
});

$('#deleteall').click(function(){
	$('#contacto textarea').val('');
});


$('#imagebkgupload').on('submit', function(event){
	event.preventDefault();
	fname = $('#fileToUpload').val();
	fd = new FormData(this);
	if(fname.lastIndexOf('jpg')===fname.length-3){
		$.ajax({
		    url : "php/bkimgup.php",
		    type: "POST",
		    data: fd,
		    processData: false,
		    contentType: false,
		    success:function(data, textStatus, jqXHR){
		    	alert(data);
		    	$('#backimgedit').attr('src', $('#backimgedit').attr('src')+'?'+Math.random());
		    },
		    error: function(jqXHR, textStatus, errorThrown){
		        //if fails     
		    }
		});
		/*$.post("php/bkimgup.php", {fileToUpload:fd}, function(data){
			console.log(data);
		});*/
	}else{
		alert("¡El archivo que esta intentando subir no es una imagen .jgp!");
	}
});