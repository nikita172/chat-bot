import { products } from "./products";

export const getData = (text) => {

  if (text == "Browse products") {
    return {
      type: "text",
      text: "What are you looking for?",
      buttons: ["Shoes", "Shirts", "Jeans", "Jackets", "Sweaters", "Ask the agent"],
      showTemplate: false,
      showPayment: false,
    };
  }
  if (text == "About Us") {
    return {
      type: "text",
      text: "Our company is the no.1 largest company in the world. please explore our collection",
      buttons: ["Browse products", "What's on sale", "About Us", "Ask the agent"],
      showTemplate: false,
      showPayment: false,
    };


  }
  if (text == "Yes") {
    return {
      type: "text",
      text: "Proceeding to payment",
      buttons: [],
      showTemplate: false,
      showPayment: true,
    };
  }

  if (text == "No") {
    return {
      type: "text",
      isBot: true,
      text: "Order cancelled",
      buttons: [],
      showTemplate: true,
      showPayment: false,
    };
  }
  return {
    type: "text",
    isBot: true,
    text: "No results found",
    buttons: [],
    showTemplate: true,
    showPayment: false,
  }
};