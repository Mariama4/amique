import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleOptions> => {
	console.log({
		uri: getMongoString(configService),
		...getMongoOptions(configService),
	});
	return {
		uri: getMongoString(configService),
		...getMongoOptions(configService),
	};
};

const getMongoString = (configService: ConfigService) =>
	'' +
	configService.get('DB_TYPE') +
	'://' +
	configService.get('DB_USER') +
	':' +
	configService.get('DB_PASSWORD') +
	'@' +
	configService.get('DB_HOST') +
	':' +
	configService.get('DB_PORT');

const getMongoOptions = (configService: ConfigService) => ({
	dbName: configService.get('DB_NAME'),
});
