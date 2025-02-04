import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import isSatSun from "./checkWeekend.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import '../data/cart-class.js'

renderOrderSummary();
renderPaymentSummary();

  let today1 = dayjs();
  console.log(isSatSun(today1));
