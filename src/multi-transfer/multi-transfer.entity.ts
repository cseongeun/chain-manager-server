import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MultiTransferHistory } from '../multi-transfer-history/multi-transfer-history.entity';
import { Network } from '../network/network.entity';
import { User } from '../user/user.entity';

@Entity()
export class MultiTransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @ManyToOne(() => Network, { nullable: false })
  network: Network;

  @Column({ type: 'varchar', length: 500 })
  hash: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  tokenAddress: string;

  @Column({ type: 'longtext', nullable: true })
  memo: string;

  @OneToMany(
    () => MultiTransferHistory,
    (multiTransferHistory) => multiTransferHistory.multiTransfer,
  )
  histories: MultiTransferHistory[];
}
