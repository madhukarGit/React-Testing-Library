import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "./SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial conditions ", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

// test("Checkbox enables button on first click and disables on second click", () => {
//   render(<SummaryForm />);
//   const checkbox = screen.getByRole("checkbox", {
//     name: /terms and conditions/i,
//   });
//   const confirmButton = screen.getByRole("button", { name: /confirm order/i });

//   fireEvent.click(checkbox);
//   expect(confirmButton).toBeEnabled();

//   fireEvent.click(checkbox);
//   expect(confirmButton).toBeDisabled();
// });

test("Checkbox enables button on first click and disables on second click with user events", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover repsonds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover starts over hidden
  const nullPopOver = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopOver).not.toBeInTheDocument();
  //popover appears on mouseove of checkbox model
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
