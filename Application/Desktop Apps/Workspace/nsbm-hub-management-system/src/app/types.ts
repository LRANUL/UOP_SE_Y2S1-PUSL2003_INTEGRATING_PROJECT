import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface LoginCredential { // Used for user authentication at the login process
    email: string;
    password: string;
}

export interface EventNoticeData { // Used to upload event cover page to the firestore
    noticeTitle: string,
    noticeDescription: string,
    noticeCategory: string,
    noticeRecipient: {    // this is a firestore map
        noticeRecipientModule: string,
        noticeRecipientBatch: string
    },
    noticeCoverImage: {
        coverImageFileName: string,
        coverImageFilePath: string,
        cooverImageFileSize: number
    }
    noticeCreated: {
        noticeCreatedByName: string,
        noticeCreatedByFaculty: string,
        noticeCreatedDateTime: string
    }
    noticeUpdate: {
        updatedByName: string,
        updatedByFaculty: string,
        updatedDateTime: string,
        updatedSection: string,
    }
}

export interface NoticeData {
    noticeTitle: string,
    noticeDescription: string,
    noticeCategory: string,
    noticeRecipient: {    // this is a firestore map
        noticeRecipientModule: string,
        noticeRecipientBatch: string
    },
    noticeCreated: {
        noticeCreatedByName: string,
        noticeCreatedByFaculty: string,
        noticeCreatedDateTime: string
    }
    noticeUpdate: {
        updatedByName: string,
        updatedByFaculty: string,
        updatedDateTime: string,
        updatedSection: string,
    }
}