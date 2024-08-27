import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4306,
      username: 'user',
      password: 'password',  // パスワードを設定していない場合は空文字列
      database: 'tutorial',  // ここを 'blogapp' から 'test-project' に変更
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ArticlesModule,
  ],
})
export class AppModule {}