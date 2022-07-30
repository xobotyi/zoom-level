module.exports = {
  root: true,

  ignorePatterns: [
    "node_modules",
    "coverage",
    "dist",
    ".github/workflows",
    ".husky",
    "CHANGELOG.md",
  ],

  parserOptions: {
    project: "./tsconfig.eslint.json",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".mdx", ".md"],
  },

  overrides: [
    {
      files: ["*.js", "*.ts", "*.jsx", "*.tsx"],
      extends: ["@react-hookz/eslint-config/typescript"],
    },
    {
      files: ["*.md", "*.mdx"],
      extends: ["@react-hookz/eslint-config/mdx"],
    },
  ],
};
