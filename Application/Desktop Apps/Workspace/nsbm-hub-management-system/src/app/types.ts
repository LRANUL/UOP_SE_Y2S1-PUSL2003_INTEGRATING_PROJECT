
export interface LoginCredential { // Used for user authentication at the login process
    email: string;
    password: string;
}

export interface EventNoticeData { // Used to upload event cover page to the firestore
    coverImageFileName: string,
    coverImageFilePath: string,
    coverImageFileSize: number
}