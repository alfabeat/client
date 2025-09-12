export interface Member {
      _id?: string;

  Name: string;
  role: 'senior' | 'member';
    email: string;
    team: string;
  createdAt?: Date;
  updatedAt?: Date;
}
