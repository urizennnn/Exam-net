export const isFormComplete = (formObject: any) => {
  return Object.values(formObject).some((v) => !v);
};

export function hasTrueValue(obj: any): boolean {
  return Object.values(obj).some((value) => value);
}
