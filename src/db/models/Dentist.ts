import mongoose from "mongoose";

const DentistSchema = new mongoose.Schema({
    name:{
        type : String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50,'Name can not be more than 50 characters']
    },
    expirience:{
        type : Number,
        required: [true, 'Please add a year of experience']
    },
    expertise:{
        type : [String],
        required: [true, 'Please add an expertise']
    },

},
)
const Dentist = mongoose.model("Dentist", DentistSchema)||mongoose.model("Dentist", DentistSchema);
export default Dentist;