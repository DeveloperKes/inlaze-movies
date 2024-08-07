import { Module } from '@nestjs/common';
import { EmailService } from './emails.service';

@Module({
  imports: [],
  exports: [EmailService],
  providers: [EmailService],
})
export class EmailModule {}
