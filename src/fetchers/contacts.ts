import { Params, redirect } from "react-router-dom";

export async function createContact() {
  const res = await fetch("/createcontact", {
    method: "GET",
  });
  const contact = await res.json();

  return redirect(`/contacts/${contact.id}/edit`);
}

export async function deleteContactById({
  params,
}: {
  params: Params<"contactId">;
}) {
  await fetch("/deletecontactbyid", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: params.contactId }),
  });

  return redirect(`/`);
}

export async function getContacts({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const res = await fetch("/getcontacts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ q }),
  });
  const contacts = await res.json();

  return { contacts, q };
}
export async function getContactById({
  params,
}: {
  params: Params<"contactId">;
}) {
  const res = await fetch("/getcontactbyid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: params.contactId }),
  });
  const contact = await res.json();

  return { contact };
}

export async function updContact({
  request,
  params,
}: {
  request: Request;
  params: Params<"contactId">;
}) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  if (!params.contactId) throw new Error("no contactId");
  await fetch("/updatecontact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: params.contactId, updates }),
  });
  return redirect(`/contacts/${params.contactId}`);
}

export async function updContactFavorite({
  request,
  params,
}: {
  request: Request;
  params: Params<"contactId">;
}) {
  const formData = await request.formData();
  const updates = {
    favorite: formData.get("favorite") === "true",
  };
  if (!params.contactId) throw new Error("no contactId");
  await fetch("/updatecontact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: params.contactId, updates }),
  });
  return redirect(`/contacts/${params.contactId}`);
}
