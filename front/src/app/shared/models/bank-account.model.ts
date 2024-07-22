export class BankAccount {
  constructor(
    public accountNumber?: string,
    public accountLimit?: string,
    public client?: string,
    public manager?: string,
    public created_at?: string,
    public saldo?: string
  ) {}
}
