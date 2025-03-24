export interface BookingItem {
    bookDate: string;
    bookTime: string; // Added bookTime
    user: string;
    dentist: string;
    createAt: string;
}

export interface DentistInfo {
    name: String;
    expirience: Number;
    expertise: [String];
    picture: String;
}
