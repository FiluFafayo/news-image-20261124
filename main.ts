// main.ts — news-image-20261124
//
// Entry for the make.fun competition "news-image-20261124":
// "Sum up Tuesday 24 November 2026 world news in one image".
//
// The entry image (entry.png, a dense newspaper front page) was produced
// for this competition and sits next to this file. This program's only job
// is to validate that image and copy its exact bytes to the output
// directory the competition harness expects. It does no network access,
// no image processing and no randomness, so repeated runs are byte
// identical by construction.

import { readFileSync, writeFileSync, mkdirSync, chmodSync } from "node:fs";
import { join, resolve } from "node:path";

const MAX_BYTES = 1_048_576; // 1 MiB — the competition's size cap.
const SOURCE_NAME = "entry.png";

// JPEG magic: FF D8 FF. PNG magic: 89 50 4E 47 0D 0A 1A 0A.
const JPEG_MAGIC = [0xff, 0xd8, 0xff];
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function startsWith(bytes: Buffer, magic: number[]): boolean {
  return magic.every((byte, i) => bytes[i] === byte);
}

function fail(message: string): never {
  throw new Error(`news-image-20261124: ${message}`);
}

// Resolve the output directory: the harness sets MAKEFUN_OUTPUT_DIR,
// otherwise fall back to /output as the competition expects.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const sourcePath = resolve(SOURCE_NAME);
const outputPath = join(outputDir, SOURCE_NAME);

// Read the source image.
let image: Buffer;
try {
  image = readFileSync(sourcePath);
} catch (error) {
  fail(`cannot read ${sourcePath}: ${(error as Error).message}`);
}

// Validate: size cap.
if (image.length > MAX_BYTES) {
  fail(
    `entry.png is ${image.length} bytes, over the ${MAX_BYTES} byte (1 MiB) limit — shrink the image and try again`,
  );
}
if (image.length === 0) {
  fail("entry.png is empty");
}

// Validate: the file must really be a JPEG or PNG, checked by magic bytes.
// A JPEG must also end with the End Of Image marker (FF D9); a truncated
// JPEG that happens to start with the right bytes is still rejected.
const isJpeg = startsWith(image, JPEG_MAGIC);
const isPng = startsWith(image, PNG_MAGIC);
if (!isJpeg && !isPng) {
  fail(
    "entry.png is neither a JPEG (FF D8 FF) nor a PNG (89 50 4E 47 0D 0A 1A 0A) by magic bytes",
  );
}
if (
  isJpeg &&
  !(image[image.length - 2] === 0xff && image[image.length - 1] === 0xd9)
) {
  fail("entry.png starts like a JPEG but has no FF D9 End Of Image marker — the file looks truncated");
}

const format = isJpeg ? "JPEG" : "PNG";

// Write the exact bytes to the output directory, creating it if needed.
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, image);
chmodSync(outputPath, 0o644);

// Read the output back and verify it is byte-for-byte identical.
const written = readFileSync(outputPath);
if (!written.equals(image)) {
  fail(`read-back check failed: ${outputPath} differs from ${sourcePath}`);
}

console.log(
  `Wrote ${outputPath} (${image.length} bytes, ${format}); read-back verified.`,
);
