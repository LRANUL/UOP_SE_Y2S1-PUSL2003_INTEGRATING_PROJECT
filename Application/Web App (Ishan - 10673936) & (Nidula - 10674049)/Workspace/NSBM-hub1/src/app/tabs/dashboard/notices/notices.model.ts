export class notice{
    constructor( 
        public id:string,
        public title:string,
        public desc:string,
        public imageUrl:string,
        public createDate:Date,
        public batch:number,
        public fac:string,
        ){}
}