exports.getCurrentSemester = () => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  if (month >= 9 && month <= 12) return `SEM_1_${year}`;
  if (month >= 1 && month <= 4) return `SEM_2_${year}`;
  return `SEM_3_${year}`;
};

exports.getLastSemester = (current) => {
  const [_, sem, year] = current.split("_");
  if (sem === "1") return `SEM_3_${year - 1}`;
  return `SEM_${Number(sem) - 1}_${year}`;
};
