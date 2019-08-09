import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import FormikForm from "./TheForm";
import { add } from "./TheForm";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";

it("FormikForm renders", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormikForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("submit fires", () => {
  // Tests if FormikForm renders
  const { getByText } = render(<FormikForm />);

  // Grabs element with the exact text of strike which is why we use the ^$ syntax
  const submitButton = getByText(/^submit$/i);

  //Manually click button
  fireEvent.click(submitButton);

  // Test if on click of submit button nothing is displayed because username and password inputs are not filed
  getByText(/Recipes/);
});

test("add function", () => {
  expect(add(1, 2)).toBe(3);
  expect(add(1, 7)).toEqual(8);
  expect(add(5, 2)).toBe(7);
});
