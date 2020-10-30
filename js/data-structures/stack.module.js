export class Stack{

    constructor(){
        this.collection = new Array();
    }

    push(obj){
        if(obj)
        this.collection.shift(obj);
    }

    pop(){
        if(this.collection.length > 0)
            return this.collection.shift();
    }

    peek(){
        if(this.collection.length > 0)
            return this.collection[0];
    }
}