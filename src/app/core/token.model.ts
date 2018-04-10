import { Role } from './role.model';

export interface Token {
    token: string;
    roles: Array<Role>;
    creationDate: number;
}
