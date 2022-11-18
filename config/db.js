import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI).then((con) => {
        console.log('You have successfuly connected to the db');
    }).catch((err) => {
        console.log(err.message);
    })
};