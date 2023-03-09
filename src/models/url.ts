
export default class UrlModel {

static createUrl= (payload: string) : string =>{
        const url : string =`${process.env.BASE_URL}${payload}`
        return url
}}