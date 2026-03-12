let students = []; 
let sortDirection = 0; 

const nameInput = document.getElementById('Name');
const scoreInput = document.getElementById('Score');
const btnAdd = document.getElementById('btnAdd');
const studentTable = document.getElementById('studentTable');
const statsArea = document.getElementById('statsArea');

const searchInput = document.getElementById('searchName');
const filterRank = document.getElementById('filterRank');
const sortScoreBtn = document.getElementById('sortScore');
const sortIcon = document.getElementById('sortIcon');

// Hàm xếp loại 
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// Hàm tổng hợp: Lọc -> Sắp xếp -> Vẽ bảng
function applyFilters() {
    const keyword = searchInput.value.toLowerCase(); // Lấy từ khóa tìm kiếm
    const rankTarget = filterRank.value; // Lấy giá trị lọc (Tất cả/Giỏi/Khá...)

    //lọc (filter)
    let filtered = students.filter(s => {
        const matchesName = s.name.toLowerCase().includes(keyword);
        const matchesRank = (rankTarget === "all") || (getRank(s.score) === rankTarget);
        return matchesName && matchesRank;
    });

    //sắp xếp (Sort)
    if (sortDirection === 1) {
        filtered.sort((a, b) => a.score - b.score); // Tăng dần
        sortIcon.innerText = "▲";
    } else if (sortDirection === 2) {
        filtered.sort((a, b) => b.score - a.score); // Giảm dần
        sortIcon.innerText = "▼";
    } else {
        sortIcon.innerText = "↕";
    }

    // hiển thị (Render)
    renderTable(filtered);
}

// Hàm vẽ bảng dữ liệu ra màn hình
function renderTable(dataToShow) {
    studentTable.innerHTML = ""; // Xóa trắng bảng cũ
    let totalScore = 0;

    if (dataToShow.length === 0) {
        studentTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:gray;">Không tìm thấy kết quả</td></tr>`;
    } else {
        dataToShow.forEach((s, index) => {
            const rank = getRank(s.score);
            const rowClass = s.score < 5 ? "warning" : ""; // Tô vàng nếu điểm < 5
            totalScore += s.score;

            const row = `
                <tr class="${rowClass}">
                    <td>${index + 1}</td>
                    <td>${s.name}</td>
                    <td>${s.score.toFixed(1)}</td>
                    <td>${rank}</td>
                    <td>
                        <button class="delete-btn" data-id="${s.id}">Xóa</button>
                    </td>
                </tr>
            `;
            studentTable.insertAdjacentHTML('beforeend', row);
        });
    }

    // Cập nhật thống kê
    const count = dataToShow.length;
    const avg = count > 0 ? (totalScore / count).toFixed(2) : 0;
    statsArea.innerHTML = `Đang hiển thị: ${count}/${students.length} sinh viên | ĐTB nhóm này: ${avg}`;
}

// Hàm xử lý thêm sinh viên 
function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    // Kiểm tra hợp lệ
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập tên và điểm (0-10) hợp lệ!");
        return;
    }

    // Thêm vào mảng gốc (Kèm ID duy nhất để tránh lỗi trùng tên khi xóa)
    students.push({
        id: Date.now(), 
        name: name,
        score: score
    });

    // Gọi hàm tổng hợp để cập nhật lại bảng
    applyFilters();

    // Reset form và đưa con trỏ về ô tên 
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

// Click nút thêm
btnAdd.addEventListener('click', addStudent);

// Nhấn Enter ở ô điểm 
scoreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

// Tìm kiếm realtime 
searchInput.addEventListener('input', applyFilters);

// Lọc theo xếp loại 
filterRank.addEventListener('change', applyFilters);

// Sắp xếp theo điểm 
sortScoreBtn.addEventListener('click', () => {
    sortDirection = (sortDirection + 1) % 3; 
    applyFilters();
});

// Xóa sinh viên (Event Delegation)
studentTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const idToDelete = parseFloat(e.target.getAttribute('data-id'));
        // Xóa trong mảng gốc dựa trên ID
        students = students.filter(s => s.id !== idToDelete);
        // Cập nhật lại giao diện
        applyFilters();
    }
});