import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { pinoConfig } from '@config/pino.config';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@shared/database/database.module';
import { SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from '@modules/users/users.module';
import { ShortnedUrlModule } from '@modules/shortned-url/shortned-url.module';
import { ProvidersModule } from '@shared/providers/providers.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ScheduleTasksModule } from '@modules/schedule-tasks/schedule-tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(pinoConfig),
    SwaggerModule,
    DatabaseModule,
    ProvidersModule,
    UsersModule,
    ShortnedUrlModule,
    AuthModule,
    ScheduleTasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
