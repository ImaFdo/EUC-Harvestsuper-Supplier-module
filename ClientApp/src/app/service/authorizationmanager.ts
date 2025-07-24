import { Injectable } from '@angular/core';
import { AuthoritySevice } from './authoritysevice';

@Injectable()
export class AuthorizationManager {

  private readonly localStorageUsreName = 'username';
  private readonly localStorageButtonKey = 'buttonState';
  private readonly localStorageAdmMenus = 'admMenuState';
  private readonly localStorageInvMenus = 'invMenuState';
  private readonly localStoragePurMenus = 'purMenuState';

  public enaadd = false;
  public enaupd = false;
  public enadel = false;

  admMenuItems = [
    { name: 'Employee', accessFlag: true, routerLink: 'employee' },
    { name: 'User', accessFlag: true, routerLink: 'user' },
    { name: 'Privilege', accessFlag: true, routerLink: 'privilege' },
    { name: 'Operation', accessFlag: true, routerLink: 'operation' }
  ];

  invMenuItems = [
    { name: 'Item', accessFlag: true, routerLink: 'item' }
  ];

  purMenuItems = [
    { name: 'Supplier', accessFlag: true, routerLink: 'supplier' }
  ];

  constructor(private am: AuthoritySevice) {}

  enableButtons(authorities: { module: string; operation: string }[]): void {
    this.enaadd = authorities.some(authority => authority.operation === 'insert');
    this.enaupd = authorities.some(authority => authority.operation === 'update');
    this.enadel = authorities.some(authority => authority.operation === 'delete');

    // Save button state in localStorage
    localStorage.setItem(this.localStorageButtonKey, JSON.stringify({ enaadd: this.enaadd, enaupd: this.enaupd, enadel: this.enadel }));
  }

  enableMenues(modules: { module: string; operation: string }[]): void {
    this.admMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });
    // Save menu state in localStorage
    localStorage.setItem(this.localStorageAdmMenus, JSON.stringify(this.admMenuItems));

    this.invMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });
    // Save menu state in localStorage
    localStorage.setItem(this.localStorageInvMenus, JSON.stringify(this.invMenuItems));

    // Save menu state in localStorage
    this.purMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });
    localStorage.setItem(this.localStoragePurMenus, JSON.stringify(this.purMenuItems));

  }

  async getAuth(username: string): Promise<void> {

    this.setUsername(username);

    try {
      const result = await this.am.getAutorities(username);
      if (result !== undefined) {
        const authorities = result.map(authority => {
          const [module, operation] = authority.split('-');
          return { module, operation };
        });

        this.enableButtons(authorities);
        this.enableMenues(authorities);

      } else {
        console.log('Authorities are undefined');
      }
    } catch (error) {
      console.error(error);
    }
  }

  getUsername(): string {
    return localStorage.getItem(this.localStorageUsreName) || '';
  }

  setUsername(value: string): void {
    localStorage.setItem(this.localStorageUsreName, value);
  }

  getEnaAdd(): boolean {
    return this.enaadd;
  }

  getEnaUpd(): boolean {
    return this.enaupd;
  }

  getEnaDel(): boolean {
    return this.enadel;
  }

  initializeButtonState(): void {
    const buttonState = localStorage.getItem(this.localStorageButtonKey);
    if (buttonState) {
      const { enaadd, enaupd, enadel } = JSON.parse(buttonState);
      this.enaadd = enaadd;
      this.enaupd = enaupd;
      this.enadel = enadel;
    }
  }

  initializeMenuState(): void {
    const admMenuState = localStorage.getItem(this.localStorageAdmMenus);
    if (admMenuState) {
      this.admMenuItems = JSON.parse(admMenuState);
    }

    const invMenuState = localStorage.getItem(this.localStorageInvMenus);
    if (invMenuState) {
      this.invMenuItems = JSON.parse(invMenuState);
    }
    const purMenuState = localStorage.getItem(this.localStoragePurMenus);
    if (purMenuState) {
      this.purMenuItems = JSON.parse(purMenuState);
    }

  }

  clearUsername(): void {
    localStorage.removeItem(this.localStorageUsreName);
  }

  clearButtonState(): void {
    localStorage.removeItem(this.localStorageButtonKey);
  }

  clearMenuState(): void {
    localStorage.removeItem(this.localStorageAdmMenus);
    localStorage.removeItem(this.localStorageInvMenus);
  }

  isMenuItemDisabled(menuItem: { accessFlag: boolean }): boolean {
    return !menuItem.accessFlag;
  }

}
