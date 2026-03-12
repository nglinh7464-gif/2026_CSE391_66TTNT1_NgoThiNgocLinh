document.addEventListener('DOMContentLoaded', () => {
    const prices = { "Laptop": 20000000, "Chuột": 500000, "Bàn phím": 1200000 };
    
    const form = document.getElementById('orderForm');
    const productEl = document.getElementById('product');
    const quantityEl = document.getElementById('quantity');
    const noteEl = document.getElementById('note');
    const totalDisplay = document.getElementById('totalDisplay');
    const charCount = document.getElementById('charCount');
    const confirmDialog = document.getElementById('confirmDialog');
    const summary = document.getElementById('summary');

    // tính tổng tiền
    function updateTotal() {
        const product = productEl.value;
        const qty = parseInt(quantityEl.value) || 0;
        const price = prices[product] || 0;
        const total = price * qty;
        totalDisplay.innerText = `Tổng tiền: ${total.toLocaleString('vi-VN')}đ`;
    }
    productEl.addEventListener('change', updateTotal);
    quantityEl.addEventListener('input', updateTotal);

    // đếm kí tự realtime
    noteEl.addEventListener('input', () => {
        const len = noteEl.value.length;
        charCount.innerText = `${len}/200`;
        if (len > 200) {
            charCount.style.color = "red";
            showError('note', "Ghi chú không được quá 200 ký tự");
        } else {
            charCount.style.color = "black";
            clearError('note');
        }
    });

    function showError(id, msg) {
        const span = document.getElementById(id + 'Error');
        span.innerText = msg;
        document.getElementById(id).style.borderColor = "red";
    }

    function clearError(id) {
        const span = document.getElementById(id + 'Error');
        span.innerText = "";
        document.getElementById(id).style.borderColor = "";
    }

    function validate() {
        let isValid = true;

        // Sản phẩm
        if (!productEl.value) { showError('product', "Vui lòng chọn sản phẩm"); isValid = false; }
        else clearError('product');

        // Số lượng
        const qty = parseInt(quantityEl.value);
        if (isNaN(qty) || qty < 1 || qty > 99) { showError('quantity', "Số lượng từ 1-99"); isValid = false; }
        else clearError('quantity');

        // Ngày giao hàng
        const dateVal = new Date(document.getElementById('deliveryDate').value);
        const today = new Date();
        today.setHours(0,0,0,0);
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 30);

        if (!document.getElementById('deliveryDate').value) {
            showError('deliveryDate', "Vui lòng chọn ngày"); isValid = false;
        } else if (dateVal < today || dateVal > maxDate) {
            showError('deliveryDate', "Ngày giao từ hôm nay đến 30 ngày tới"); isValid = false;
        } else clearError('deliveryDate');

        // Địa chỉ
        if (document.getElementById('address').value.trim().length < 10) {
            showError('address', "Địa chỉ phải từ 10 ký tự"); isValid = false;
        } else clearError('address');

        // Thanh toán
        const payment = document.querySelector('input[name="payment"]:checked');
        if (!payment) {
            document.getElementById('paymentError').innerText = "Chọn phương thức thanh toán";
            isValid = false;
        } else {
            document.getElementById('paymentError').innerText = "";
        }

        return isValid;
    }

    // submit và xác nhận
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validate()) {
            form.style.display = "none";
            confirmDialog.style.display = "block";
            summary.innerHTML = `
                <p>Sản phẩm: ${productEl.value}</p>
                <p>Số lượng: ${quantityEl.value}</p>
                <p>${totalDisplay.innerText}</p>
                <p>Ngày giao: ${document.getElementById('deliveryDate').value}</p>
            `;
        }
    });

    document.getElementById('btnCancel').addEventListener('click', () => {
        confirmDialog.style.display = "none";
        form.style.display = "block";
    });

    document.getElementById('btnFinalConfirm').addEventListener('click', () => {
        confirmDialog.style.display = "none";
        document.getElementById('finalSuccess').style.display = "block";
    });
});