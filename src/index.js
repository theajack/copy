(function(w) {
    var VERSION = '__VERSION__';
    var COPY_EL = 'copy-el';
    var COPY_TYPE = 'copy-type';
    var COPY_TEXT = 'copy-text';
    if (typeof w === 'undefined') {
        throw new Error('Copy-util is only available in a browser environment');
    }
    var Copy = function(arg) {
        if (typeof arg === 'object') {
            var el = arg.el;
            if (!el) {
                throw new Error('El is required');
            }
            if (typeof el === 'string') {
                el = w.document.querySelector(el);
            }
            if (!(el instanceof HTMLElement)) {
                w.console.error('Illegal HTMLElement');
                return false;
            }
            var type = arg.type || 'value';
            var str = '';
            switch (type) {
                case 'value':
                    str = el.value;
                    break;
                case 'text':
                    str = el.innerText;
                    break;
                case 'html':
                    str = el.innerHTML;
                    break;
                case 'src':
                    str = el.src;
                    break;
                case 'href':
                    str = el.href;
                    break;
                default:
                    str = el.value;
                    break;
            }
            return CopyString(str);
        }
        return CopyString(arg);
    };

    Copy.init = function() {
        var els = document.querySelectorAll('[' + COPY_EL + ']');
        for (var i = 0; i < els.length; i++) {
            (function(el) {
                if (el.__IS_COPY_INIT === true) {
                    return;
                }
                el.__IS_COPY_INIT = true;
                var attr = el.getAttribute(COPY_EL);
                var type = el.getAttribute(COPY_TYPE);
                var target = w.document.querySelector(attr);
                if (target) {
                    el.addEventListener(
                        'click',
                        function() {
                            Copy({
                                el: target,
                                type: type
                            });
                        },
                        false
                    );
                }
            })(els[i]);
        }
        els = document.querySelectorAll('[' + COPY_TEXT + ']');
        for (var i = 0; i < els.length; i++) {
            (function(el) {
                if (el.__IS_COPY_INIT === true) {
                    return;
                }
                el.__IS_COPY_INIT = true;
                var text = el.getAttribute(COPY_TEXT);
                el.addEventListener(
                    'click',
                    function() {
                        CopyString(text);
                    },
                    false
                );
            })(els[i]);
        }
    };

    Copy.version = VERSION;

    var CopyString = function(str) {
        var input = w.document.getElementById('_copy_input_');
        if (!input) {
            input = w.document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute(
                'style',
                'height:10px;position:fixed;top:-100px;opacity:0;'
            );
            input.setAttribute('id', '_copy_input_');
            w.document.body.appendChild(input);
        }
        input.value = str;
        input.select();
        return w.document.execCommand('Copy');
    };

    w.Copy = Copy;
    if (typeof module !== 'undefined') {
        module.exports = Copy;
    }
    w.addEventListener(
        'load',
        function() {
            Copy.init();
        },
        false
    );
})(window);
