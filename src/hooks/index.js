import { useState } from "react";

export const useField = (type, fieldId)=>{
    const [value, setValue] = useState(null);
    const id=fieldId;
    const onChange = (e)=>{
        setValue(e.target.value);
    }
    const resetValue = ()=>{
        setValue(null);
    }
    return [{type, value, onChange,id}, resetValue];
}