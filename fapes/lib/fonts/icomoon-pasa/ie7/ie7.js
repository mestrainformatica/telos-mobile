/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon-pasa\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icoomon-pasa-circulo-alimentacao': '&#xe900;',
		'icoomon-pasa-circulo-ams': '&#xe901;',
		'icoomon-pasa-circulo-creche': '&#xe904;',
		'icoomon-pasa-circulo-dente': '&#xe905;',
		'icoomon-pasa-circulo-educacao': '&#xe906;',
		'icoomon-pasa-circulo-pasa': '&#xe907;',
		'icoomon-pasa-circulo-pgd': '&#xe908;',
		'icoomon-pasa-circulo-refeicao': '&#xe909;',
		'icoomon-pasa-circulo-transporte': '&#xe90b;',
		'icoomon-pasa-circulo-vida': '&#xe90c;',
		'icoomon-pasa-bolo': '&#xe902;',
		'icoomon-pasa-calendario': '&#xe903;',
		'icoomon-pasa-telefone': '&#xe90a;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icoomon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
