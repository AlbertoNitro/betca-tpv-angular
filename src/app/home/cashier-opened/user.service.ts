import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    findUser(mobile: number): boolean {
        return mobile === 1;
    }
}
