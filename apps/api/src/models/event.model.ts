import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_name: string;

  @Column()
  location: string;

  @Column()
  slug: string;

  @Column()
  date: Date;

  @Column()
  capacity: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  seat_available: number;

  constructor() {
    this.id = 0;
    this.event_name = "";
    this.location = "";
    this.slug = "";
    this.date = new Date();
    this.description = "";
    this.capacity = 0;
    this.price = 0;
    this.seat_available = 0;
  }
}
