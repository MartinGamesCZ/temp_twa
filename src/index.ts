import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { BUILD_FOLDER, LINK_MAP, TEMPLATE } from "./config";
import path from "path";
import Handlebars from "handlebars";
import Elysia from "elysia";
import axios from "axios";
import { randomUUID } from "crypto";
// @ts-ignore
import webp from "webp-converter";

// --- Clean up build folder ---
if (existsSync(BUILD_FOLDER))
  rmSync(BUILD_FOLDER, {
    recursive: true,
    force: true,
  });

mkdirSync(BUILD_FOLDER);
mkdirSync(BUILD_FOLDER + "/img");

// --- Create files from template ---
// Get template from file
const template = readFileSync(TEMPLATE, "utf-8");

const lme = Object.entries(LINK_MAP);
const idmap = new Map<string, string>();

for (const [k, v] of lme) {
  const l = v;
  const id = transformLink(k);

  const { data } = await axios
    .get(l.image, {
      responseType: "arraybuffer",
    })
    .catch(() => ({ data: null }));

  writeFileSync(path.join(BUILD_FOLDER, `img/${id}.jpg`), data);

  //rmSync(path.join(BUILD_FOLDER, `${id}.jpg`));

  writeFileSync(
    path.join(BUILD_FOLDER, k != "$" ? `${id}.html` : "index.html"),
    Handlebars.compile(template)(
      "fr" in l
        ? {
            title: l.title,
            description: l.description + " " + l.fr,
            link1: "/",
            link1_text: "Začít znovu",
            image: `/img/${id}.jpg`,
          }
        : {
            title: l.title,
            image: `/img/${id}.jpg`,
            description: l.description,
            link1: `/${transformLink(l.choices?.[0]?.link)}`,
            link2: `/${transformLink(l.choices?.[1]?.link)}`,
            link3: `/${transformLink(l.choices?.[2]?.link)}`,
            link1_text: l.choices?.[0]?.text,
            link2_text: l.choices?.[1]?.text,
            link3_text: l.choices?.[2]?.text,
          }
    )
  );
}

function transformLink(l: string) {
  if (!l) return "";

  const tl = l.replaceAll("/", "");

  const id = idmap.get(tl);

  if (id) return id;

  const nid = randomUUID().replaceAll("-", "");

  idmap.set(tl, nid);

  return nid;
}

// --- Start webserver ---
const app = new Elysia();

app.all("*", ({ path: p }) => {
  if (p.startsWith("/img/")) {
    const file = p.replace("/img", "img");
    if (existsSync(path.join(BUILD_FOLDER, file))) {
      return new Response(readFileSync(path.join(BUILD_FOLDER, file)), {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
    }
  }

  const file = p === "/" ? "index.html" : `${p.replaceAll("/", "")}.html`;

  if (existsSync(path.join(BUILD_FOLDER, file))) {
    return new Response(readFileSync(path.join(BUILD_FOLDER, file), "utf-8"), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  return {
    status: 404,
    body: "Not Found",
  };
});

app.listen(8080, () => {
  console.log("Server started at http://localhost:8080");
});
