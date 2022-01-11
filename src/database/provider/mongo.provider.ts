import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { print } from '../utils/log';

let MongoDataBaseProvider;
try {
  MongoDataBaseProvider = [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.mongoUri,
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // poolSize: 20,
      }),
    }),
  ];
  print('Mongo Db Connected');
} catch (error) {
  print('Mongo Db Not Connected');
}
export default MongoDataBaseProvider;
