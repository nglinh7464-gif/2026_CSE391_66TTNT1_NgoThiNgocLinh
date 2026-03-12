let students = []; // Mảng gốc lưu tất cả sinh viên
let sortDirection = 0; 

const nameInput = document.getElementById('Name');
const scoreInput = document.getElementById('Score');
const btnAdd = document.getElementById('btnAdd');
const studentTable = document.getElementById('studentTable');
const statsArea = document.getElementById('statsArea');

// Các phần tử phục vụ tìm kiếm/lọc
const searchInput = document.getElementById('searchName');
const filterRank = document.getElementById('filterRank');
const sortScoreBtn = document.getElementById('sortScore');
const sortIcon = document.getElementById('sortIcon');

function getRank(score) {
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5.0) return "Trung bình";
    return "Yếu";
}

// hàm lọc, sắp xếp và hiển thị
function applyFilters() {
    const keyword = searchInput.value.toLowerCase(); // Lấy từ khóa tìm kiếm
    const rankTarget = filterRank.value; // Lấy loại cần lọc

    // 1. Lọc dữ liệu (Filter)
    let filtered = students.filter(s => {
        const matchesName = s.name.toLowerCase().includes(keyword);
        const matchesRank = (rankTarget === "all") || (getRank(s.score) === rankTarget);
        return matchesName && matchesRank;
    });

    // 2. Sắp xếp (Sort)
    if (sortDirection === 1) {
        filtered.sort((a, b) => a.score - b.score); // Tăng dần
        sortIcon.innerText = "▲";
    } else if (sortDirection === 2) {
        filtered.sort((a, b) => b.score - a.score); // Giảm dần
        sortIcon.innerText = "▼";
    } else {
        sortIcon.innerText = "↕";
    }

    renderTable(filtered);
}

function renderTable(dataToShow) {
    studentTable.innerHTML = "";
    let totalScore = 0;

    if (dataToShow.length === 0) {
        studentTable.innerHTML = `<tr><td colspan="5" class="no-result">Không có kết quả</td></tr>`;
    } else {
        dataToShow.forEach((s, index) => {
            const rank = getRank(s.score);
            const rowClass = s.score < 5 ? "warning" : "";
            totalScore += s.score;

            const row = `
                <tr class="${rowClass}">
                    <td>${index + 1}</td>
                    <td>${s.name}</td>
                    <td>${s.score.toFixed(1)}</td>
                    <td>${rank}</td>
                    <td><button class="delete-btn" data-name="${s.name}">Xóa</button></td>
                </tr>
            `;
            studentTable.insertAdjacentHTML('beforeend', row);
        });
    }

    const avg = dataToShow.length > 0 ? (totalScore / dataToShow.length).toFixed(2) : 0;
    statsArea.innerHTML = `Hiển thị: ${dataToShow.length} / Tổng: ${students.length} | ĐTB nhóm này: ${avg}`;
}
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
// Xử lý thêm sinh viên
btnAdd.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Thông tin không hợp lệ!");
        return;
    }

    students.push({ name, score });
    applyFilters(); // Thêm xong thì chạy bộ lọc luôn
    nameInput.value = ""; scoreInput.value = ""; nameInput.focus();
});

// Sự kiện Tìm kiếm realtime
searchInput.addEventListener('input', applyFilters);

// Sự kiện Lọc theo Rank
filterRank.addEventListener('change', applyFilters);

// Sự kiện Click tiêu đề để Sắp xếp
sortScoreBtn.addEventListener('click', () => {
    // Xoay vòng trạng thái: 0 -> 1 -> 2 -> 0
    sortDirection = (sortDirection + 1) % 3;
    applyFilters();
});

// Xóa sinh viên (dựa vào name để xóa trong mảng gốc)
studentTable.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-btn')){
        const nameToDelete = e.target.getAttribute('data-name');
        // Tìm và xóa trong mảng gốc students
        students = students.filter(s => s.name !== nameToDelete);
        applyFilters();
    }
});

scoreInput.addEventListener('keypress', (e) =>{
    if(e.key === 'Enter') addStudent();
});