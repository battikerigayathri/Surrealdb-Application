import { RecordId } from "surrealdb";
import { db } from "../config/SurrealDB";

type userType = {
  id?: string;
  name: string;
  email: string;
};

export class User {
  id?: string;
  name: string;
  email: string;

  constructor(name: string, email: string, id?: string) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  static async create(user: Omit<User, "id">): Promise<User> {
    const created = await db.create("user", user);
    return new User(created[0].name, created[0].email, created[0].id);
  }

  static async findById(id: string): Promise<User | null> {
    const user = await db.select<userType>(new RecordId('user', id));
    console.log(user, id, "model user");
    return user;
  }

  static async findAll(): Promise<User[]> {
    const users = await db.select("user");
    return users.map(
      (u: { name: string; email: string; id: string | undefined }) =>
        new User(u.name, u.email, u.id)
    );
  }
  static async update(data: Partial<userType>): Promise<User | null> {
    const record = await db.update<userType, Pick<userType, "name" | "email">>(
      new RecordId("user", data.id),
      {
        name: `${data.name}`,
        email: `${data.email},`,
      }
    );
    console.log(record, "record");
    return record;
  }

  static async delete(id: string) {
    const data = await db.delete(new RecordId("user", id));
    console.log(data, "data in delete");
    return data;
  }
}
