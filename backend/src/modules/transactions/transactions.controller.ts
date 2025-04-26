import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ResponseService } from 'src/framework/response/response.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly responseService: ResponseService
  ) {}

  // Create a new transaction (Buy, Sell, etc.)
  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    const result = await this.transactionService.create(createTransactionDto);
    return this.responseService.success({ data: result, message: 'Transaction created successfully' });
  }

  // Get all transactions
  @Get()
  async getAllTransactions() {
    const result = await this.transactionService.findAll();
    return this.responseService.success({ data: result, message: 'Transactions retrieved successfully' });
  }

  // Get a transaction by ID
  @Get(':id')
  async getTransactionById(@Param('id') id: string) {
    const result = await this.transactionService.findById(id);
    if (!result) {
      return this.responseService.error({ message: 'Transaction not found', errors: 'No transaction found with the provided ID', code: 404 });
    }
    return this.responseService.success({ data: result, message: 'Transaction retrieved successfully' });
  }
}