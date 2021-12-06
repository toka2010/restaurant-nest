

 export class GenericPagination<Type> {
  data: Type;
  total: number;

  pageNumber: number;
  limit: number;
  totalPages: number;
  constructor(
    data: Type, total: number, limit: number, pageNumber: number, totalPages: number) {
    this.data = data;
    this.total = total;
    this.limit = limit;
    this.pageNumber = pageNumber;
    this.totalPages = totalPages;
  }

  

  
}


