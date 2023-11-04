import {
	Controller,
	Post,
	HttpCode,
	UseInterceptors,
	UseGuards,
	UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
	constructor(private readonly fileService: FilesService) {}
	@Post()
	@HttpCode(200)
	//@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [new MFile(file)];
		if (file.mimetype.includes('image')) {
			const buffer = await this.fileService.convertToWebP(file.buffer);
			saveArray.push(new MFile({ originalname: `${file.originalname.split('.')[0]}.png`, buffer }));
		}
		return this.fileService.saveFiles(saveArray);
	}
}
