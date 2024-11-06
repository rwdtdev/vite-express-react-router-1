import { Params, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }: { params: Params<"contactId"> }) {
  if (!params.contactId) throw new Error("no contact id");
  await deleteContact(params.contactId);
  return redirect("/");
}
