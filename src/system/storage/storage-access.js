import  store from 'store';


class StorageAccess {

    constructor (){
        this.store = store;
    }

    set(key, value){

        if(typeof value === 'object'){
            value = JSON.stringify(value);
        }

        this.store.set(key, value);

        return this;
    }

    get(key, persist = true){

        let value = null;
         
        try{

            if(persist){
                value = (this.store.get(`persist:${key}`))[key];
            }else{
                value = this.store.get(key);
            }
            
            if(value === undefined)  return null; 

            value = JSON.parse(value);
        }catch(e){ /**/ }
        
        return (value === undefined) ? null: value;
    }

    remove(key, persist = true){

        if(persist){
            this.store.remove(`persist:${key}`);
        }else{
            this.store.remove(key);
        }
        
        return this;
    }

    clear(){

        this.store.clearAll();

        return this;
    }

}


export const storageAccess = new StorageAccess();