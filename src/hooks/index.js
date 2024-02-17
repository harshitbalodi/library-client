import { useState } from "react";

export const useField = (type)=>{
    const [value, setValue] = useState(null);

    const onChange = (e)=>{
        setValue(e.target.value);
    }
    const resetValue = ()=>{
        setValue(null);
    }
    return {type, value, onChange, resetValue};
}