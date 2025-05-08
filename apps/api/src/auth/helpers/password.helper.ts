import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  salt: string
): Promise<string> {
  return await bcrypt.hash(password, salt);
}

export async function comparePassword({
  password,
  hashPassword,
}: {
  password: string;
  hashPassword: string;
}): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
}

export async function generateHashPassword(
  password: string
): Promise<{ salt: string; hashedPassword: string }> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await hashPassword(password, salt);

  return {
    salt,
    hashedPassword,
  };
}
