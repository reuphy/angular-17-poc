export interface Reservation {
    id:string;
    checkInDate:Date | string;
    checkOutDate:Date | string;
    guestName:string;
    guestEmail:string;
    roomNumber:number;
}
