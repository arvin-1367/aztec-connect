import { GrumpkinAddress } from '@aztec/barretenberg/address';
import { BridgeCallData } from '@aztec/barretenberg/bridge_call_data';
import { TxId } from '@aztec/barretenberg/tx_id';
import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, Index, PrimaryColumn } from 'typeorm';
import {
  bigintTransformer,
  bridgeCallDataTransformer,
  grumpkinAddressTransformer,
  txIdTransformer,
} from './transformer.js';

@Entity({ name: 'defiTx' })
export class DefiTxDao {
  public constructor(init?: Partial<DefiTxDao>) {
    Object.assign(this, init);
  }

  @PrimaryColumn('blob', { transformer: [txIdTransformer] })
  public txId!: TxId;

  @Index({ unique: false })
  @Column('blob', { transformer: [grumpkinAddressTransformer] })
  public userId!: GrumpkinAddress;

  @Column('blob', { transformer: [bridgeCallDataTransformer] })
  public bridgeCallData!: BridgeCallData;

  @Column('text', { transformer: [bigintTransformer] })
  public depositValue!: bigint;

  @Column('text', { transformer: [bigintTransformer] })
  public txFee!: bigint;

  @Column()
  public txRefNo!: number;

  @Column()
  public created!: Date;

  @Column()
  public partialState!: Buffer;

  @Column()
  public partialStateSecret!: Buffer;

  @Column({ nullable: true })
  @Index()
  public nullifier!: Buffer;

  @Column({ nullable: true })
  public settled?: Date;

  @Index({ unique: false })
  @Column({ nullable: true })
  public interactionNonce?: number;

  @Column({ nullable: true })
  public isAsync?: boolean;

  @Column({ nullable: true })
  public success?: boolean;

  @Column('text', { transformer: [bigintTransformer], nullable: true })
  public outputValueA?: bigint;

  @Column('text', { transformer: [bigintTransformer], nullable: true })
  public outputValueB?: bigint;

  @Column({ nullable: true })
  public finalised?: Date;

  @Column({ nullable: true })
  public claimSettled?: Date;

  @Column('blob', { nullable: true, transformer: [txIdTransformer] })
  public claimTxId?: TxId;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  afterLoad() {
    if (this.settled === null) {
      delete this.settled;
    }
    if (this.interactionNonce === null) {
      delete this.interactionNonce;
    }
    if (this.isAsync === null) {
      delete this.isAsync;
    }
    if (this.success === null) {
      delete this.success;
    }
    if (this.outputValueA === null) {
      delete this.outputValueA;
    }
    if (this.outputValueB === null) {
      delete this.outputValueB;
    }
    if (this.finalised === null) {
      delete this.finalised;
    }
    if (this.claimSettled === null) {
      delete this.claimSettled;
    }
    if (this.claimTxId === null) {
      delete this.claimTxId;
    }
  }
}
