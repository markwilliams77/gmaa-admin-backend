import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/client";
import { config } from "../config";
import {
  generateRandomPassword,
  generateRandomUsername,
} from "../utils/random.util";

const SALT_ROUNDS = 12;

export async function loginUser(identifier: string, password: string) {
  const admin = await prisma.admin.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: identifier },
      ],
    },
  });

  if (!admin) {
    throw new Error("Invalid username/email or password");
  }

  let validPassword = false;

  // Detect bcrypt hashed password
  const isHashed =
    admin.password.startsWith("$2a$") ||
    admin.password.startsWith("$2b$") ||
    admin.password.startsWith("$2y$");

  if (isHashed) {
    validPassword = await bcrypt.compare(password, admin.password);
  } else {
    // Support old plain-text passwords temporarily
    validPassword = password === admin.password;

    // Auto-upgrade old password to hashed version
    if (validPassword) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      await prisma.admin.update({
        where: {
          id: admin.id,
        },
        data: {
          password: hashedPassword,
        },
      });
    }
  }

  if (!validPassword) {
    throw new Error("Invalid username/email or password");
  }

  const token = jwt.sign(
    {
      userId: admin.id,
      email: admin.email,
      username: admin.username,
    },
    config.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  return {
    token,
    user: {
      id: admin.id,
      email: admin.email,
      username: admin.username,
    },
  };
}

export async function generateAdminCredentials(secret: string) {
  if (secret !== config.ADMIN_GENERATION_SECRET) {
    throw new Error("Invalid generation secret");
  }

  const username = await createUniqueAdminUsername();

  const password = generateRandomPassword();

  const email = `admin-${Date.now()}@gmaa.local`;

  const hashedPassword = await bcrypt.hash(
    password,
    SALT_ROUNDS
  );

  await prisma.admin.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return {
    username,
    password,
    email,
  };
}

async function createUniqueAdminUsername(): Promise<string> {
  for (let attempts = 0; attempts < 5; attempts += 1) {
    const candidate = generateRandomUsername();

    const existing = await prisma.admin.findUnique({
      where: {
        username: candidate,
      },
    });

    if (!existing) {
      return candidate;
    }
  }

  return `${generateRandomUsername()}-${Date.now()}`;
}