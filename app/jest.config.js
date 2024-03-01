module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: "(test|spec|func-spec)\\.ts?$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testEnvironment: "node",
  roots: ["src", "test"],
  reporters: ["default", ["jest-junit", { outputDirectory: ".test-reports" }]],
  moduleDirectories: ["node_modules", "src", "test"],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/$1",
    "@test/(.*)$": "<rootDir>/test/$1",
  },
  coverageDirectory: ".test-reports",
  coverageReporters: ["text", "json", "json-summary"],
  coveragePathIgnorePatterns: ["<rootDir>/src/database/", "<rootDir>/src/shared/", "<rootDir>/node_modules/"],
};
