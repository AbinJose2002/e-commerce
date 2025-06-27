'use client'

import { type CSSProperties } from 'react'
import {Button} from '@mui/material'

type Props = {
    classname?:string;
    value?:string;
    style?:CSSProperties;
    variant?: string;
    sx?: CSSProperties;
    endIcon?: string
}

const ButtonComp = (props: Props) => {


  return (
    <div>
        <button className={props.classname} style={props.style} >{props.value}</button>
        <Button ></Button>
    </div>
  )
}

export default ButtonComp