/*
 * menuExpandable2.js - implements an expandable menu based on a HTML list
 * Author: Dave Lindquist (dave@gazingus.org)
 */


if (!document.getElementById) {
    document.getElementById = function() { return null; }
}

var menuCookie = "menusToExpand";
var itemCookie = "itemToHighlight";


//Image1= new Image(9,9)
//Image1.src = "/Mestra_Previdenciario/plc/midia/plus.gif"

//Image2= new Image(9,9)
//Image2.src = "/Mestra_Previdenciario/plc/midia/minus.gif"


//Image3= new Image(9,9)
//Image3.src = "/Mestra_Previdenciario/plc/midia/square.gif"

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};

function initializeMenu(menuId, actuatorId) {
    // MenuUID
    // Objeto menu com o UL do submenu
    var menu = document.getElementById(menuId);
    // Objeto actuator com o A do link
    var actuator = document.getElementById(actuatorId);

    if (menu == null || actuator == null) return;

    //if (window.opera) return; // I'm too tired
    
    // Pegamos o LI pai do A e trocamos a imagem
    //actuator.parentNode.style.backgroundImage = "url(/Mestra_Previdenciario/plc/midia/plus.gif)";
    actuator.onclick = function() {
        
        var display = menu.style.display;
        /*this.style.backgroundImage =
            (display == "block") ? "url(../Mestra_Previdenciario/modernidade/img/chevron-up.png)" : "url(../Mestra_Previdenciario/modernidade/img/chevron-down.png)";*/
        // Adiciona ou remove a classe active para itens abertos ou fechados
        if(this.hasClass('active'))
        {
            this.className = "";
            this.className = "actuator";
            menu.style.display = "none";
        
        }
        else
        {
            this.classList.add("active");
            menu.style.display = "block";
        }
        // this.parentNode.style.backgroundImage =
        //     (display == "block") ? "url(/Mestra_Previdenciario/plc/midia/plus.gif)" : "url(/Mestra_Previdenciario/plc/midia/minus.gif)";
        
        // Begin custom code for remembering expanded menus with cookies
        var menusToExpand = getCookie(menuCookie);
        if (menu.style.display == "block") {
            // set a cookie to keep the menu expanded
            if (menusToExpand == null) {
                setCookie(menuCookie,menuId);
            } else if (menusToExpand.indexOf(menuId) == -1) {
                setCookie(menuCookie,menusToExpand+","+menuId);
            }
        } else {
            // remove it from the expanded cookie list
            if (menusToExpand.indexOf(menuId) != -1) {
                // check for comma after menu
                if (menusToExpand.indexOf(menuId+",") != -1) {
                    menusToExpand = menusToExpand.replace(menuId+",","");
                } else {
                    menusToExpand = menusToExpand.replace(menuId,"");
                }
                if (menusToExpand == "") {
                    deleteCookie(menuCookie);
                } else {
                    setCookie(menuCookie,menusToExpand);
                }
            }
        }
        // End custom code
        
        return false;
    }
}

// This function loops through all the <ul>'s in the document and
// initializes the menus for them if they have menu classes
function initializeMenus() {

    // Define objeto do menu
    var menu = document.getElementById("menuDiv");
    // Define objeto com os links (a) do menu
    var links = menu.getElementsByTagName("a");
    // Define objeto com os submenus
    var lists = document.getElementsByTagName("ul");

    // Define arrays vazios para hasChilds (actuators) e !hasChilds (nonActuators)
    var actuators = new Array();
    var nonActuators = new Array();
 
    // build an array of actuators
    for (i=0; i < links.length; i++) {
        // Se já tem a classe actuator, adiciona ao array hasChild (actuators), senão, nos nonActuators
        if (links[i].className == "actuator") {
            actuators[actuators.length] = links[i];
        } else {
            nonActuators[nonActuators.length] = links[i];
        }
    }
        
    // Define objeto com os Menus
    var menus = new Array();
    // build an array of menus
    for (i=0; i < lists.length; i++) {
        // Se o UL tiver a classe menu ou submenu, adiciona a listagem de menus
        if (lists[i].className == "menu" || lists[i].className == "submenu") {
            menus[menus.length] = lists[i];
        }
    }

    // initialize actuators and menus (number should be the same)
    for (i=0; i < actuators.length; i++) {
        initializeMenu(menus[i].id, actuators[i].id);
    }
    
    // Begin custom code to remember last item clicked (with cookies)
    // add an onclick event to set a cookie on the non-actuators
    // Adiciona um evento de CLICK para salvar um cookie quando um menu for aberto
    for (i=0; i < nonActuators.length; i++) {
        nonActuators[i].onclick=function() {
            setCookie(itemCookie,this.href);
        }
    }

    // user must have cookies enabled for this to work
    expandMenus();
}


function openMenu(menuId) {
    var menu = document.getElementById(menuId);
    var actuatorId = menuId.substring(0, menuId.indexOf("Menu")) + "Actuator";
    var actuator = document.getElementById(actuatorId);
    if (menu != null) {
        var display = menu.style.display;
        //menu.parentNode.style.backgroundImage = "url(/Mestra_Previdenciario/plc/midia/minus.gif)";
        // menu.style.display = (display == "block") ? "none" : "block";
        
        if(actuator.hasClass('active'))
        {
            actuator.className = "";
            actuator.className = "actuator";
            menu.style.display = "none";
        
        }
        else
        {
            actuator.classList.add("active");
            menu.style.display = "block";
        }
    }
}

function expandMenus() {
    var menusToExpand = getCookie(menuCookie);
    if (menusToExpand != null) {
        // if more than one menu has been menusToExpanded,
        // create an array of menusToExpanded menus
        if (menusToExpand.indexOf(",") != -1) {
            menuArray = menusToExpand.split(",");
            for (var i=0; i < menuArray.length; i++) {
                openMenu(menuArray[i]);
            }
         } else {
            openMenu(menusToExpand);
         }
    }
    var itemToHighlight = getCookie(itemCookie);
    var links = document.getElementsByTagName("a");
    // add an onclick event to set a cookie on the non-actuators
    for (i=0; i < links.length; i++) {
        if (links[i].href == itemToHighlight) {
            links[i].className += " highlight";
        }
    }
}

// =========================================================================
//                          Cookie functions 
// =========================================================================
/* This function is used to set cookies */
function setCookie(name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}

/* This function is used to get cookies */
function getCookie(name) {
	var prefix = name + "=" 
	var start = document.cookie.indexOf(prefix) 

	if (start==-1) {
		return null;
	}
	
	var end = document.cookie.indexOf(";", start+prefix.length) 
	if (end==-1) {
		end=document.cookie.length;
	}

	var value=document.cookie.substring(start+prefix.length, end) 
	return unescape(value);
}

/* This function is used to delete cookies */
function deleteCookie(name,path,domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// You can call initializeMenus() manually from your JSP
//window.onload = initializeMenus;