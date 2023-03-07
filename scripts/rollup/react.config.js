import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from "./utils"
import generatePackageJson from "rollup-plugin-generate-package-json"

const { name, module } = getPackageJSON("react")
// react 包的路径
const pkgPath = resolvePkgPath(name)
// react 产物包的路径
const pkgDistPath = resolvePkgPath(name, true)

export default [
  // react
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: "index.js",
      // 模块类型：兼容 commonjs 和 esmodule
      format: "umd",
    },
    plugins: [
      ...getBaseRollupPlugins(),
      // 生成 package.json
      generatePackageJson({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        // 生成固定字段
        baseContents: ({ name, description, version }) => ({
          name,
          description,
          version,
          // 因为输出产物是 umd 类型，它是支持 commonjs 的，所以这里可以用 main 字段
          main: "index.js",
        }),
      }),
    ],
  },
  // jsx-runtime
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      // jsx-runtime
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: "jsx-runtime.js",
        format: "umd",
      },
      // jsx-dev-runtime
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: "jsx-dev-runtime.js",
        format: "umd",
      },
    ],
    plugins: getBaseRollupPlugins(),
  },
]
