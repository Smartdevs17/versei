// transaction.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';
import { Transaction, TransactionSchema } from './schema/transaction.schema';
import { ResponseService } from 'src/framework/response/response.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
  controllers: [TransactionController],
  providers: [TransactionService, ResponseService],
  exports: [TransactionService], // Exports the service if needed in other modules
})
export class TransactionModule {}
