import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { Category } from '../categories/category.entity';
import { ProductStatusEnum } from '@repo/shared';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'upload_date' })
  uploadDate: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'seller_name' })
  sellerName: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @Column({ type: 'enum', enum: ProductStatusEnum, default: ProductStatusEnum.ACTIVE })
  status: ProductStatusEnum;

  @ManyToMany(() => Category, category => category.products, { cascade: true })
  @JoinTable({
    name: 'products_categories',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
