if ("undefined" == typeof(LiberMarcadores)) {
  var LiberMarcadores = {};
};


LiberMarcadores.SideBar = {
    guardarConf: function(usuario,pass,espacio,servidor) {
        setLiberUsuario(usuario);
        setPass(usuario,pass);
        setEspacio(espacio);
        setServidor(servidor);
        document.getElementById('label-cambios').style.display = "block";
        LiberMarcadores.SideBar.actualizar();
    },
    actualizar: function(alerta) {
      //La variable alerta es un booleano que
      //define si se muestra una alerta de error o no
      let espacioDefecto = getEspacio();
      let servidor = getServidor();
      let usuarioActual = getLiberUsuario();
      let pass = getPass(usuarioActual);
      
      let urlMarcadores = servidor + "/libermarcadores/rest/" + espacioDefecto + "/marcadores";
      let request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
                    .createInstance(Components.interfaces.nsIXMLHttpRequest);
                    
      let tree = document.getElementById('childrens');
      tree.innerHTML = "";
      
      //Cargo los marcadores en el arbol
      request.onload = function(aEvent) {
          let marcadores = JSON.parse(aEvent.target.responseText);
          marcadores.forEach(function(marcador) {              
            let item = document.createElement('treeitem');                    
            let row = document.createElement('treerow');
            
            let cell = document.createElement('treecell');
            cell.setAttribute('label',marcador.titulo);
            row.appendChild(cell);
            
            cell = document.createElement('treecell');
            cell.setAttribute('label',marcador.url);
            row.appendChild(cell);            

            cell = document.createElement('treecell');
            cell.setAttribute('label',marcador.descripcion);
            row.appendChild(cell);            


            let etiquetas = LiberUtils.getTagsString(marcador.tags);
            cell = document.createElement('treecell');
            cell.setAttribute('label',etiquetas);
            row.appendChild(cell);
            
            cell = document.createElement('treecell');
            cell.setAttribute('label',marcador.id);
            row.appendChild(cell);            
            
            item.appendChild(row);
            tree.appendChild(item);          
          });
      };
      
      //Si falla la carga de los marcadores, cartel de error
      request.onerror = function(aEvent) {
        if (alerta) 
          window.alert("Error: no se pueden obtener los marcadires. Compruebe su conexión y vuelva a intentar");
        window.top.getBrowser().selectedBrowser.contentWindow.console.log(aEvent);
      };
       
       //Solicito los marcadores, con un GET
      request.open("GET", urlMarcadores, true, usuarioActual ,pass);
      request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      request.send();         
    },
    //Abre el marcador seleccionado
    abrirURL: function(evento) {
      let tree = document.getElementById('tree-marcadores');
      let url = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(1));
      window.top.getBrowser().selectedBrowser.contentWindow.open(url);
    },
    //Oculta el cartel de cambios guardados
    blur: function(evento) {
      document.getElementById('label-cambios').style.display = "none";
    },
    
    
    abrirVentanaModificar: function(evento) {
      let tree = document.getElementById('tree-marcadores');
      let marcador = {};
      marcador.id = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(4));
      marcador.url = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(1));
      marcador.titulo = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(0));
      marcador.descripcion = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(2));
      marcador.etiquetas = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(3));
      
      window.openDialog(
        "chrome://libermarcadores/content/winModificarMarcador.xul",
        "libermarcadores-window-modificar",
        "chrome,centerscreen",
        marcador);       
    },
    
    
    modificarMarcador: function(marcador) {
      let espacioDefecto = getEspacio();
      let servidor = getServidor();
      let usuarioActual = getLiberUsuario();
      let pass = getPass(usuarioActual);
      
      let urlMarcadores = servidor + "/libermarcadores/rest/" + espacioDefecto + "/marcadores";
      let request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
                    .createInstance(Components.interfaces.nsIXMLHttpRequest);      
      
      request.onload = function(aEvent) {
        //Muestro en consola los detalles del exito
        LiberMarcadores.SideBar.actualizar();
        window.top.getBrowser().selectedBrowser.contentWindow.console.log("Exito: " + aEvent.target.responseText);
      };
      
      request.onerror = function(aEvent) {
        //Mensaje de error, si no hay conexión
         window.alert("Error: compruebe su conexión y vuelva a intentar");
         window.top.getBrowser().selectedBrowser.contentWindow.console.log(aEvent);
      };
       
      window.top.getBrowser().selectedBrowser.contentWindow.console.log(JSON.stringify(marcador));
      urlMarcadores = urlMarcadores + "/" + marcador.id;
       //Guardo el marcador, usando el usuario guardado en la configuracion
      request.open("PUT", urlMarcadores, true, usuarioActual ,pass);
      request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(marcador));       
    },
    
    
    eliminarMarcador: function(evento) {
      let espacioDefecto = getEspacio();
      let servidor = getServidor();
      let usuarioActual = getLiberUsuario();
      let pass = getPass(usuarioActual);
      
      let urlMarcadores = servidor + "/libermarcadores/rest/" + espacioDefecto + "/marcadores";
      let request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
                    .createInstance(Components.interfaces.nsIXMLHttpRequest);      
      let tree = document.getElementById('tree-marcadores');
      let id = tree.view.getCellText(tree.currentIndex, tree.columns.getColumnAt(4));
      
      request.onload = function(aEvent) {
        //Muestro en consola los detalles del exito
        LiberMarcadores.SideBar.actualizar();
        window.top.getBrowser().selectedBrowser.contentWindow.console.log("Exito: " + aEvent.target.responseText);
      };
      
      request.onerror = function(aEvent) {
        //Mensaje de error, si no hay conexión
         window.alert("Error: compruebe su conexión y vuelva a intentar");
         window.top.getBrowser().selectedBrowser.contentWindow.console.log(aEvent);
      };
      
      urlMarcadores = urlMarcadores + "/" + id;
       //Guardo el marcador, usando el usuario guardado en la configuracion
      request.open("DELETE", urlMarcadores, true, usuarioActual ,pass);
      request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      request.send();           
    }    
}