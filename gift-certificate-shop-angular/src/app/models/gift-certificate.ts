import { Tag } from "./tag";

export class GiftCertificate {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  tags: Array<Tag>;

  constructor() {
    this.id = 0;
    this.name = "";
    this.price = 0;
    this.duration = 0;
    this.description = "";
    this.tags = [];
  }
}
