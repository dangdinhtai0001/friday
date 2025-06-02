export interface ProductInput {
  productName: string;
  productCode: string;
  price: number | null;
  category: string;
  isAvailable: boolean;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress: string;
  notes: string;
}

export async function initData(): Promise<ProductInput> {
  console.log('Đang gọi API để lấy dữ liệu sản phẩm...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        productName: 'Điện Thoại Thông Minh XYZ',
        productCode: 'DTXYZ123',
        price: 12500000,
        category: 'electronics',
        isAvailable: true,
        deliveryOption: 'delivery',
        deliveryAddress: 'Số 1, Đường ABC, Quận 1, TP.HCM',
        notes: 'Sản phẩm mẫu được load từ hàm asyncInitData.',
      });
    }, 1500); // Giả lập độ trễ 1.5 giây
  });
}
// Hàm xử lý khi form được submit
export async function onSubmit(formData: ProductInput) {
  console.log('✅ Form đã được gửi!', formData);
  console.log('Trạng thái form đầy đủ khi gửi:', formData);
  // Đây là nơi bạn sẽ gọi API để lưu dữ liệu sản phẩm
}
