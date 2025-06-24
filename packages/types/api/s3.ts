export interface IGetPresignedUrlRequest {
    fileName: string
    fileType: string
}

export interface IGetPresignedUrlResponse {
    presignedUrl: string
}
