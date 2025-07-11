import { render, screen } from "@testing-library/react"
import NewsLetter from "./NewsLetter"
import React from "react"

describe("NewsLetter", () => {
    it("Footer newsletter component", () => {
        render(<NewsLetter />)

        expect(screen.getByText(/STAY UPTO DATE ABOUT OUR LATEST OFFERS/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Enter your email/i)).toBeInTheDocument()
        expect(screen.getByTestId('newsletter-button')).toBeInTheDocument()
    })
})