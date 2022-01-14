import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';
import { ConfigInterface } from './interface/config.interface';
import { ConsoleService } from 'src/utils/console/console.service';

@Injectable()
export class ConfigService {
  private readonly envConfig: ConfigInterface;
  constructor(private readonly consoleService: ConsoleService) {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
    this.consoleService.print(process.cwd() + '@12 line' + process.env.PORT);
    const config: { [name: string]: string } = process.env;
    const parsedConfig = JSON.parse(JSON.stringify(config));
    this.envConfig = this.validateInput(parsedConfig);
  }

  private validateInput = (envConfig): ConfigInterface => {
    const envVarSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .required()
        .valid(
          'development',
          'production',
          'staging',
          'provision',
          'inspection',
        )
        .default('development'),
      PORT: Joi.number().required(),
      MONGO_URI: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarSchema.validate(
      envConfig,
      {
        abortEarly: false,
        allowUnknown: true,
      },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    this.consoleService.print('Joi Schema Verified in config.service.ts');
    return validatedEnvConfig;
  };

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get port(): string {
    return '3001';
  }

  get mongoUri(): string {
    // this.consoleService.print(this.envConfig.MONGO_URI);
    return 'mongodb+srv://admin:Q4szdASIwOSZjnaK@cluster0.o6m7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  }

  get jwtKey(): string {
    // this.consoleService.print(this.envConfig.MONGO_URI);
    return 'mynameiskryptomind';
  }
}
