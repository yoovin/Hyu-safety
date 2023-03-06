export default interface workreport {
    index: number
    id: string
    request_depart: string
    position: string
    name: string
    phone: string
    work_place: string
    work_content: string
    equipment_input: string
    work_people: number
    request: string
    start_date: Date
    end_date: Date
    signfile_name: string
    upload_date: Date
    condition: string
    other_work: string
    checklist: object

    per_depart: string
    per_position: string
    per_name: string
    per_comment: string
}