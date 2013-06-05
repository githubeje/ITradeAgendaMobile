var origen="";
var rut="";

$("#detalle").live("pageinit",function(e) {
	origen=getParameterByName("origen");
	rut=getParameterByName("rut");
});

$("#detalle").live("pageshow",function(e) {
	accion=getParameterByName("idaccion");
	if(accion!=null ) {
		evento(accion);
	}
})

$("#back").live("click",function() {
	if(origen="1") {
		$(location).attr("href","agenda.html?rut=" + rut);
	}
	else if(origen="2") {
		$(location).attr("href","atrasados.html?rut=" + rut);
	}
	else {
		$(location).attr("href","javascript:history.back(1)");
	}
})

$("#documento").live("pageinit", function() {
	$.getJSON("http://www.anywhere.cl/tradeagenda/admin/list?mngr=Tipodocumento",{ },getTipoDocumento);
	
	$("#actualizar").live("click", function(e) {
		var sessionId = sessionStorage.getItem("13004443");		
		$.ajax({ 
			type: "GET",
			dataType:"json",
			url: "http://www.anywhere.cl/tradeagenda/admin/update?mngr=Accion",
			data: { 
				id:idAccion.value,
			    archivos:obsAccion.value,
			    mngrsessionid : sessionId
			},
			crossDomain : true,
			success: function(data,status,jqXHR) { 
				top.location.href = "#detalle";
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { },
			complete: function(data) {}	
		})			
	});
});


function getTipoDocumento(data) {
	$.each(data.results, function(key, val) {
		$("#tipodocumento").append($("<option>", {value : val.idTdocumento}).text(val.tipoDocumento));
	});		
}

$("#observacion").live("pageinit", function() {
	$.getJSON("http://www.anywhere.cl/tradeagenda/admin/list?mngr=Estadoaccion",{ },getEstadoAccion);	
	$("#actualizar").live("click", function(e) {
		var sessionId = sessionStorage.getItem("13004443");		
		$.ajax({ 
			type: "GET",
			dataType:"json",
			url: "http://www.anywhere.cl/tradeagenda/admin/update?mngr=Accion",
			data: { 
				idAccion:accion,
			    obsAccion:obsAccion.value,
			    mngrsessionid : sessionId
			},
			crossDomain : true,
			success: function(data,status,jqXHR) { 
				top.location.href = "#detalle";
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { },
			complete: function(data) {}	
		})			
	});
});

function getEstadoAccion(data) {
	$.each(data.results, function(key, val) {
		$("#estadoaccion").append($("<option>", {value : val.idEaccion}).text(val.estadoAccion));
	});
}

function evento(id) {
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: "http://www.anywhere.cl/tradeagenda/accion/id",
		data: { idAccion : id },
		crossDomain : true,
		success: function(data,status,jqXHR) {
			detalleEvento("results",data.results);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { },
		complete: function(data) {}	
	})	
}

function detalleEvento(key,data) {
	$("#idAccion").val(data.cliente.idAccion);
	$("#clienteid").val(data.cliente.idCliente);
	$("#nombrecliente").val(data.cliente.nombre);
	$("#rut").val(data.cliente.rut + "-" + data.cliente.dv);
	$("#correo").val(data.cliente.correo);
	$("#correolink").attr("href","mailto:" + data.cliente.correo);
	$("#celular").val(data.cliente.celular);
	$("#celularlink").attr("href","tel:" + data.cliente.celular);
	$("#estado").val(data.estadoaccion.estadoAccion);
	$("#tipo").val(data.tipoaccion.tipoAccion);
	$("#lugar").val(data.lugar);
	$("#observaciones").val(data.obsAccion);
	$("#fecha").val(data.fechaInicio);
	$("#prioridad").val(data.prioridad);
}

function getParameterByName(name) {
    var match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}