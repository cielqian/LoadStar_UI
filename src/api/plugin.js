import axios from 'axios';
import apis from './apis';

export default{
    getAllPlugins(){
        return new Promise((resolve, reject) => {
            axios.get(apis.plugin.query)
            .then((response) => {
                resolve(response);
            });
        });
    }
}