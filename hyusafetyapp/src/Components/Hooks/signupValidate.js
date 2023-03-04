export default function validate({ id, pw, pwCheck, email, name }) {
    const errors = {};

    if (!id) {
        errors.id = "아이디가 입력되지 않았습니다.";
    }

    if (!pw) {
        errors.pw = "비밀번호가 입력되지 않았습니다.";
    }

    if (!pwCheck) {
        errors.pwCheck = "비밀번호 확인이 입력되지 않았습니다.";
    }

    if (pw !== pwCheck){
        errors.pwCheck = "비밀번호가 서로 다릅니다."
    }

    if (!name) {
        errors.name = "이름이 입력되지 않았습니다.";
    }

    if (!email) {
        errors.email = "이메일이 입력되지 않았습니다.";
    }

    return errors;
}