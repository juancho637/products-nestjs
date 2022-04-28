import { Exclude } from 'class-transformer';

export class UsersSerializer {
  _id: string;
  fullName: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  __v: number;
}
