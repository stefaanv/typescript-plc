import { Module } from '@nestjs/common';
import { AppController } from './hello-world/app.controller';
import { AppService } from './hello-world/app.service';
import { ConfigModule } from '@nestjs/config';
import { PlcDriverService } from './drivers/plc-driver/plc-driver.service';
import genConfig from './config/gen-config';

// Importeren van verschillende dconfig bestanden werkt nog niet wegens https://github.com/nestjsx/nestjs-config/issues/275, later opnieuw te bekijken
//TODO Nog validate toevoegen op de config bestanden

// Nog verwijderen indien blijkt dat het werkt zonder
// ConfigModule.forRoot({
//   isGlobal: true,
// });

@Module({
  imports: [ConfigModule.forRoot({ load: [genConfig], isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, PlcDriverService],
})
export class AppModule {}
