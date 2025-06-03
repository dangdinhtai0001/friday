import { Path } from "react-hook-form";

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
// --- Disabled Policy ---
export function disabledPolicy(
  values: ProductInput,
): Partial<Record<Path<ProductInput>, boolean>> {
  const disabledFields: Partial<Record<Path<ProductInput>, boolean>> = {};

  // Trường 'deliveryAddress' bị disabled nếu 'deliveryOption' không phải là 'delivery'
  if (values.deliveryOption !== 'delivery') {
    disabledFields.deliveryAddress = true;
  } else {
    // Nếu là 'delivery', đảm bảo nó không bị disabled bởi chính sách này
    disabledFields.deliveryAddress = false;
  }

  // productCode bị disabled nếu productName quá ngắn (ví dụ: ít hơn 3 ký tự)
  if (values.productName && values.productName.length < 3) {
    disabledFields.productCode = true;
  } else {
    // Nếu productName đủ dài, đảm bảo productCode không bị disabled bởi chính sách này
    disabledFields.productCode = false;
  }

  return disabledFields;
}
// --- ReadOnly Policy ---
export function readOnlyPolicy(values: ProductInput) {
  return {
    // Trường 'productCode' chỉ đọc nếu 'productName' quá dài (ví dụ từ config của bạn)
    productCode: values.productName.length > 50,
    // Ví dụ khác: 'price' chỉ đọc nếu 'isAvailable' là false
    price: !values.isAvailable,
    // Thêm các điều kiện readOnly khác
  };
}
// --- Visible Policy ---
export function vbisiblePolicy(values: ProductInput) {
  return {
    // Trường 'deliveryAddress' chỉ hiển thị khi 'deliveryOption' là 'delivery'
    deliveryAddress: values.deliveryOption === 'delivery',
    // Trường 'notes' chỉ hiển thị nếu sản phẩm không có sẵn HOẶC giá cao
    notes:
      !values.isAvailable || (values.price !== null && values.price > 10000000),
    // Thêm các điều kiện visible khác
  };
}
