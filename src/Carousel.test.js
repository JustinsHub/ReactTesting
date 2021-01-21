import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test('Should render Carousel', ()=>{
  render(<Carousel/>)
})

test('Snapshot of Carousel', ()=>{
  const {asFragment} = render(<Carousel/>)
  expect(asFragment()).toMatchSnapshot()
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

});

test('Left arrow is missing', ()=>{
  const {queryByTestId, queryByAltText} = render(<Carousel/>)

  //Left arrow is not shown on first image
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument()
  expect(queryByTestId('left-arrow')).not.toHaveClass("fas fa-chevron-circle-left fa-2x")

  //Press the right arrow twice
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  //Right arrow is not shown on last image
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument()
  expect(queryByTestId('right-arrow')).not.toHaveClass("fas fa-chevron-circle-right fa-2x")
})