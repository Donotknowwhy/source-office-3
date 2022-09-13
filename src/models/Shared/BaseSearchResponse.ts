export default interface BaseSearchResponse<T> {
  data?: T[];
  total?: number;
}
