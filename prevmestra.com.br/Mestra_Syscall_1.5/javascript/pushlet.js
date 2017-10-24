// Copyright (c) 2000 Just Objects B.V. <just@justobjects.nl>
// Distributable under LGPL license. See terms of license at gnu.org.

/** REQUIRES map.js */

/* Object to represent nl.justobjects.pushlet.Event in JavaScript. 
   Arguments are an array where args[i] is name and args[i+1] is value 
*/
function PushletEvent(args) {
   // Member variable setup; the Map stores the N/V pairs
   this.map = new Map();
   
   // Member function setup
   this.getSubject = PushletEventGetSubject
   this.put = PushletEventPut
   this.get = PushletEventGet
   this.toString = PushletEventToString
   this.toTable = PushletEventToTable

   // Put the arguments' name/value pairs in the Map
   for (var i=0; i < args.length; i++) {
     this.put(args[i], args[++i] );
   }
}

// Get the subject attribute
function PushletEventGetSubject() {
  return this.map.get('subject')
}

// Get event attribute
function PushletEventGet(name) {
  return this.map.get(name)
}

// Put event attribute
function PushletEventPut(name, value) {
  return this.map.put(name, value)
}

function PushletEventToString() {
  return this.map.toString();
}

// Convert content to HTML TABLE
function PushletEventToTable() {
  return this.map.toTable();
}

/*
 * $Log: pushlet.js,v $
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
 * Revision 1.4  2003/08/15 09:16:24  justb
 * cvs browse fixes
 *
 * Revision 1.3  2003/08/15 08:39:01  justb
 * fix/add copyright + LGPL in file headers
 *
 *
 */