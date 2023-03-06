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
        setValues(val)
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