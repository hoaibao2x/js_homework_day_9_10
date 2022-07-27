// Global variable
var dsnv = new DanhSachNhanVien();

function getELE(id) {
    return document.getElementById(id);
}

// Create localStorage
function setLocalStorage() {
    localStorage.setItem('DSNV', JSON.stringify(dsnv.mangNV));
}

// Get localStorage
function getLocalStorage() {
    if (localStorage.getItem('DSNV') != undefined) {
        dsnv.mangNV = JSON.parse(localStorage.getItem('DSNV'));
    }
    hienThiDS(dsnv.mangNV);
}
getLocalStorage();

// Thêm nhân viên
function themNhanVien() {
    var taiKhoanNV = getELE('tknv').value;
    var hoTenNV = getELE('name').value;
    var email = getELE('email').value;
    var matKhau = getELE('password').value;
    var ngayLam = getELE('datepicker').value;
    var luongCoBan = Number(getELE('luongCB').value);
    var chucVu = getELE('chucvu').value;
    var gioLam = Number(getELE('gioLam').value);

    // Tạo thể hiện của NhanVien
    var nv = new NhanVien(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
    nv.tinhTongLuong();
    nv.xeploaiNhanVien();

    dsnv.themNhanVien(nv);
    hienThiDS(dsnv.mangNV);
    setLocalStorage();

    getELE('myForm').reset();
}


// Hiển thị danh sách nhân viên
function hienThiDS(mangNV) {
    var content = '';
    mangNV.map(function (nv) {
        // console.log(nv);
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                <td>
                    <button class= "btn btn-info" data-toggle="modal"
									data-target="#myModal" onclick= "xemChiTiet('${nv.taiKhoan}')"><i class="fa fa-search" aria-hidden="true"></i></button>
                    <button class= "btn btn-danger" onclick= "xoaNhanVien('${nv.taiKhoan}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </td>
            </tr>
        `;
    })
    getELE('tableDanhSach').innerHTML = content;
}

// Xóa nhân viên
function xoaNhanVien(tk) {
    dsnv.xoaNhanVien(tk);
    hienThiDS(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}

// Xem chi tiết nhân viên
function xemChiTiet(tk) {
    var viTri = dsnv.timViTri(tk);
    if (viTri > -1) {
        var nvTim = dsnv.mangNV[viTri];
        getELE('tknv').value = nvTim.taiKhoan;
        getELE('tknv').disabled = true;
        getELE('name').value = nvTim.hoTen;
        getELE('email').value = nvTim.email;
        getELE('password').value = nvTim.password;
        getELE('datepicker').value = nvTim.ngayLam;
        getELE('luongCB').value = nvTim.luongCoBan;
        getELE('chucvu').value = nvTim.chucVu;
        getELE('gioLam').value = nvTim.gioLam;
    }
}

// Cập nhật nhân viên
function capNhatNhanVien() {
        var taiKhoanNV = getELE('tknv').value;
        var hoTenNV = getELE('name').value;
        var email = getELE('email').value;
        var matKhau = getELE('password').value;
        var ngayLam = getELE('datepicker').value;
        var luongCoBan = Number(getELE('luongCB').value);
        var chucVu = getELE('chucvu').value;
        var gioLam = Number(getELE('gioLam').value);

        var nv = new NhanVien(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
        nv.tinhTongLuong();
        nv.xeploaiNhanVien();

        dsnv.capNhatNhanVien(nv);
        hienThiDS(dsnv.mangNV);
        setLocalStorage();
}