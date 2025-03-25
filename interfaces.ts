export interface BookingItem {
    _id:string;
    bookDate: string;
    bookTime: string; // Added bookTime
    user: string;
    dentist: DentistItem[];
    createAt: string;
}

export interface BookJson{
    success: boolean;
    count: number;
    data: BookingItem[];
}

export interface DentistItem {
    _id: string;
    name: string;
    expirience: number;
    expertise: string[];
    picture: string;
}

export interface DentistJson {
    count: number;
    data: DentistItem[];
}