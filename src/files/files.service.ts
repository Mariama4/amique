import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MFile } from './mfile.class';
import sharp from 'sharp';

@Injectable()
export class FilesService {
	async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd-HH-mm-ss-SSS');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);
		const res: FileElementResponse[] = [];

		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			res.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname });
		}

		return res;
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).png().toBuffer();
	}

	// TODO: написать нормальные типы
	async saveSchemaFile(data: object, fileName: string, fileType: string = 'json') {
		const uploadFolder = `${path}/schemas`;
		await ensureDir(uploadFolder);
		const uploadFile = `${uploadFolder}/${fileName}.${fileType}`;
		const stringData = JSON.stringify(data);
		await writeFile(uploadFile, stringData);
		const result: FileElementResponse = {
			url: uploadFile,
			name: `${fileName}.${fileType}`,
		};
		return result;
	}
}
