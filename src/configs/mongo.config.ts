import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions(),
	};
};

const getMongoString = (configService: ConfigService) =>
	'' +
	configService.get('DB_TYPE') +
	'://' +
	// find solution for this wtf
	//configService.get('DB_USER') +
	//':' +
	//configService.get('DB_PASSWORD') +
	//'@' +
	configService.get('DB_HOST') +
	':' +
	configService.get('DB_PORT') +
	'/' +
	configService.get('DB_NAME');

const getMongoOptions = () => ({});
