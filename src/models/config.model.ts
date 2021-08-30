import {Parameter} from 'src/models/parameter.model'

export class Config{
    constructor(
        public name:string,
        public client:string,
        public parameters:Parameter[]
    ){}
}