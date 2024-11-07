import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config";
import { prisma } from "../prismaClientCopy.js";

const app = express();
app.use(express.json());

ViteExpress.config({ mode: process.env.NODE_ENV });

app.get("/message", (_, res) => {
  res.send("Hello from express!");
});

app.get("/createcontact", async (_, res) => {
  const contact = await prisma.contact.create({
    data: {
      createdAt: new Date(),
    },
  });
  res.json(contact);
});

app.delete("/deletecontactbyid", async (req, res) => {
  const { id } = req.body;
  const contact = await prisma.contact.delete({
    where: { id },
  });
  res.json(contact);
});

app.post("/getcontacts", async (req, res) => {
  const { q } = req.body;
  let where = {};
  if (q) {
    where = {
      OR: [{ first: { contains: q } }, { last: { contains: q } }],
    };
  }
  const contacts = await prisma.contact.findMany({
    where,
    orderBy: [{ first: "asc" }, { last: "asc" }],
  });
  res.json(contacts);
});

app.post("/getcontactbyid", async (req, res) => {
  const { id } = req.body;
  const contacts = await prisma.contact.findUnique({ where: { id } });
  res.json(contacts);
});

app.post("/updatecontact", async (req, res) => {
  const { id, updates } = req.body;
  const contact = await prisma.contact.update({
    where: { id },
    data: updates,
  });
  res.json(contact);
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
