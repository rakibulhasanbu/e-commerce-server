interface TCourse {
  name: string;
  slug?: string;
  description: string;
  price: number;
  offerPrice: number;
  thumbnail: string;
  batchNo: number;
  schedule: object;
  demoUrl: string;
  isPremium?: boolean;
  isPublish?: boolean;
  purchased?: number;
  specialty?: any;
  rewards?: any;
  topic?: any;
}
