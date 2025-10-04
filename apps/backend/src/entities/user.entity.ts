import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50, comment: '用户名' })
  username: string;

  @Column({ length: 255, comment: '密码（加密后）' })
  password: string;

  @Column({ nullable: true, length: 20, comment: '手机号码' })
  phone?: string;

  @Column({ unique: true, nullable: true, length: 100, comment: '邮箱地址' })
  email?: string;

  @Column({ type: 'datetime', nullable: true, comment: '最后登录时间' })
  login_time?: Date;

  @Column({ type: 'datetime', nullable: true, comment: '最后退出时间' })
  logout_time?: Date;

  @CreateDateColumn({ comment: '创建时间' })
  created_at: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updated_at: Date;

  @Column({ type: 'tinyint', default: 1, comment: '用户状态：1-正常，0-禁用' })
  status: number;
}