import { Injectable } from '@angular/core';
import { find } from 'lodash';
import { config } from '../../config';
import { Role } from '../../shared/viewModels/interfaces';

@Injectable()
export class AuthService {
    private user: string = '';
    private currentRole: string = 'CUSTOMER';
    private token: string;
    private expiresAt: any;

    constructor() {
        this.loadExistingSession();
    }

    public isLogged(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        return new Date().getTime() < this.expiresAt;
    }

    public getUser(): string {
        return this.user;
    }

    public setUser(username: string): void {
        this.user = username;
    }

    public getToken(): string {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = `Bearer ${token}`;
    }

    public setRole(role: string): void {
        this.currentRole = role;
    }

    public getPermission(roleName: string): number {
        let role: Role = <Role>find(config.roles, { name: roleName });
        return role.permission;
    }

    public isPermited(userRole: string): boolean {
        return this.getPermission(this.currentRole) === this.getPermission(userRole);
    }

    public setExpiresAt(expiresAt: any): void {
        this.expiresAt = expiresAt;
    }

    public loadExistingSession(): void {
        const idToken: string = localStorage.getItem('id_token');
        const expiresAt: any = localStorage.getItem('expires_at');
        const username: string = localStorage.getItem('username');
        const userrole: string = localStorage.getItem('userrole');

        if (idToken) {
            this.setToken(idToken);
            this.setExpiresAt(expiresAt);
            this.setUser(username);
            this.setRole(userrole);
        }
    }
}
