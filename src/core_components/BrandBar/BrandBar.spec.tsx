import React from "react";

import { render, screen } from "@testing-library/react"
import BrandBar from "./BrandBar"


describe("top brand bar rendering", ()=>{
    it("test image", ()=>{
        render(<BrandBar/>)
        const image = screen.getByAltText('brand-0');
        expect(image).toBeInTheDocument()
        // const images = screen.getAllByRole('img');
        // expect(images.length).toBe(5)
    })

})