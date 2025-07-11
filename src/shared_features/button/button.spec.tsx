import ButtonComp from "./Button"
import React from 'react'
import { render, screen } from '@testing-library/react'

describe("button", ()=> {
    it("render button", ()=> {
        render(<ButtonComp classname='' style={{backgroundColor: 'red'}} value="hi" />)
        expect(screen.getByRole("button", {name: 'hi'}))
    })
})