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
    return errors;
}