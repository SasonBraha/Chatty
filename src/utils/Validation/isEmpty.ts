export default (value: any): boolean => {
  return !value || (typeof value === 'object' && !Object.keys(value).length) || (typeof value === 'string' && !value.trim().length);
}
  
