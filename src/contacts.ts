import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { Contact } from "./routes/contact";

export async function getContacts(query?: string | null) {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: Contact[] | null = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const contact: Contact = { id, createdAt: Date.now() };
  const contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);
  const contacts: Contact[] | null = await localforage.getItem("contacts");
  const contact = contacts?.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id: string, updates: Omit<Contact, "id">) {
  await fakeNetwork();
  const contacts: Contact[] | null = await localforage.getItem("contacts");
  if (!contacts) throw new Error("No contacts in store ");
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error("No contact found for " + id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: string) {
  const contacts: Contact[] | null = await localforage.getItem("contacts");
  const index = contacts?.findIndex((contact) => contact.id === id);
  if (index && index > -1 && contacts) {
    contacts?.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts: Contact[]) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: { [key: string]: boolean } = {};

async function fakeNetwork(key?: string) {
  if (!key) {
    fakeCache = {};
  } else {
    if (fakeCache[key]) {
      return;
    }

    fakeCache[key] = true;
  }
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
