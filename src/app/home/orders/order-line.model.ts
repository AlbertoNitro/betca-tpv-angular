export interface OrderLine {
  articleId: string;
  articleDescription: string;
  stock: number;
  requiredAmount: number;
  finalAmount?: number;
}
