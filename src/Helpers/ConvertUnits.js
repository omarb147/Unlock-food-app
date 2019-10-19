import * as TYPES from "../Constants/types";
export const convertDistanceToUnits = (value, units) => {
  switch (units) {
    case TYPES.METERS:
      return value * 1600.344;
    case TYPES.MILES:
      return value / 1600.344;
  }
};
