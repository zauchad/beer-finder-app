import API_URL from './config';

const BASE_COLOR = '#000';
const GREEN_COLOR = '#228B22';
const GREY_COLOR = '#CED0CE';
const WHITE_COLOR = '#fff';

/**
 * Prepare url for getting related beers from API based on type attribute
 *
 * @param {string} type
 * @param {number} typeValue
 * @param {number} approx
 */
const urlForRelated = (type, typeValue, approx) => {
  let typeLowerCase = type.toLowerCase();

  return `${API_URL}?${typeLowerCase}_lt=${
    typeValue + approx
  }&${typeLowerCase}_gt=${typeValue - approx}&per_page=5`;
};

export default BASE_COLOR;
export { GREEN_COLOR, GREY_COLOR, WHITE_COLOR, urlForRelated };
