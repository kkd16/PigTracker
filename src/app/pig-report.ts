export interface PigReport {
    key: string;
    data: {
        name: string;
        pid: number;
        breed: string;
        notes: string;
        picked_up: boolean;
        date: Date;
        location_id: number;
    }
    
}
