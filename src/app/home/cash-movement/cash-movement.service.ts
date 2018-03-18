import { Injectable } from '@angular/core';

import { CashMovement } from './cash-movement.model';

@Injectable()
export class CashMovementService {

    constructor() {
    }

    add(cashMovement: CashMovement): void {
        cashMovement.value = Math.abs(cashMovement.value);
        // this will call a httpService and execute the add operation. Does not return anything
    }

    remove(cashMovement: CashMovement): void {
        cashMovement.value = (cashMovement.value < 0) ? cashMovement.value : -1 * cashMovement.value;
        // this will call a httpService and execute the remove operation. Does not return anything
    }
}
