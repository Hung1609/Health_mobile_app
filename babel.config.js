module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "dotenv-import",
        {
          moduleName: "@env",
          path: ".env",
          safe: true, // Throws an error if a variable is missing
          allowUndefined: false, // Disallows undefined variables
        },
      ],
    ],
  };
};
