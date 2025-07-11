import React from 'react'
import {render, screen} from '@testing-library/react'
import OrderCard from './OrderCard'

describe("order card", () => {
    it("rendering order card", () => {
        render(<OrderCard />)
        expect(screen.getByText('Order Id#')).toBeInTheDocument()
        expect(screen.getByText('123456')).toBeInTheDocument()
        expect(screen.getAllByText('Nike AirMax Systm')).toHaveLength(2)
        expect(screen.getAllByText('Rs 15800/-')).toHaveLength(2)
        expect(screen.getAllByText('Size: 24')).toHaveLength(2)
        expect(screen.getByText('Estimated Arrival: 28 may 2025')).toBeInTheDocument();
        expect(screen.getByText('On Deliver')).toBeInTheDocument();
    })
})