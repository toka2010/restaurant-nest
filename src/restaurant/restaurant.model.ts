import * as mongoose  from 'mongoose'; 
import { IsEmail, IsNotEmpty } from 'class-validator';
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: [true,'please enter Valid Location']
  }
});
export const restaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'restaurant must have aname']
    },
    image:String,
  
    email:{
        type:String,
      required: [true, 'restaurant must Have Email'],
        unique:true ,
    
       // validate:[validator.isEmail ,'Please Provide Avalid Email']
    },
    location:{
      type: pointSchema,
      required: true
    },
    city:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'City'
    }
            
    
    
    },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
);
restaurantSchema.index({ location: '2dsphere' });
restaurantSchema.pre(/^find/,function(next){
  this.populate('city');
   
  next();
});
export interface Restaurant extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  city: string;
  location:  {
    type:{
        type:String,
        default:'Point',
        enum:['Point']
    },
    coordinates:[Number],
    address:String,
    description:String
};
  }