export interface Prediction {
  status: string | 'processing' | 'succeede';
  id: string;
  output: [string, string];
}