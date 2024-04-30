export function getType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

export function isObject(value: any) {
  return getType(value) === 'object';
}

export function isArray(value: any) {
  return getType(value) === 'array';
}
