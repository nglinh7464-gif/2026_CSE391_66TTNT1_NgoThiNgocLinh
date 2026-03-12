//kho se chua 1
//nguoi dung nhap ten trai cay vao o input
//khi nguoi dung click vao nut Show Fruit, neu co loai trai cay do
//buoc 1: xac dinh cac phan tu se tac dong
let inputFruit = document.getElementById("fruitSearch");
let btnShowFruit = document.querySelector("search-fruit button");
let displayFruit = document.querySelector("display-fruit p");
let ShowFruit = document.querySelector("display-fruit .show-fruit");
//buoc 2: them su kien click vao nut Show Fruit
btnShowFruit.addEventListener("click", function(){
    //buoc 3: lay gia tri nguoi dung nhap vao o input
    let fruitName = inputFruit.value.trim().toLowerCase();
    //buoc 4: kiem tra xem loai trai cay do co trong kho hay khong
    let fruitStock = ["apple", "banana", "orange", "grape", "mango"];
    if (fruitStock.includes(fruitName)){
        //neu co, hien thi ten trai cay do
        displayFruit.textContent = "We have " + fruitName + " in stock!";
        //hien thi hinh anh cua trai cay
        showFruit.innerHTML = '<img src="images/' + fruitName + '.jpg" alt="' + fruitName + '" style="width:200px">';
    } else{
        //neu khong, hien thi "Nothing to display"
        displayFruit.textContent = "Nothing to display";
        //hien thi hinh anh mac dinh    
        showFruit.innerHTML = '<img src="images/banana.jpg" alt="No Image" style="width:200px">';
    }
    //buoc 5: xoa gia tri trong o input sau khi hien thi ket qua
    inputFruit.value = "";
});