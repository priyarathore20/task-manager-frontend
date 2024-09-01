export const isValidated = (
  title,
  description,
  status,
  dueDate,
  setErrors = () => {}
) => {
  let validation = true;
  if (title?.length === 0) {
    validation = false;
    setErrors((prev) => ({ ...prev, title: true }));
  }
  if (description?.length === 0) {
    validation = false;
    setErrors((prev) => ({ ...prev, description: true }));
  }
  if (status?.length === 0) {
    validation = false;
    setErrors((prev) => ({ ...prev, status: true }));
  }
  if (dueDate?.length === 0) {
    validation = false;
    setErrors((prev) => ({ ...prev, dueDate: true }));
  }
  return validation;
};
