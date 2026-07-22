import { writeFileSync } from "fs";
import { CALIFORNIA_DRIVER_EDUCATION } from "../data/california";
import { countCurriculumStats } from "../seed-curriculum";

const outputPath = new URL(
  "../data/california-handbook.json",
  import.meta.url
).pathname;

writeFileSync(
  outputPath,
  JSON.stringify(CALIFORNIA_DRIVER_EDUCATION, null, 2),
  "utf-8"
);

const stats = countCurriculumStats(CALIFORNIA_DRIVER_EDUCATION);
console.log(`Exported to ${outputPath}`);
console.log(stats);
