/**
 * Basic polyfill for HTML 5 semantic element
 * Mainly for Microsoft Internet Explorer, does not attempt to fix for printing (which need much additional work)
 *
 * https://github.com/aFarkas/html5shiv may do a better job if you want extensive support.
 * However, I do not care that much about old browsers.
 */
(function (window, document) {
  const elements = ['main', 'header', 'section', 'details', 'summary', 'time', 'footer'];
  for (var i = 0; i < elements.length; i++) {
    document.createElement(elements[i]);
  }
})(window, document);
