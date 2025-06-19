import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Error: Please add SIGNING_SECRET");
  }

  //Create new svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  //get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error:Missing Svix Headers", {
      status: 400,
    });
  }

  //Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify WebHook: ", err);
    return new Response("Error: Verification Error", {
      status: 400,
    });
  }

  const eventType = evt.type;

  console.log(`Webhook Payload: `, body);
  if (eventType == "user.created") {
    const { data } = evt;
    console.log("Hello")
    console.log(data)
    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name === null ? "" : data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  if (eventType == "user.deleted") {
    const { data } = evt;

    if (!data.id) {
      return new Response("Missing User Id", { status: 400 });
    }

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  if (eventType == "user.updated") {
    const { data } = evt;
    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name === null ? "" : data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id));
  }

  return new Response("WebHook Received", { status: 200 });
}
