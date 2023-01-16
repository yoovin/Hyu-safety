export default function validate({ title, author, subject }: any) {
    const errors: any = {};

    if (!title) {
        errors.title = "제목이 입력되지 않았습니다.";
    }

    if (!author) {
        errors.title = "글쓴이가 입력되지 않았습니다.";
    }

    if (!subject) {
        errors.title = "주제가 입력되지 않았습니다.";
    }

    // if (!password) {
    //     errors.password = "비밀번호가 입력되지 않았습니다.";
    // } else if (password.length < 8) {
    //     errors.password = "8자 이상의 패스워드를 사용해야 합니다.";
    // }

    return errors;
}