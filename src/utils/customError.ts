class CustomError extends Error{
    code: number;
    constructor( code : number, message: string, name: string = "default"){
        super();
        this.code = code;
        this.message= message;
        this.name= name
    }
}
export default CustomError