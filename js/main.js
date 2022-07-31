// Global variable
var dsnv = new DanhSachNhanVien();
var isValid = new Validation();

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

// Reset form when click Add button
function formDefault() {
    getELE('myForm').reset();
    getELE('tknv').disabled = false;
    getELE("btnCapNhat").style.display = "none";
}

// Hide Error
function hideError() {
    var arrClass = document.querySelectorAll(".err_noti");

    arrClass.forEach((err_noti) => {
        err_noti.style.display = "none";
    });
}

// Validation function
function checkAllInput(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {

    /** --------- Validation --------- */
    var status = true;

    // Tài khoản
    if (!getELE("tknv").disabled) {
        status &= isValid.isEmpty(taiKhoanNV, "tbTKNV", "Tài khoản không được để trống !") && isValid.lengthOfId(taiKhoanNV, "tbTKNV", "Tài khoản tối đa 4-6 ký số !") && isValid.isDuplicate(taiKhoanNV, "tbTKNV", "Tài khoản không được trùng !", dsnv.mangNV);
    }

    // Họ và tên
    status &= isValid.isEmpty(hoTenNV, "tbTen", "Họ và tên không được để trống !") && isValid.formatOfName(hoTenNV, "tbTen", "Họ tên nhân viên phải là chữ !");

    // Email
    status &= isValid.isEmpty(email, "tbEmail", "Email không được để trống !") && isValid.isEmail(email, "tbEmail", "Email phải đúng định dạng !");

    // Password
    status &= isValid.formatOfPass(matKhau, "tbMatKhau", "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và từ 6-10 ký tự !");

    // Date
    status &= isValid.isEmpty(ngayLam, "tbNgay", "Ngày không được để trống !");

    // Salary
    status &= isValid.isEmpty(luongCoBan, "tbLuongCB", "Lương không được để trống !") && isValid.lengthOfSalary(luongCoBan, "tbLuongCB");

    // Role
    status &= isValid.isSelected("chucvu", "tbChucVu", "Hãy chọn chức vụ !");

    // Work time
    status &= isValid.isEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống !") && isValid.timeForWork(gioLam, "tbGiolam");

    /** --------- End Validation --------- */

    return status;

}

// Thêm nhân viên
function themNhanVien() {
    var taiKhoanNV = getELE('tknv').value;
    var hoTenNV = getELE('name').value;
    var email = getELE('email').value;
    var matKhau = getELE('password').value;
    var ngayLam = getELE('datepicker').value;
    var luongCoBan = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gioLam = getELE('gioLam').value;

    var callValidation = checkAllInput(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);

    if (callValidation) {

        alert('Thêm mới nhân viên thành công !');

        // Tạo thể hiện của NhanVien
        var nv = new NhanVien(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, Number(luongCoBan), chucVu, Number(gioLam));
        nv.tinhTongLuong();
        nv.xeploaiNhanVien();

        dsnv.themNhanVien(nv);
        hienThiDS(dsnv.mangNV);
        setLocalStorage();

        location.reload();
    }
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
    getELE("btnCapNhat").style.display = "block";
    hideError();

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
    var luongCoBan = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gioLam = getELE('gioLam').value;

    var callValidation = checkAllInput(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);

    if (callValidation) {
        alert("Cập nhật thành công !");

        var nv = new NhanVien(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, Number(luongCoBan), chucVu, Number(gioLam));
        nv.tinhTongLuong();
        nv.xeploaiNhanVien();

        dsnv.capNhatNhanVien(nv);
        hienThiDS(dsnv.mangNV);
        setLocalStorage();

        location.reload();
    }


}