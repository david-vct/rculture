export interface SimpleQuestion {
    title:string,
    answer:string
}

export interface CompleteQuestion {
    title:string,
    description:string,
    answer:string
}

export interface ImageQuestion {
    title:string,
    image:string,
    answer:string
}

export interface Rebus {

}

export type Question = SimpleQuestion | CompleteQuestion | ImageQuestion

export type UserInfo = {
    id:string,
    name:string,
    isAuth:boolean
}