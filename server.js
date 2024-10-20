// server.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const handler = async (req) => {
    const url = new URL(req.url);
  
    let filePath = url.pathname === "/" ? "/index.html" : url.pathname;
  
    try {
      const file = await Deno.readFile(`.${filePath}`);
      const contentType = filePath.endsWith(".html") ? "text/html" :
                          filePath.endsWith(".js") ? "application/javascript" : "text/plain";
  
      return new Response(file, {
        status: 200,
        headers: new Headers({
          "content-type": contentType,
        }),
      });
    } catch (error) {
      return new Response("Not Found", { status: 404 });
    }
  };
  
  console.log("Listening on http://localhost:8000");
  await serve(handler, { port: 8000 });