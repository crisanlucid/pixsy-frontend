import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("Render Group", () => {
    //Arange
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <App />
      </MemoryRouter>
    );

    //ACT

    //Execute
    expect(screen.getByRole("group").childNodes).lengthOf(3);
  });
});
