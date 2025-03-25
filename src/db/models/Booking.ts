import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    bookDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    dentist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dentist',
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Booking = mongoose.models.Booking || mongoose.model("Booking",BookingSchema);
export default Booking