import decode from 'jwt-decode';
import omit from 'lodash/omit';
import { storageAccess } from '../storage/storage-access';

class Token {

    constructor(){
        this.storageAccess = storageAccess;
    }

    isExpired(token = '') {
        
        let auxToken = token || this.get();
        
        try {
            const decoded = decode(auxToken);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    isValid(token = ''){
        if(token) return !this.isExpired(token);

        return this.exist() && !this.isExpired()
    }
    exist(){
        return (this.get())? true : false;
    }

    set(token) {
        let user = this.storageAccess.get('user');
        user = (user) ? {...user, token: user.token}: { token };
        this.storageAccess.set('user', user);
    }

    get(){
        let userStorage = this.storageAccess.get('user');
        
        if(!userStorage) return false;
        
        return userStorage.token; 
    }

    remove(){
        let user = this.storageAccess.get('user');
        user = omit(user, 'token');
        this.storageAccess.set('user', user);
    }
    
}

export const token = new Token();