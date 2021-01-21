import React from 'react'
import { render } from "@testing-library/react"
import Card from './Card'

test('Should render Card component', ()=>{
    render(<Card/>)
})

test('Snapshot of Card', ()=>{
    const {asFragment} = render(<Card/>)
    expect(asFragment()).toMatchSnapshot()
})