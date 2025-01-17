import { IModelUser } from 'src/common/interfaces/user.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User implements IModelUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 14, unique: true })
  cellphone: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}
