var inited = false;
var preKey = ''; 
var listeners = {};

export default {
    init(){
        if (inited) {
            return;
        }
        document.onkeydown = function(event){
            let triggered = false;
            var e = event || window.event || arguments.callee.caller.arguments[0];   
            if(e){
                for (const listener in listeners) {
                    let item = listeners[listener];
                    if (item.d) {
                        if (item.key == e.keyCode && item.preKey == preKey) {
                            triggered = true;
                        }
                    }else{
                        if (item.key == e.keyCode) {
                            triggered = true;
                        }
                    }
                    if (triggered) {
                        if (item.cb) {
                            item.cb(event);
                        }
                        break;
                    }
                }
                preKey = e.keyCode; 
                
            }
        };
    },
    listen(key, cb){
        if (key == 'paste') {
            document.addEventListener("paste", cb);
            return;
        }

        let listener = {};
        if (key.indexOf('+') > 0) {
            let dKey = key.split('+');
            listener = {key:dKey[1],preKey:dKey[0], d: true};
        }else{
            listener = {key:key, d: false};
        }
        if (typeof(cb) == 'function') {
            listener.cb = cb;
        }
        listeners[key] = listener;
    },
    cancel(key, cb){
        if (key == 'paste') {
            document.removeEventListener("paste", cb);
            return;
        }
    }
}