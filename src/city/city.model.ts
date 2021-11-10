import * as mongoose from 'mongoose';
export const citySchema=new mongoose.Schema({
    name:{
    type: String,
    required: [true, 'city must Have aName'],
    unique: true,
  },
});

export interface City extends mongoose.Document {
    id: string;
    name: string;
}
