import { Component} from '@angular/core';

@Component({
    templateUrl: 'login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
    mobile: number;
    password: string;
}
