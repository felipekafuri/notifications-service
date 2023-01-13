import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { MessagingModule as PubSubMessaginModule } from './infra/http/messaging/pub-sub/messaging.module';

@Module({
  imports: [HttpModule, DatabaseModule, PubSubMessaginModule],
})
export class AppModule {}
