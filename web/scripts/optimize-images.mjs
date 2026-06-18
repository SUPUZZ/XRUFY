import { readdirSync, statSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");
const SRC_DIR = path.resolve("src");
const CONTENT_DIR = path.resolve("content");
const WEBP_QUALITY = 85;

const SUPPORTED = new Set([".png", ".jpg", ".jpeg", ".tiff"]);
const SOURCE_EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".md", ".mdx"]);

/* ─── helpers ─────────────────────────────────────────────── */

function collect(dir, exts) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...collect(full, exts));
    } else if (e.isFile() && exts.has(path.extname(e.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

/** Replace old-ext references with .webp only for paths under public/images/ */
function replaceImageRefs(content, relativePath) {
  const oldExt = path.extname(relativePath);
  const webpPath = relativePath.replace(oldExt, ".webp");

  // Match the image path in various quoting contexts: "…", '…', `…`, or markdown (…)
  // This regex replaces only this specific image path's extension
  const escaped = relativePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(escaped, "g");
  return content.replace(pattern, webpPath);
}

/* ─── main ────────────────────────────────────────────────── */

async function main() {
  const imageFiles = collect(IMAGES_DIR, SUPPORTED);

  if (imageFiles.length === 0) {
    console.log("✅ No non-WebP images found.");
    return;
  }

  console.log(`🔍 Found ${imageFiles.length} image(s) to convert:\n`);

  /* 1. Convert images */
  const converted = [];
  for (const file of imageFiles) {
    const parsed = path.parse(file);
    const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

    try {
      const srcStat = statSync(file);
      try {
        const webpStat = statSync(webpPath);
        if (webpStat.mtimeMs >= srcStat.mtimeMs) {
          console.log(`  ⏭️  SKIP  ${path.relative(IMAGES_DIR, webpPath)} (up-to-date)`);
          continue;
        }
      } catch {
        /* webp doesn't exist → convert */
      }
    } catch {
      continue;
    }

    const buf = await readFile(file);
    const webpBuf = await sharp(buf).webp({ quality: WEBP_QUALITY }).toBuffer();
    await writeFile(webpPath, webpBuf);

    const saved = ((1 - webpBuf.length / buf.length) * 100).toFixed(1);
    console.log(`  ✅  ${path.relative(IMAGES_DIR, file)} → .webp (${saved}% smaller)`);
    converted.push(file);
  }

  if (converted.length === 0) {
    console.log("\n🎉 All images already up-to-date. No conversion needed.");
  } else {
    console.log(`\n🎉 ${converted.length} image(s) converted.`);
  }

  /* 2. Replace paths in source files */
  const allConverted = converted.length > 0 ? converted : imageFiles;
  const relativePaths = allConverted.map((f) => path.relative(IMAGES_DIR, f));

  const sourceDirs = [SRC_DIR, CONTENT_DIR].filter((d) => {
    try {
      return statSync(d).isDirectory();
    } catch {
      return false;
    }
  });

  if (sourceDirs.length === 0) {
    console.log("⚠️  No source directories found (src/ or content/). Skipping path replacement.");
    return;
  }

  const sourceFiles = sourceDirs.flatMap((d) => collect(d, SOURCE_EXTS));

  if (sourceFiles.length === 0) {
    console.log("⚠️  No source files found to update.");
    return;
  }

  let replacedCount = 0;
  let fileReplacements = 0;

  for (const sf of sourceFiles) {
    let content = await readFile(sf, "utf-8");
    const original = content;
    for (const rel of relativePaths) {
      content = replaceImageRefs(content, rel);
    }
    if (content !== original) {
      await writeFile(sf, content);
      const relFile = path.relative(process.cwd(), sf);
      console.log(`  📝  ${relFile}`);
      fileReplacements++;
      replacedCount++;
    }
  }

  if (fileReplacements === 0) {
    console.log("\n✅ No source files needed updating.");
  } else {
    console.log(`\n✅ Updated ${fileReplacements} source file(s) with .webp paths.`);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});