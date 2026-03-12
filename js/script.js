//Kịch bản: Nhập chọn Add new paragraph
//Kết quả: Thêm 1 đoạn văn mới vào cuối phần tử có class là parent

//Bước 1: Xác định các phần tử sẽ tác động
let parent = document.getElementsByClassName("parent")[0];
let btnAddNew = document.getElementsByTagName("button")[0];

//Bước 2: Thêm sự kiện click vào nút Add new paragraph
btnAddNew.addEventListener("click", hamGoDi );

//Bước 3: Viết hàm để thêm 1 đoạn văn cuối p
function hamGoDi(){
    //Tạo 1 phần tử p mới
    let newParagraph = document.createElement("p");
    newParagraph.textContent = "New Paragraph";
    newParagraph.style.color = "pink";
    //Gan nut moi len cay DOM
    parent.appendChild(newParagraph);
}