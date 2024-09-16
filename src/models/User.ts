import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // Cambiar a tipo "string" para compatibilidad con SQLite
  @Column({ type: 'varchar', nullable: true })
  resetPasswordToken: string | null;

  // Cambiar a tipo "date" o "datetime" para compatibilidad con SQLite
  @Column({ type: 'datetime', nullable: true })
  resetPasswordExpires: Date | null;
}