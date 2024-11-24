---
title: web多环境配置
date: 2024-10-20 10:15:18
tags:
  - web
  - React
  - Vite
categories:
  - Skill
---

## web 端多环境配置

多环境无非就是请求的接口不一样
所以本文将介绍如何在 web 端配置不同的请求接口的环境

### 1. 准备工作

```cmd
npm init vite@latest
```

_完成之后长这样_
![img](/images/multiple-environments/1.png)

### 2.配置一些变量

#### 2.1 在根目录下新增 config 文件夹

```cmd
config
├── plugins.ts
├── constant.ts
```

##### constant 用于配置一些常量

```js
// 基本路径
export const VITE_BASE_PATH = "/";
// 应用名称
export const VITE_APP_TITLE = "xxx";
// 开启包依赖分析 可视化
export const VITE_APP_ANALYZE = false;
// 开启Gzip压缩
export const VITE_APP_COMPRESS_GZIP = false;
// 开启Gzip压缩，删除原文件
export const VITE_APP_COMPRESS_GZIP_DELETE_FILE = false;
// 去除 console
export const VITE_DROP_CONSOLE = true;
// 开启兼容
export const VITE_APP_LEGACY = true;
```

##### plugins 用于后续 vite 插件的配置

```cmd
npm install vite-plugin-compression vite-plugin-remove-console --save-dev
```

```js
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

import removeConsole from "vite-plugin-remove-console";
import {
  VITE_APP_COMPRESS_GZIP,
  VITE_APP_COMPRESS_GZIP_DELETE_FILE,
} from "./constant";

export const createVitePlugins = (isBuild: boolean) => {
  const vitePlugins = [react(), removeConsole()];

  if (isBuild) {
    if (VITE_APP_COMPRESS_GZIP) {
      vitePlugins.push(
        viteCompression({
          disable: true,
          deleteOriginFile: VITE_APP_COMPRESS_GZIP_DELETE_FILE,
        })
      );
    }
  }

  return vitePlugins;
};
```

### 3.查看 vite.config.ts 文件

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

#### 修改 vite.config.ts 文件

> 如果提示：找不到模块“path”或其相应的类型声明，智能导入一下导入类型就行，这样就报错了

```js
import { ConfigEnv, loadEnv, UserConfig } from "vite";
import { createVitePlugins } from "./config/plugins";
import { resolve } from "path";
import { VITE_DROP_CONSOLE } from "./config/constant";

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command.includes("build");
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_PORT } = env;

  return {
    root: process.cwd(),
    publicDir: "public",
    base: "./",
    plugins: createVitePlugins(isBuild),
    css: {
      modules: {
        generateScopedName: "[name]__[local]___[hash:base64:5]",
        hashPrefix: "prefix",
      },
      postcss: {
        plugins: [],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": `${resolve(__dirname, "src")}`,
      },
      mainFields: ["module", "jsnext:main", "jsnext"],
    },
    clearScreen: true,
    logLevel: "info",
    server: {
      open: true,
      host: "0.0.0.0",
      port: parseInt(VITE_PORT),
    },
    build: {
      target: "modules",
      outDir: "build",
      assetsDir: "assets",
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      sourcemap: !isBuild,
      chunkSizeWarningLimit: 500,
      emptyOutDir: true,
      manifest: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
    },
    define: {
      _GLOBAL_VARS_: JSON.stringify({
        ...env,
        MODE: mode,
        BUILD_TIME: new Date().toLocaleString(),
      }),
    },
  };
};
```

### 4.修改 package.json 文件

_原先的 scripts 部分_

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
```

_修改后的 scripts 部分_

```json
  "scripts": {
    "dev": "vite --mode dev",
    "prod": "vite --mode prod",
    "build:dev": "tsc -b && vite build --mode dev",
    "build:prod": "tsc -b && vite build --mode prod",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```

### 5.根目录下新增 .env 文件

```cmd
VITE_PORT = 7200
VITE_HOST = http://dev.example.com // 修改为你的域名,这里就是测试环境的接口前缀
```

### 6.根目录下新增 .env.prod 文件

```cmd
VITE_PORT = 7200
VITE_HOST = http://prod.example.com // 修改为你的域名,这里就是生产环境的接口前缀
```

### 7.新增 types 目录，里面新增 global.d.ts 文件

```ts
declare const _GLOBAL_VARS_: {
  VITE_HOST: string;
  MODE: string;
  // 如果还有其他变量，可以在这里继续声明
};
```

### 8.修改 tsconfig.node.json 文件

在 include 中加入

```json
  "compilerOptions": {
    "jsx": "react-jsx",
  },
  "include": ["src/**/*","config/*","vite.config.ts","./types/global.d.ts"],
```

完整的 tsconfig.node.json 文件如下：

```json
{
  "compilerOptions": {
    "jsx": "react-jsx", // 为了避免识别不出jsx和避免提示需要导入react的提示
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*", "config/*", "vite.config.ts", "./types/global.d.ts"]
}
```

### 9.在 src 目录下创建 constant.ts 文件

```ts
export const HOST = _GLOBAL_VARS_.VITE_HOST;
export const MODE = _GLOBAL_VARS_.MODE;
```

### 查看效果

```cmd
npm run dev
```

![img](/images/multiple-environments/2.png)

```cmd
npm run prod
```

![img](/images/multiple-environments/3.png)
