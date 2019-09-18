
export interface Entry {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
}

export interface RetailItem extends Entry {
  readonly purchaseDate?: string;
  readonly purchaseStore?: string;
  readonly purchasePrice?: string;
  readonly productUrl?: string;
}
