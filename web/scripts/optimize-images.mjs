import { readdirSync, statSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

// 扫描整个 public 目录（含根目录与 images/），避免遗漏 hero 等根级图片
const PUBLIC_DIR = path.resolve("public");
const SRC_DIR = path.resolve("src");
const CONTENT_DIR = path.resolve("content");
const WEBP_QUALITY = Number(process.env.WEBP_QUALITY ?? 85);
// 超过此宽度的图片等比缩小（只压缩真正过大的图，hero 主图等常规尺寸不受影响）
const MAX_WIDTH = Number(process.env.MAX_WIDTH ?? 1600);

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

/** 将旧扩展名引用替换为 .webp（相对 public 目录的路径） */
function replaceImageRefs(content, relativePath) {
  const oldExt = path.extname(relativePath);
  const webpPath = relativePath.replace(oldExt, ".webp");
  const escaped = relativePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(escaped, "g");
  return content.replace(pattern, webpPath);
}

/* ─── main ────────────────────────────────────────────────── */

async function main() {
  const imageFiles = collect(PUBLIC_DIR, SUPPORTED);

  if (imageFiles.length === 0) {
    console.log("✅ No non-WebP images found.");
    return;
  }

  console.log(`🔍 Found ${imageFiles.length} image(s) to process:\n`);

  /* 1. 转换并压缩图片 */
  const converted = [];
  for (const file of imageFiles) {
    const parsed = path.parse(file);
    const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

    // 已有更新版本的 webp 则跳过
    try {
      const srcStat = statSync(file);
      try {
        const webpStat = statSync(webpPath);
        if (webpStat.mtimeMs >= srcStat.mtimeMs) {
          console.log(`  ⏭️  SKIP  ${path.relative(PUBLIC_DIR, webpPath)} (up-to-date)`);
          continue;
        }
      } catch {
        /* webp 不存在 → 转换 */
      }
    } catch {
      continue;
    }

    const buf = await readFile(file);
    const metadata = await sharp(buf).metadata();

    let pipeline = sharp(buf);
    let resized = false;
    if ((metadata.width ?? 0) > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      resized = true;
    }

    const webpBuf = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    await writeFile(webpPath, webpBuf);

    const saved = ((1 - webpBuf.length / buf.length) * 100).toFixed(1);
    const sizeNote = resized ? ` (${metadata.width}px → ${MAX_WIDTH}px)` : "";
    console.log(
      `  ✅  ${path.relative(PUBLIC_DIR, file)} → .webp${sizeNote} (${saved}% smaller)`,
    );
    converted.push(file);
  }

  if (converted.length === 0) {
    console.log("\n🎉 All images already up-to-date. No conversion needed.");
  } else {
    console.log(`\n🎉 ${converted.length} image(s) converted.`);
  }

  /* 2. 替换源码/内容中的引用路径 */
  const allConverted = converted.length > 0 ? converted : imageFiles;
  const relativePaths = allConverted.map((f) => path.relative(PUBLIC_DIR, f));

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

  let fileReplacements = 0;

  for (const sf of sourceFiles) {
    const original = await readFile(sf, "utf-8");
    let content = original;
    for (const rel of relativePaths) {
      content = replaceImageRefs(content, rel);
    }
    if (content !== original) {
      await writeFile(sf, content);
      console.log(`  📝  ${path.relative(process.cwd(), sf)}`);
      fileReplacements++;
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
