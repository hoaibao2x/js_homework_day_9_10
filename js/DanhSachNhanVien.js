/**Lưu trữ nhiều đối tượng nhân viên (Mảng nhân viên) 
 *  Thêm nhân viên
 *  Xóa, sửa
 *  Tìm kiếm nhân viên theo điều kiện
 * 
 */

function DanhSachNhanVien() {
    // Properties
    // Mảng các đối tượng nhân viên
    this.mangNV = [];
    // Methods
    this.themNhanVien = function (nv) {
        this.mangNV.push(nv);
    }
    this.timViTri = function (tk) {
        var viTri = -1;
        this.mangNV.map(function (nv, index) {
            if (nv.taiKhoan == tk) {
                viTri = index;
            }
        })
        return viTri;
    }
    this.xoaNhanVien = function (tk) {
        var viTri = this.timViTri(tk);

        if (viTri > -1) {
            this.mangNV.splice(viTri, 1);
        }
    }
    this.capNhatNhanVien = function (nv) {
        var viTri = this.timViTri(nv.taiKhoan);
        if (viTri > -1) {
            dsnv.mangNV[viTri] = nv;
        }
    }
}