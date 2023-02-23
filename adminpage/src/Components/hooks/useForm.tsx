import React, { useEffect, useState } from "react"

const useForm = ({initialValues, onSubmit, validate}: any): any => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubmitting(true)
        e.preventDefault()
        await new Promise(r => setTimeout(r, 1000))
        setErrors(validate(values))
    }

    const reset = (val: object) => {
        // for(let key in val){
        //     // setValues(v => {
        //     //     {...v,
        //     //     key: val[key as keyof typeof val]}
        //     // })
        //     // console.log(key)
        //     setValues({...values, [key]:  val[key as keyof typeof val]})
        //     // setValues({...values, [key]: val[key as keyof typeof val]})
        // }
        setValues(val)
        console.log(values)
    }

    useEffect(() => {
        if(submitting){
            if(Object.keys(errors).length === 0){
                onSubmit(values)
            }
            setSubmitting(false)
        }
    }, [errors])

    return {
        values,
        errors,
        submitting,
        handleChange,
        handleSubmit,
        reset
    }


}

export default useForm