import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/save/:text", async (context) => {
      const kv = await Deno.openKv()
      await kv.set("text", String(context?.params?.id))
      console.log(await kv.get("text"))
      context.response.body = "Saved correctly " + String(context?.params?.id);
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });;
