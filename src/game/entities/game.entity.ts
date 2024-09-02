import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('simple-array')
    board: string[];

    @Column()
    currentPlayer: string;

    @Column()
    playerX: string;

    @Column({ nullable: true })
    playerO: string;
}
