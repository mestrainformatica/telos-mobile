// Copyright (c) 2000 Just Objects B.V. <just@justobjects.nl>
// Distributable under LGPL license. See terms of license at gnu.org.

// Creates a fixed size pop-up window without status, scroll/toolbars
function openBareWindow(id, url, width, height) {
   window.open(url,id, "status=no,resizable=no,scrollbars=no,toolbar=no,WIDTH="+width+",HEIGHT="+height)
}

// Creates a fixed size full screen scrollable window without status, scroll/toolbars
function openBareFullscreenWindow(id, url) {
   window.open(url, id, "status=no,resizable=yes,scrollbars=yes,toolbar=no,HEIGHT="+screen.height+",WIDTH="+screen.width)
}

// Creates a fixed size pop-up window without status, toolbars but with scroll.
function openBareScrollingWindow(id, url, width, height) {
   window.open(url,id, "status=no,resizable=no,scrollbars=yes,toolbar=no,WIDTH="+width+",HEIGHT="+height)
}

// Returns a blank HTML page with the specified color
function blankPage(color) {
	return "<HTML><HEAD><META HTTP-EQUIV='Pragma' CONTENT='no-cache'></HEAD><BODY BGCOLOR="+color+"></BODY></HTML>"
}

// Parse parameter out of a string.
function getParameter(string, parm, delim) {
     // returns value of parm from string
     if (string.length == 0) {return '';}
	 var sPos = string.indexOf(parm + "=");
     if (sPos == -1) {return '';}
     sPos = sPos + parm.length + 1;
     var ePos = string.indexOf(delim, sPos);
     if (ePos == -1) {ePos = string.length;}
     return unescape(string.substring(sPos, ePos));
}

// Get parameter from query string passed to my page
function getPageParameter(parameterName, defaultValue) {
	var s = self.location.search;
	if ((s == null) || (s.length < 1)) {
		return defaultValue;
	}
	s = getParameter(s, parameterName, '&');
	if ((s == null) || (s.length < 1)) {
		s = defaultValue;
	}
	return s;	
}

/*
 * $Log: util.js,v $
 * Revision 1.1.18.3  2014/04/30 18:17:16  jorgeoliveira
 * Correção de commit(Problemas com CVS (SS: 2014/52-00094))
 *
 * Revision 1.1.14.3  2012/08/15 23:47:58  andreluis
 * novo orçamento
 *
 * Revision 1.1.18.1  2012/05/31 15:25:34  felipereis
 * Correção de Bug na integração com Nucleos_Syscall
 *
 * Felipe Reis
 *
 * Revision 1.1.14.1  2012/05/18 12:17:05  jorgeoliveira
 * Merge
 *
 * Revision 1.1.10.2  2011/05/11 14:39:42  felipereis
 * *** empty log message ***
 *
 * Revision 1.1  2005/01/14 18:11:07  ruy
 * javascripts para o Pushlet
 *
 * Revision 1.3  2003/08/15 08:39:01  justb
 * fix/add copyright + LGPL in file headers
 *
 *
 */
