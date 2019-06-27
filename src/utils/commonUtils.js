export default {
    isNotEmpty(obj) {
        return obj != undefined
            && obj != ''
            && obj != undefined
            && obj != null
            && obj != 'null';
    },
    isEmpty(obj) {
        return !this.isNotEmpty(obj);
    },
    replace(source, arr) {
        let result = source;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            result = result.replace(element.key, element.val);
        }
        return result;
    },
    responseSuccess(res) {
        return res.status == 200;
    },
    getScreenHeight() {
        return window.screen.height;
    },
    getQueryString(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        let idx = window.location.href.indexOf("?") + 1;
        var r = window.location.href.substr(idx).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    format(){}
}