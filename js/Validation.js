function getELE(id) {
    return document.getElementById(id);
}

function Validation() {
    // Empty check
    this.isEmpty = function (inputVal, spanID, message) {

        if (inputVal.trim() != "") {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // Select option check
    this.isSelected = function (inputVal, spanID, message) {
        var myIndex = getELE(inputVal).selectedIndex;

        if (myIndex != 0) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // Length of id check
    this.lengthOfId = function (inputVal, spanID, message) {
        var pattern = /^.{4,6}$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // Format of name input check
    this.formatOfName = function (inputVal, spanID, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // Email format check
    this.isEmail = function (inputVal, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // Format password check
    this.formatOfPass = function (inputVal, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // Length of salary check
    this.lengthOfSalary = function (inputVal, spanID) {
        var pattern = /^[0-9]+[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "Tiền lương phải là dạng chữ số !";
            getELE(spanID).style.display = "block";

            return false;

        } else if (inputVal < 0) {
            getELE(spanID).innerHTML = "Tiền lương phải là số dương";
            getELE(spanID).style.display = "block";

            return false;
        } else if (inputVal < 1e+6) {
            getELE(spanID).innerHTML = "Tiền lương tối thiểu là 1 000 000 !";
            getELE(spanID).style.display = "block";

            return false;
        } else if (inputVal > 20e+6) {
            getELE(spanID).innerHTML = "Tiền lương tối đa là 20 000 000 !";
            getELE(spanID).style.display = "block";

            return false;
        }

        return true;
    }
    // Format of working time check
    this.timeForWork = function (inputVal, spanID) {

        var pattern = /^[0-9]+$/

        if (!inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "Thời gian làm việc phải là kiểu số !";
            getELE(spanID).style.display = "block";

            return false;

        } else if (inputVal <= 0) {
            getELE(spanID).innerHTML = "Số giờ làm phải lớn hơn 0 !";
            getELE(spanID).style.display = "block";

            return false;

        } else if (inputVal < 80) {
            getELE(spanID).innerHTML = "Số giờ làm tối thiểu là 80 giờ !";
            getELE(spanID).style.display = "block";

            return false;

        } else if (inputVal > 200) {
            getELE(spanID).innerHTML = "Số giờ làm tối đa là 200 giờ !";
            getELE(spanID).style.display = "block";

            return false;
        }

        return true;
    }
    // Duplicate account name check
    this.isDuplicate = function (inputVal, spanID, message, mangNV) {
        var isExist = false;

        isExist = mangNV.some(function (nv, index) {
            return nv.taiKhoan === inputVal.replaceAll(" ", "");
        });

        if (isExist) {
            getELE(spanID).innerHTML = message;
            getELE(spanID).style.display = "block";

            return false;
        }

        getELE(spanID).innerHTML = "";
        getELE(spanID).style.display = "none";

        return true;
    }
}