import { render, screen } from "@testing-library/react"
import TextInput from "./TextInput"
import MailIcon from '@mui/icons-material/Mail';
import React from 'react'

test("text input render", ()=>{
    render(<TextInput label="Enter your email" icon={<MailIcon />} />)
    const textField = screen.getByLabelText('Enter your email')
    expect(textField).toBeInTheDocument()
})