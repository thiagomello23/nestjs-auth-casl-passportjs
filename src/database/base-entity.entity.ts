import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({
        type: 'timestamp'
      })
    public createdAt: Date;
    
    @UpdateDateColumn({
        type: 'timestamp'
    })
    public updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    public deletedAt: Date;
}