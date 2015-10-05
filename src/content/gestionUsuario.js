
function getLiberUsuario() {
    let prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService);
    prefs = prefs.getBranch("extensions.libermarcadores.");
    try {
        return prefs.getComplexValue("liberusuario", Components.interfaces.nsISupportsString).data;    
    } catch(e) {
        return null;
    }
}

function setLiberUsuario(usuario) {
    let prefService = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService);
    let prefs = prefService.getBranch("extensions.libermarcadores.");
    var str = Components.classes["@mozilla.org/supports-string;1"]
          .createInstance(Components.interfaces.nsISupportsString);
    str.data = usuario;
    prefs.setComplexValue("liberusuario", Components.interfaces.nsISupportsString, str);
    prefService.savePrefFile(null); 
}


function getPass(usuario) {
    let myLoginManager = Components.classes["@mozilla.org/login-manager;1"].
            getService(Components.interfaces.nsILoginManager);   
    let logins = myLoginManager.findLogins({}, 'chrome://libermarcadores', null, 'User Registration');
    let pass = null;
	for (var i = 0; i < logins.length; i++) {
		if (logins[i].username == usuario) {
			pass = logins[i].password;
			break;
		}
	}
    return pass;
}

function setPass(usuario,pass) {       
    var nsLoginInfo = new Components.Constructor(
        "@mozilla.org/login-manager/loginInfo;1",
        Components.interfaces.nsILoginInfo,
        "init"
    );
    let loginInfo = new nsLoginInfo('chrome://libermarcadores', null, 'User Registration', usuario, pass, '', ''); 
    let myLoginManager = Components.classes["@mozilla.org/login-manager;1"].
            getService(Components.interfaces.nsILoginManager);
    try {
        myLoginManager.addLogin(loginInfo);
    }
    catch (e) {
        myLoginManager.modifyLogin(getLoginInfo(usuario),loginInfo);
        window.top.getBrowser().selectedBrowser.contentWindow.console.log(e);       
    }
}

function getLoginInfo(usuario) {
    let myLoginManager = Components.classes["@mozilla.org/login-manager;1"].
            getService(Components.interfaces.nsILoginManager);   
    let logins = myLoginManager.findLogins({}, 'chrome://libermarcadores', null, 'User Registration');
    let logInfo = null;
	for (var i = 0; i < logins.length; i++) {
		if (logins[i].username == usuario) {
			logInfo = logins[i];
			break;
		}
	}
    return logInfo;    
}


function getEspacio() {
    let prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService);
    prefs = prefs.getBranch("extensions.libermarcadores.");
    try {
        return prefs.getComplexValue("liberespacio", Components.interfaces.nsISupportsString).data;    
    } catch(e) {
        return null;
    }
}

function setEspacio(espacio) {
    let prefService = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService);
    let prefs = prefService.getBranch("extensions.libermarcadores.");
    var str = Components.classes["@mozilla.org/supports-string;1"]
          .createInstance(Components.interfaces.nsISupportsString);
    str.data = espacio;
    prefs.setComplexValue("liberespacio", Components.interfaces.nsISupportsString, str);
    prefService.savePrefFile(null); 
}

function getServidor() {
    let prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService);
    prefs = prefs.getBranch("extensions.libermarcadores.");
    try {
        return prefs.getComplexValue("liberservidor", Components.interfaces.nsISupportsString).data;    
    } catch(e) {
        return null;
    }
}

function setServidor(servidor) {
    let prefService = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService);
    let prefs = prefService.getBranch("extensions.libermarcadores.");
    var str = Components.classes["@mozilla.org/supports-string;1"]
          .createInstance(Components.interfaces.nsISupportsString);
    str.data = servidor;
    prefs.setComplexValue("liberservidor", Components.interfaces.nsISupportsString, str);
    prefService.savePrefFile(null); 
}