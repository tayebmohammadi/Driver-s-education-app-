import type { CourseSeed } from "../types";
import { unit01, unit02, unit03 } from "./units-01-03";
import { unit04, unit05, unit06 } from "./units-04-07";
import { unit07 } from "./unit-07-laws";
import { unit08, unit09, unit10 } from "./units-08-10";
import { unit11, unit12, unit13 } from "./units-11-13";

export const CALIFORNIA_DRIVER_EDUCATION: CourseSeed = {
  slug: "california-driver-education",
  title: "California Driver Education",
  description:
    "Complete theory course based on the California Driver's Handbook (DL 600, Rev. 6/2025). Master licensing, road rules, safe driving, and DMV knowledge test topics.",
  regionCode: "CA",
  units: [
    unit01,
    unit02,
    unit03,
    unit04,
    unit05,
    unit06,
    unit07,
    unit08,
    unit09,
    unit10,
    unit11,
    unit12,
    unit13,
  ],
};

export {
  unit01,
  unit02,
  unit03,
  unit04,
  unit05,
  unit06,
  unit07,
  unit08,
  unit09,
  unit10,
  unit11,
  unit12,
  unit13,
};
