import { Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn('timestamp')
  createdOn: Date;

  @UpdateDateColumn('timestamp')
  updatedAt: Date;
}
