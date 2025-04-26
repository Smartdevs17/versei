// transaction.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schema/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

  // Create a new transaction
  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const newTransaction = new this.transactionModel(createTransactionDto);
    return await newTransaction.save(); // Save the transaction to MongoDB
  }

  // Find a transaction by its ID
  async findById(id: string): Promise<Transaction> {
    return this.transactionModel.findById(id).exec();
  }

  // Get all transactions
  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }
}
