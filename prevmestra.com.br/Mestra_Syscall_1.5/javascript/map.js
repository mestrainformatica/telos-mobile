// Copyright (c) 2000 Just Objects B.V. <just@justobjects.nl>
// Distributable under LGPL license. See terms of license at gnu.org.

/** NV pair object */
function NameValuePair(name, value) {
   this.name = name;
   this.value = value;
}

/** Simple Map object to store array of name/value pairs */
function Map() {
  // Data members
   this.index = 0;
   this.map = new Array();
   
   // Function members
   this.get = MapGet;
   this.put = MapPut;
   this.toString = MapToString;
   this.toTable = MapToTable;
}

/** get() */
function MapGet(name) {
   for (var i=0; i < this.index; i++) {
   	if (this.map[i].name == name) {
   	  return this.map[i].value;
   	}
   }
   return '';
}

/** put() */
function MapPut(name, value) {
  this.map[this.index++] = new NameValuePair(name, value);
}

/** To HTML string */
function MapToString() {
    var res = '';
  
   for (var i=0; i < this.index; i++) {
   	res = res + this.map[i].name+'='+this.map[i].value+'<BR>';
   }
   return res;
}

/** To HTML table */
function MapToTable() {
    var res = '<table border=1 cellpadding=3>';
   var styleDiv = "<div style=\"color:black; font-family:monospace; font-size:10pt; white-space:pre;\">"
   
   for (var i=0; i < this.index; i++) {
   	res = res + '<tr><td bgColor=white>'+styleDiv+this.map[i].name+'</div></td><td bgColor=white>'+styleDiv+this.map[i].value+'</div></td></tr>';
   }
   res += '</table>'
   return res;
}

/*
 * $Log: map.js,v $
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
