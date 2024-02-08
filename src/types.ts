export interface Prediction {
  status: 'starting' | 'processing' | 'succeede';
  id: string;
  output: [string, string];
}