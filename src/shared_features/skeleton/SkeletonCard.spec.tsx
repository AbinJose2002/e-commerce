import { render } from "@testing-library/react"
import SkeletonCard from "./SkeletonCard"
import React from 'react'

describe("skeleton card", () => {
    it("render skeleton", () => {
        render(<SkeletonCard />)
    })
})