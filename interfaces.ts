export interface BookingItem {
    _id:string;
    bookDate: string;
    bookTime: string; // Added bookTime
    user: string;
    dentist: DentistInfo[];
    createAt: string;
}

export interface BookJson{
    success: boolean;
    count: number;
    data: BookingItem[];
}

export interface DentistInfo {
    name: String;
    expirience: Number;
    expertise: [String];
    picture: String;
}

