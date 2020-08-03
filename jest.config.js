const { defaults } = require("jest-config");

module.exports = {
  roots: ["<rootDir>/src/"],
  transform: {
    ".(js|jsx|ts|tsx)": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/mocks/fileMock.js",
    "\\.(css|scss|less)$": "<rootDir>/src/mocks/styleMock.js",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/__test-utils__/jest.setup.js"],
};
