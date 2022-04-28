import { Exclude } from 'class-transformer';

export class UsersSerializer {
  fullName: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  __v: number;
}
