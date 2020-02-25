
export interface LoginCredential { // Used for user authentication at the login process
    email: string;
    password: string;
}

export interface EventNoticeData { // Used to upload event cover page to the firestore
    noticeTitle: string,
    noticeDescription: string,
    noticeCategory: string,
    noticeRecipient: string;
 /*   noticeRecipient: [
        {
            noticeRecipientModule: string,
            noticeRecipientBatch: string
        }
    ],*/
    noticeAuthor: string,
    coverImageFileName: string,
    coverImageFilePath: string,
    coverImageFileSize: number
}