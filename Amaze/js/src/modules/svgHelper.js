define(['underscore'], function (_) {

	'use strict';

	var ns = 'http://www.w3.org/2000/svg';

	function createSVGElement (node) {

		return document.createElementNS(ns, node);
	}

	function getSVGTag (node, parent) {

		parent = parent || document;

		return parent.getElementsByTagNameNS(ns, node)
	}

	function setSVGAttr (node, attr, val) {

		node.setAttributeNS(ns, attr, val);
	}

	function getSVGAttr(node, val) {

	    return node.getAttributeNS(ns, attr);
	}

	function addClass (node, className) {

		if(!~getClassIndex(node, className)) {
			node.setAttribute('class', node.getAttribute('class') + ' ' + className);
		};
	}

	function removeClass (node, className) {

		var classIndex = getClassIndex(node, className);

		if(~classIndex) {
			node.setAttribute('class', _.trim(node.getAttribute('class').replace(className, ''), '  '));
		}
	}

	function getClassIndex(node, className) {

		return node.getAttribute('class').indexOf(className);
	}

	return {
		createSVGElement: createSVGElement,
		getSVGTag: getSVGTag,
        getSVGAttr: getSVGAttr,
		setSVGAttr: setSVGAttr,
		addClass: addClass,
		removeClass: removeClass
	};
});
