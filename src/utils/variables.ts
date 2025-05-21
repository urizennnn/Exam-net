import type {
  FormStepTwo,
} from "./types";

export enum fileSize {
  min_size = 30,
  max_size = 50,
}

export const formStepTwoDefaults: FormStepTwo = {
  informationBlock: false,
  multipleChoice: true,
  simpleAnswer: true,
  fillTheGaps: true,
  matchAnswer: true,
  grid: true,
  freeText: false,
  attachment: false,
};
