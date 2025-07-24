// import {Supplier} from "./supplier";
// import {Category} from "./category";
//
// export class Supply {
//
//   public id !: number;
//   public category !: Category[];
//
//   constructor(id: number, category: Category[]) {
//     this.id = id;
//     this.category = category;
//   }
// }
import { Category } from './category';

export class Supply {
  // id: number;
  category: Category;

  constructor(params: { id?: number; category?: Category } = {}) {
    // this.id = params.id ?? 0;
    this.category = params.category ?? {} as Category;
  }

  // Optional: Add a static method to create a Supply instance
  static create(id?: number, category?: Category): Supply {
    return new Supply({ id, category });
  }
}
