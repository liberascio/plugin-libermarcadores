/**
 * LiberMarcadores namespace.
 */
if ("undefined" == typeof(LiberMarcadores)) {
  var LiberMarcadores = {};
};


LiberMarcadores.BrowserOverlay = {

  agregar: function(marcador) {
    //Funcion que se llama cuando
    //aprieta el botón ok para agregar marcador   
    let descripcion = marcador.descripcion;
    let tags = marcador.etiquetas;
    
    //Configuro valores a guardar
    let espacio = getEspacio();
    let servidor = getServidor();
    let usuarioActual = getLiberUsuario();
    let pass = getPass(usuarioActual);
    
    let url = window.top.getBrowser().selectedBrowser.contentWindow.location.href;
    let titleDOM = window.top.getBrowser().selectedBrowser.contentWindow.document.getElementsByTagName("title");
    let title = "";
    if (titleDOM.length>0) 
      title = titleDOM[0].text;
  
    let urlServidor = servidor + "/libermarcadores/rest/" + espacio + "/marcadores";
    let request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
                  .createInstance(Components.interfaces.nsIXMLHttpRequest);
    request.onload = function(aEvent) {
      //SI EL LIBERSIDEBAR ESTA ABIERTO, ACTUALIZO LOS MARCADORES
      var sidebarWindow = document.getElementById("sidebar").contentWindow;
      if (sidebarWindow.location.href ==
            "chrome://libermarcadores/content/liberSidebar.xul") {
        sidebarWindow.LiberMarcadores.SideBar.actualizar(false);
      }
      //Muestro en consola los detalles del exito
      window.top.getBrowser().selectedBrowser.contentWindow.console.log("Exito: " + aEvent.target.responseText);
    };
    
    request.onerror = function(aEvent) {
      //Mensaje de error, si no hay conexión
       window.alert("Error: compruebe su conexión y vuelva a intentar");
       window.top.getBrowser().selectedBrowser.contentWindow.console.log(aEvent);
    };

     //Guardo el marcador, usando el usuario guardado en la configuracion
    request.open("POST", urlServidor, true, usuarioActual ,pass);
    request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({url:url, titulo:title,
                            descripcion:descripcion, tags:tags})); 
    
  },
  //Abro la ventana para agregar marcador
  agregarMarcador : function(aEvent) {
    window.openDialog(
      "chrome://libermarcadores/content/windowAgregar.xul",
      "libermarcadores-window-agregar",
      "chrome,centerscreen");   
  },
  //Abro web del espacio
  abrirWebEspacio : function(aEvent) {
    let espacio = getEspacio();
    let servidor = getServidor();
    let url = servidor + "/libermarcadores/web/" + espacio;    
    window.top.getBrowser().selectedBrowser.contentWindow.open(url);
  }
};
