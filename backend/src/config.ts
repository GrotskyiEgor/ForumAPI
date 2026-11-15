const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

if (!accessSecret || !refreshSecret) {
  throw new Error("JWT_ACCESS_SECRET и JWT_REFRESH_SECRET должны быть заданы в .env");
}

export const config = {
  accessSecret,
  refreshSecret,
};