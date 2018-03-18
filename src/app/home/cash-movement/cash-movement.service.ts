import { Injectable } from '@angular/core';

import { CashMovement } from './cash-movement.model';

@Injectable()
export class CashMovementService {

    constructor() {
    }

    add(cashMovement: CashMovement): void {
        cashMovement.value = Math.abs(cashMovement.value);
    }

    remove(cashMovement: CashMovement): void {
        cashMovement.value = (cashMovement.value < 0) ? cashMovement.value : -1 * cashMovement.value;
    }
}
