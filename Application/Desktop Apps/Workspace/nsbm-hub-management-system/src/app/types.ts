import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface LoginCredential { // Used for user authentication at the login process
    email: string;
    password: string;
}
