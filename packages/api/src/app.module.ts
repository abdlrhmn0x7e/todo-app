import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { TRPCModule } from "nestjs-trpc";

import { TaskModule } from "./task/task.module";
import { auth } from "./utils/auth";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule.forRoot(auth),
    TRPCModule.forRoot({
      basePath: "/api/trpc",
      autoSchemaFile: "../trpc/src",
    }),
    TaskModule,
  ],
})
export class AppModule {}
