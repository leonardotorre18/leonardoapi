
export type File = Express.Multer.File

export class FileSaved {
  constructor(
    readonly mimetype: string,
    readonly size: number,
    readonly filename: string,
    readonly url: string,
  ) { }
}
