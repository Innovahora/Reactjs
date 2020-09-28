import { BASE_URL } from './constants';
export const exist = value => {
  if (
    value !== undefined &&
    value !== null &&
    value !== 'undefined' &&
    value !== 'null'
  ) {
    return true;
  }
  return false;
};

export const priceFormat = value => {
	let num = parseFloat(value);

  if (!num || num == 'NaN') return '0.00';
  if (num == 'Infinity') return '0.00';

  num = num.toString().replace(/\$|\,/g, '');

  if (isNaN(num))
      num = "0";
  const sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
      cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '') + num + '.' + cents);
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const getPathUpload = (filename) => {
  return `${BASE_URL}/uploads/${filename}`;
}
