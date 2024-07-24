import { MODEL } from "..";
import { User } from "./user.model";
import { Address } from "./address.model";

export class Client extends User {
  constructor(
    public override id?: string,
    public override name?: string,
    public override cpf?: string,
    public override email?: string,
    public override password?: string,
    public override cellphone?: string,
    public override type?: string,
    public status?: string,
    public manager?: string,
    public salary?: string,
    public address?: MODEL.Address
  ) {
    super(id, name, cpf, email, password, cellphone, type);
  }
}
