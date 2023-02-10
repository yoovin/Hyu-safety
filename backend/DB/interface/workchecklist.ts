export default interface suggestiondesc {
    index: number
    fire_checked: Array<boolean>
    fire_reason: Array<string>
    
    weight_checked: Array<boolean>
    weight_reason: Array<string>

    closed_checked: Array<boolean>
    closed_reason: Array<string>

    height_checked: Array<boolean>
    height_reason: Array<string>

    excavation_checked: Array<boolean>
    excavation_reason: Array<string>

    electricity_checked: Array<boolean>
    electricity_reason: Array<string>

}