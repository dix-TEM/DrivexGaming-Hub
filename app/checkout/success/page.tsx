import { redirect } from "next/navigation";

export default function CheckoutSuccessIndexPage() {
  redirect("/track-order");
}
