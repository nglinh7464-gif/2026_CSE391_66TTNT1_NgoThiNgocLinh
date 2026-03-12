// Truy xuất các phần tử
const form = document.getElementById('registrationForm');
const successArea = document.getElementById('successMessage');

// --- 1. CÁC HÀM TIỆN ÍCH (YÊU CẦU KỸ THUẬT) ---

// Hiển thị lỗi: Hiện thông báo và đổi viền đỏ
function showError(fieldId, message) {
    const inputField = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + 'Error');
    const parent = inputField.closest('.form-control');

    errorSpan.innerText = message;
    parent.classList.add('invalid');
    parent.classList.remove('valid');
}

// Xóa lỗi: Ẩn thông báo và đổi viền xanh (YÊU CẦU KỸ THUẬT)
function clearError(fieldId) {
    const inputField = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + 'Error');
    const parent = inputField.closest('.form-control');

    errorSpan.innerText = "";
    parent.classList.remove('invalid');
    parent.classList.add('valid');
}

// --- 2. CÁC HÀM VALIDATE RIÊNG BIỆT (TRẢ VỀ TRUE/FALSE) ---

function validateFullname() {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (val === "") { showError('fullname', "Họ tên không được trống"); return false; }
    if (val.length < 3) { showError('fullname', "Họ tên phải ít nhất 3 ký tự"); return false; }
    if (!regex.test(val)) { showError('fullname', "Họ tên chỉ chứa chữ cái và khoảng trắng"); return false; }
    clearError('fullname');
    return true;
}

function validateEmail() {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val === "") { showError('email', "Email không được trống"); return false; }
    if (!regex.test(val)) { showError('email', "Email không đúng định dạng (name@domain.com)"); return false; }
    clearError('email');
    return true;
}

function validatePhone() {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0[0-9]{9}$/;
    if (val === "") { showError('phone', "Số điện thoại không được trống"); return false; }
    if (!regex.test(val)) { showError('phone', "SĐT phải 10 số và bắt đầu bằng số 0"); return false; }
    clearError('phone');
    return true;
}

function validatePassword() {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (val === "") { showError('password', "Mật khẩu không được trống"); return false; }
    if (!regex.test(val)) { showError('password', "Mật khẩu ≥ 8 ký tự, có chữ Hoa, thường và số"); return false; }
    clearError('password');
    return true;
}

function validateConfirm() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm === "") { showError('confirmPassword', "Vui lòng xác nhận mật khẩu"); return false; }
    if (confirm !== pass) { showError('confirmPassword', "Mật khẩu xác nhận không khớp"); return false; }
    clearError('confirmPassword');
    return true;
}

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');
    const errorSpan = document.getElementById('genderError');
    if (!gender) {
        errorSpan.innerText = "Bắt buộc chọn 1 giới tính";
        return false;
    }
    errorSpan.innerText = "";
    return true;
}

function validateTerms() {
    const checked = document.getElementById('terms').checked;
    const errorSpan = document.getElementById('termsError');
    if (!checked) {
        errorSpan.innerText = "Bạn phải đồng ý với điều khoản";
        return false;
    }
    errorSpan.innerText = "";
    return true;
}

// --- 3. GẮN SỰ KIỆN BLUR & INPUT (YÊU CẦU KỸ THUẬT) ---

const fieldMappings = [
    { id: 'fullname', validate: validateFullname },
    { id: 'email', validate: validateEmail },
    { id: 'phone', validate: validatePhone },
    { id: 'password', validate: validatePassword },
    { id: 'confirmPassword', validate: validateConfirm }
];

fieldMappings.forEach(item => {
    const input = document.getElementById(item.id);

    // Validate ngay khi rời khỏi trường (blur)
    input.addEventListener('blur', item.validate);

    // Xóa lỗi ngay khi người dùng bắt đầu nhập lại (input)
    input.addEventListener('input', () => {
        clearError(item.id);
    });
});

// --- 4. XỬ LÝ KHI SUBMIT FORM (KIỂM TRA TỔNG THỂ) ---

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn load lại trang

    // Gọi tất cả các hàm validate
    // Dùng biến riêng để đảm bảo tất cả các hàm đều được chạy (không dùng && trực tiếp vì nó dừng sớm)
    const isValidName = validateFullname();
    const isValidEmail = validateEmail();
    const isValidPhone = validatePhone();
    const isValidPass = validatePassword();
    const isValidConfirm = validateConfirm();
    const isValidGender = validateGender();
    const isValidTerms = validateTerms();

    // KIỂM TRA ĐIỀU KIỆN THÀNH CÔNG (YÊU CẦU KỸ THUẬT)
    if (isValidName && isValidEmail && isValidPhone && isValidPass && 
        isValidConfirm && isValidGender && isValidTerms) {
        
        const userName = document.getElementById('fullname').value;
        
        // Ẩn form và hiện thông báo thành công
        form.style.display = 'none';
        successArea.style.display = 'block';
        successArea.innerHTML = `
            <div style="padding: 20px; border: 2px solid #2ecc71; border-radius: 8px;">
                <h2 style="color: #2ecc71;">Đăng ký thành công! 🎉</h2>
                <p>Chào mừng <strong>${userName}</strong>, tài khoản của bạn đã được tạo.</p>
            </div>
        `;
    } else {
        console.log("Validate thất bại, không thể gửi form.");
    }
});