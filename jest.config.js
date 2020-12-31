module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // setupFiles: ["<rootDir>/tests/setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.spec.json",
    },
  },
};
