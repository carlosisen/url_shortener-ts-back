import {Date, Types } from 'mongoose';

export interface IUrl{
    _id: Types.ObjectId | string ,
    notes?: string,
    url: string,
    createdAt: Date | string, 
    updatedAt: Date | string, 
    idUser: string,
    uses: number,
}

export interface IUser{
    _id: Types.ObjectId | string,
    name: string
    email: string
    createdAt: Date | string,
    updatedAt: Date | string, 
    password: string
    token?: string
}

export type IRegister = Omit<IUser , "_id" | "createdAt" | "updatedAt" | "token">;