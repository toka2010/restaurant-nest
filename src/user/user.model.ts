import * as mongoose from 'mongoose';
export const userSchema=new mongoose.Schema({
  name:{
        type:String,
        required:[true,'user must Have aName']
       
       
    },
  email: {
    type: String,
        required:[true,'user must Have Email'],
        unique:true ,
       
    },
  password: {
    type: String,
        required:[true,'user must Have password']
  },
  role: {
        type:String,
        enum:['user','admin'],
    default: 'user',
    }
    
});
export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}