import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import React from "react";

describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders store name and description", () => {
    screen.debug(); // ✅ call here if you want to see the DOM
    expect(screen.getAllByText(/Kidilam store/i)).toHaveLength(2);
    expect(
      screen.getByText(
        /We have clothes that suit your style and which you are proud to wear/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Kidilam store © 2000–2023, All Rights Reserved/i)
    ).toBeInTheDocument();
  });

  it("renders section titles", () => {
    const sections = ["COMPANY", "HELP", "FAQ", "RESOURCES"];
    sections.forEach((title) => {
      expect(screen.getByText((content) => content.trim() === title)).toBeInTheDocument();
    });
  });

  it("renders links under each section", () => {
    const links = [
      "About",
      "Features",
      "Works",
      "Career",
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
      "Account",
      "Manage Deliveries",
      "Orders",
      "Payments",
      "Free eBooks",
      "Development Tutorial",
      "How to - Blog",
      "Youtube Playlist",
    ];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("renders payment method icons", () => {
    const paymentAlts = ["visa", "mastercard", "paypal", "applepay", "gpay"];
    paymentAlts.forEach((alt) => {
      expect(screen.getByAltText(alt)).toBeInTheDocument();
    });
  });

  it("renders social media icons", () => {
    const iconButtons = screen.getAllByRole("button");
    expect(iconButtons.length).toBeGreaterThanOrEqual(3);
  });
});
