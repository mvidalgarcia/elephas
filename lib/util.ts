export function pick(object: any, keys: Array<string>) {
  return keys.reduce((obj: any, key: string) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}
