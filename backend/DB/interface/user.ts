export default interface user {
    id: string
    usernum:number
    pw: string
    name: string
    email: string
    birth: Date
    phone:string
    position: string
    recent_login_ip: string
    recent_login_date: Date
    created_at: Date
    fcm_token: Array<string>
}