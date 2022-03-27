import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect } from 'react'

const Dropdown = ({ className, label, value, onChange, data, mapping, error, helperText, name }) => {
    useEffect(() => {
        if (data && data.length > 0) {
            const exist = data.find(x => x[mapping.value] == value);
            if (!exist && value != '') {
                onChange({ target: { name, value: '' } })
            }
        }
    }, [data])

    return (
        <>
            <FormControl variant="outlined" className={className} error={error}>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    label={label}
                    name={name}
                >
                    {data.map((x, key) => {
                        return <MenuItem key={key} value={x[mapping.value]}>{x[mapping.text]}</MenuItem>
                    })}
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </>
    )
}

export default Dropdown