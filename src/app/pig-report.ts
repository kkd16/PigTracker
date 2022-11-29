export interface PigReport {
    key: string;
    data: {
        name: string;
        pid: number;
        breed: string;
        notes: string;
        picked_up: boolean;
        date: Date;
        reporter: string;
        phone: string;
        location_id: number;
    }
    
}
