import { ValidateResponse } from '@/components/organisms/form/form-container';
import { FieldValues, Path } from 'react-hook-form';

export interface ProductInput extends FieldValues  {
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
export async function onSubmit(formData: ProductInput): Promise<void> {
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

export async function validate(
  data: ProductInput,
): Promise<ValidateResponse<ProductInput>> {
  console.log('Bắt đầu validate form với dữ liệu:', data);
  const errors: ValidateResponse<ProductInput>['errors'] = {}; // Khởi tạo đối tượng lỗi

  // --- Logic Validation Tùy Chỉnh cho từng trường và mối quan hệ giữa các trường ---

  // 1. Validate `productName`
  if (!data.productName || data.productName.trim() === '') {
    errors.productName = { message: 'Tên Sản Phẩm là bắt buộc.' };
  } else if (data.productName.length < 5) {
    errors.productName = { message: 'Tên Sản Phẩm phải có ít nhất 5 ký tự.' };
  } else if (data.productName.length > 100) {
    errors.productName = {
      message: 'Tên Sản Phẩm không được vượt quá 100 ký tự.',
    };
  } else if (data.productName === '123') {
    // Ví dụ validation cụ thể bạn yêu cầu
    errors.productName = { message: 'Tên sản phẩm "123" không được phép.' };
  }

  // 2. Validate `productCode`
  if (!data.productCode || data.productCode.trim() === '') {
    errors.productCode = { message: 'Mã Sản Phẩm là bắt buộc.' };
  } else if (!/^[A-Z0-9]{3,10}$/.test(data.productCode)) {
    errors.productCode = {
      message: 'Mã Sản Phẩm không đúng định dạng (3-10 ký tự chữ hoa hoặc số).',
    };
  }
  // Logic: productCode bị lỗi nếu productName quá ngắn (ví dụ: < 3 ký tự)
  if (data.productName && data.productName.length < 3 && data.productCode) {
    errors.productCode = {
      message: 'Mã sản phẩm không được phép nếu tên sản phẩm quá ngắn.',
    };
  }

  // 3. Validate `price`
  if (data.price === null || data.price === undefined) {
    errors.price = { message: 'Giá là bắt buộc.' };
  } else if (typeof data.price === 'number' && data.price < 0) {
    errors.price = { message: 'Giá phải lớn hơn hoặc bằng 0.' };
  }
  // Logic: Giá sản phẩm điện tử không thể thấp hơn 100,000 VND
  if (
    data.price !== null &&
    data.price < 100000 &&
    data.category === 'electronics'
  ) {
    errors.price = {
      message: 'Giá sản phẩm điện tử không thể thấp hơn 100,000 VND.',
    };
  }

  // 4. Validate `category`
  if (!data.category || data.category.trim() === '') {
    errors.category = { message: 'Danh Mục là bắt buộc.' };
  }

  // 5. Validate `deliveryOption`
  if (!data.deliveryOption || data.deliveryOption.trim() === '') {
    errors.deliveryOption = { message: 'Tùy chọn giao hàng là bắt buộc.' };
  }

  // 6. Validate `deliveryAddress` (chỉ khi `deliveryOption` là 'delivery')
  if (data.deliveryOption === 'delivery') {
    if (!data.deliveryAddress || data.deliveryAddress.trim() === '') {
      errors.deliveryAddress = {
        message: 'Địa chỉ giao hàng là bắt buộc khi chọn giao hàng tận nơi.',
      };
    } else if (data.deliveryAddress.length < 10) {
      errors.deliveryAddress = {
        message: 'Địa chỉ giao hàng phải có ít nhất 10 ký tự.',
      };
    }
  }

  // 7. Validate `notes`
  if (data.notes && data.notes.length > 500) {
    errors.notes = { message: 'Ghi chú không được vượt quá 500 ký tự.' };
  }

  // --- Trả về kết quả validation ---
  return {
    values: data, 
    errors, // Đối tượng chứa các lỗi
  };
}
