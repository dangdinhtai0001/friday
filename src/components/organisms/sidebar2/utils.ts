/**
 * Đọc giá trị của một cookie từ trình duyệt.
 * @param name Tên của cookie cần đọc.
 * @returns {string | undefined} Giá trị của cookie, hoặc `undefined` nếu không tìm thấy.
 */
export function getCookie(name: string): string | undefined {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return undefined;
}

/**
 * Thiết lập một cookie trong trình duyệt.
 * @param name Tên của cookie.
 * @param value Giá trị của cookie (có thể là boolean hoặc string).
 * @param maxAge Thời gian tồn tại của cookie (tính bằng giây).
 */
export function setCookie(
  name: string,
  value: string | boolean,
  maxAge: number,
) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}
