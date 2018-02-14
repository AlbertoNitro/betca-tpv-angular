import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable()
export class UserService {

    findUser(mobile: number): boolean {
        return mobile === 1;
    }

    create(user: User): boolean {
        console.log('>>>' + user.mobile + ',' + user.username);
        return true;
    }
}
