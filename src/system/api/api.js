import axios from 'axios';
import merge from 'lodash/merge';

import { configAccess } from '../config/config-access';
import { storageAccess } from '../storage/storage-access';
import { token } from '../token/token';

class Api {

    headersDefault = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ''
    };

    constructor(){

        this.configAccess = configAccess;
        this.storageAccess = storageAccess;
        this.token = token;

        this.axios  = axios.create({
            baseURL: this.configAccess.get('apiUrl')
          });
        
    }

    createRequest(uri, config, data = null, params = null){
        
        config = this._setHeader(config);
        config = this._setData(config, data);
        config = this._setParams(config, params);
        
        return this.axios(uri, config);
    }

    _setHeader(config){

        let headers = this.headersDefault;
        
        headers.Authorization = this._retrieveAuthorization(config.authorization);


        return merge({}, config, {headers});
    }

    _retrieveAuthorization(configAutorization){
        if(configAutorization === false) return '';

        if(typeof configAutorization === 'string') return `Bearer ${configAutorization}`;
        
        if(configAutorization === undefined || configAutorization === true){
            //lack of validation of ExpirationTime
            if(this.token.exist()) return `Bearer ${this.token.get()}`;
            
            return '';
        }
    }
    _setData(config, data){

        return merge({}, config, { data });
    }

    _setParams(config, params){

        return merge({}, config, { params });
    }

}

export const api = new Api();