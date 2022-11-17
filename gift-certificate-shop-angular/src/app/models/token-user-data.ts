export class TokenUserData {
  id: number;
  login: string;
  name: string;
  roles: Array<string>;
  exp: number;
  iat: number;

  constructor() {
    this.id = 0;
    this.login = "";
    this.name = "";
    this.roles = [];
    this.exp = 0;
    this.iat = 0;
  }
}
