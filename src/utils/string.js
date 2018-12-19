

class String {

    static alphanumericRS(lenght){
        const codeRandom = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return codeRandom.substring(0,lenght); 
    }
    
    static removeSpecialCharacters(sourceString = '' , remplaceCharacter = ''){
        const removeSpecialcharacters = /[´` ~!@#$%^&*()|+=÷¿?;:'",<>\{\}\[\]\\\/]/g;

        return sourceString.replace(removeSpecialcharacters, remplaceCharacter);
    }
}

export default String;