import fs from "fs";
import path from "path";
import crypto from "crypto";

const examplePath = path.resolve(process.cwd(), ".env.example");
const envPath = path.resolve(process.cwd(), ".env");

const defaultKeys = {
  JWT_SECRET: "replace-with-a-strong-secret",
  ADMIN_GENERATION_SECRET: "replace-with-admin-generation-secret"
};

function generateSecret(length = 48) {
  return crypto.randomBytes(length).toString("hex");
}

function parseLine(line: string) {
  const [key, ...rest] = line.split("=");
  if (!key || rest.length === 0) {
    return { key: null, value: line };
  }

  const value = rest.join("=");
  return { key: key.trim(), value };
}

function buildLine(key: string, value: string) {
  return `${key}=${value}`;
}

function initializeEnv() {
  if (!fs.existsSync(examplePath)) {
    throw new Error(".env.example not found in project root.");
  }

  const exampleContent = fs.readFileSync(examplePath, "utf8");
  const lines = exampleContent.split(/\r?\n/);
  const generatedValues: Record<string, string> = {};

  const output = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return line;
    }

    const { key, value } = parseLine(line);
    if (!key) {
      return line;
    }

    if (key in defaultKeys) {
      const currentValue = value.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, "");
      if (currentValue === defaultKeys[key as keyof typeof defaultKeys]) {
        const secret = generateSecret();
        generatedValues[key] = secret;
        return buildLine(key, `"${secret}"`);
      }
    }

    return line;
  });

  if (fs.existsSync(envPath)) {
    console.log("Existing .env file detected. It will be overwritten with generated secrets.");
  }

  fs.writeFileSync(envPath, output.join("\n"), "utf8");
  console.log("Created .env with generated JWT_SECRET and ADMIN_GENERATION_SECRET.");
  Object.entries(generatedValues).forEach(([key, value]) => {
    console.log(`${key}=***generated***`);
  });
}

try {
  initializeEnv();
} catch (error) {
  console.error("Failed to initialize environment:", error instanceof Error ? error.message : error);
  process.exit(1);
}
