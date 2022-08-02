/** Lớp đối tượng nhân viên */
function NhanVien(taiKhoan, hoTen, email, password, ngayLam, luongCoBan, chucVu, gioLam, tongLuong, xepLoai) {
    // Properties
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.password = password;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = tongLuong;
    this.xepLoai = xepLoai;
    // Methods
    this.tinhTongLuong = function () {
        if (this.chucVu == 'Sếp') {
            this.tongLuong = this.luongCoBan * 3;
        } else if (this.chucVu == 'Trưởng phòng') {
            this.tongLuong = this.luongCoBan * 2;
        } else if (this.chucVu == 'Nhân viên') {
            this.tongLuong = this.luongCoBan;
        }
    }
    this.xeploaiNhanVien = function () {
        if (this.gioLam >= 192) {
            this.xepLoai = 'Nhân viên xuất sắc';
        } else if (this.gioLam >= 176 && this.gioLam < 192) {
            this.xepLoai = 'Nhân viên giỏi';
        } else if (this.gioLam >= 160 && this.gioLam < 176) {
            this.xepLoai = 'Nhân viên khá';
        } else {
            this.xepLoai = 'Nhân viên trung bình';
        }
    }
    this.displayRole = function () {
        var mySelect = this.chucVu;
        var result = mySelect.options[mySelect.selectedIndex].text;

        return result;
    }

}