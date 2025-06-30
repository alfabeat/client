export interface Event {
  _id?: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  createdBy: string; 
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
