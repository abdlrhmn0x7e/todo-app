import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "@thallesp/nestjs-better-auth";

import { TaskModule } from "./task/task.module";
import { auth } from "./utils/auth";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule.forRoot(auth, { disableExceptionFilter: true }),
    TaskModule,
  ],
})
export class AppModule {}
