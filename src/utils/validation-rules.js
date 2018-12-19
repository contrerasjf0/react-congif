import isEmpty from 'lodash/isEmpty';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isLength from 'validator/lib/isLength';
import isEmail from 'validator/lib/isEmail';

export default class validationRules{

    static required(value){
        return (isEmpty(value))? `{%s} es requerido` : undefined ;
    }

    static  alphaNumeric(value){
        return (isAlphanumeric(value, 'es-ES'))? undefined : `{%s} contiene caracteres extraños`;
    }

    static max(number, typeMessage){
        let message = `{%s} ha excedido los ${number} ${typeMessage}`;

        return (value) =>{
            return  (value.length >  number)? message : undefined;
        }
    }

    static min(number, typeMessage){
        let message = `{%s} no contiene los ${number} ${typeMessage} requerido como minimo`;

        return (value) =>{
            return  (value.length <  number)? message : undefined;
        }
    }

    static between(min, max, typeMessage){
        let message = `{%s} no se encuentra entre el rango de ${min} - ${max} ${typeMessage}`;

        return (value) =>{
            let opt = {
                min,
                max
            };

            return  (isLength(value, opt))? undefined : message;
        }
    }

    static email(value) {

        //if(isEmpty(value)) return undefined;
        return (isEmail(value))? undefined : '{%s} no cuenta con la estructura de email';
    }
}