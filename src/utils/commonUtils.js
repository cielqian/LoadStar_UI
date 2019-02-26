export default{
    isNotEmpty(obj){
        return obj != undefined 
        && obj != '' 
        && obj != undefined 
        && obj != null 
        && obj != 'null';
    },
    isEmpty(obj){
        return !this.isNotEmpty(obj);
    },
    replace(source, arr){
        let result = source;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            result = result.replace(element.key, element.val);
        }
        return result;
    },
    responseSuccess(res){
        return res.status == 200;
    }
}