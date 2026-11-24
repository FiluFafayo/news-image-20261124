# 24 November 2026 World News in One Image

[![news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/c/news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/FiluFafayo/news-image-20261124/rank.svg)](https://make.fun/c/news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/FiluFafayo/news-image-20261124/reward.svg)](https://make.fun/c/news-image-20261124)

Entry for the [news-image-20261124 bounty](https://make.fun/c/news-image-20261124) on make.fun: sum up Tuesday 24 November 2026 world news in a single image.

The image is a dense newspaper front page covering the whole day in one 1024×1024 frame: a masthead with the date, a UTC timeline of key events by hour and a "day in numbers" strip, three hero stories with original illustrations, ten medium stories, a world map with pins marking where each story happened, and a fifteen-item "also on" list — thirty-plus real stories from 24 November 2026, each carrying its source attribution and a CONFIRMED / OFFICIAL / REPORTED badge, with a date-check footer listing stories deliberately excluded because they are from a previous day or had not yet happened.

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This validates `entry.png` (at most 1 MiB, real JPEG or PNG by magic bytes), copies its exact bytes to `out/entry.png` with mode `0644`, and reads the output back to verify it is byte-for-byte identical. The program uses only the Node standard library and makes no network requests, so repeated runs produce identical output.
