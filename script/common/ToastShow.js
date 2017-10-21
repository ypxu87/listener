import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
export default class ToastShow {

    static showToast(infoStr) {
        Toast.hide();
        setTimeout(function() {Toast.info(infoStr,2)},1);
    }

    static loadingToast(infoStr) {
        Toast.loading(infoStr, 10)
    }

    static loadinghide() {
        Toast.hide()
    }
}