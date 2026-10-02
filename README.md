<div align="center"><a name="readme-top"></a>

<img src="public/brand/junying-logo.png" alt="Junying AI" width="160" />

# Junying AI

你的专属 AI 助手・Your personal AI assistant

[简体中文](#简体中文) · [English](#english)

</div>

---

## 简体中文

### 项目介绍

Junying AI 是一个可以在本地自行部署的 AI 助手平台，基于开源项目 [LobeHub](https://github.com/lobehub/lobehub) 二次开发。它把对话、助理、任务和知识库放在同一个工作台里：你可以接入自己的模型服务商，用自己的 API Key 和数据，搭一套只属于自己的 AI 助手。

相对上游 LobeHub，本仓库做了这些定制：

- **品牌**：应用名称改为 Junying AI，并使用自己的 Logo（浏览器标签图标、登录页、关于页、PWA 图标）。
- **主题**：整体界面改为深紫色背景。
- **欢迎语**：默认助理的欢迎语改为「你的专属 AI 助手」。
- **快速上手卡片**：首页输入框上方新增引导卡片，用三步说明怎么开始对话，可关闭。

### 功能列表

- **多模型对话**：内置 80+ 家模型服务商（OpenAI、Anthropic、Google、DeepSeek、通义千问、Moonshot、智谱、OpenRouter、Ollama 等），对话时可在输入框里随时切换模型。
- **助理**：创建多个助理，分别设定提示词、模型和能力，从侧边栏快速切换。
- **任务**：把需求作为任务交给助理执行，在首页跟踪进度，也支持定时运行的任务。
- **资源与知识库**：上传文件、管理资源，让助理基于你的资料回答问题。
- **文稿**：在应用内编写和整理文档，并让助理协助编辑。
- **生成**：AI 图片和视频生成。
- **记忆**：助理可以记住你的偏好和上下文，在设置里随时查看和管理。
- **技能、工具与连接器**：为助理扩展能力，接入外部工具和服务。
- **社区**：浏览和添加社区里的助理、模型与 MCP。
- **多语言与主题**：界面支持多种语言；本仓库默认使用深紫色主题。

### 安装步骤

以下步骤用于在本机运行完整的开发环境（前端 + 后端 + 数据库）。

#### 1. 准备环境

请先安装：

- [Node.js](https://nodejs.org/)（建议使用最新的 LTS 或稳定版，本项目在 Node.js 24 上验证过）
- [pnpm](https://pnpm.io/installation)（依赖管理；建议执行 `corepack enable`，自动使用项目指定的版本）
- [Bun](https://bun.com/docs/installation)（用于运行项目脚本）
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/get-started)（用于运行 PostgreSQL、Redis、RustFS、SearXNG）

#### 2. 获取代码

```bash
git clone https://github.com/g-sunshine/lobehub.git
cd lobehub
```

#### 3. 安装依赖

```bash
pnpm install
```

#### 4. 配置环境变量

```bash
# Docker 服务配置
cp docker-compose/dev/.env.example docker-compose/dev/.env

# 应用配置
cp .env.example.development .env
```

两个文件已经带有可直接用于本地开发的默认值，通常不需要修改。

#### 5. 启动依赖服务

先确认 Docker Desktop 已经在运行，然后执行：

```bash
bun run dev:docker
```

首次运行时，还需要执行一次文件存储桶的初始化：

```bash
docker compose -f docker-compose/dev/docker-compose.yml up rustfs-init
```

#### 6. 初始化数据库

```bash
bun run db:migrate
```

看到 `✅ database migration pass.` 就表示成功了。

#### 7. 启动应用

```bash
bun run dev
```

启动后在浏览器打开 <http://localhost:3010>。第一次编译大约需要一分钟。

### 使用说明

1. **注册账号**：打开 <http://localhost:3010>，用邮箱注册（本地默认不需要邮件验证），按引导完成初始设置。

2. **配置模型服务商**：进入「设置 → AI 服务商」，选择服务商（例如 DeepSeek），填写你的 API Key 并启用。没有配置 API Key 时，发送消息会报错。

3. **开始对话**：回到首页，按「快速上手」卡片的三步操作：

   - 点击输入框中的模型按钮，选择要使用的模型；
   - 在输入框中写下你的问题；
   - 按 Enter 或点击发送按钮，获取回答。

   熟悉之后，可以点卡片右上角的 × 关闭它，之后不会再显示。

4. **切换模式**：输入框左下角可以在「Agent」（对话）和「任务」之间切换。任务模式会创建一个任务，在后台执行并跟踪进度。

5. **管理助理和资料**：在侧边栏创建助理；在「资源」中上传文件；在「记忆」中查看助理记住的内容。

#### 常用命令

| 命令                       | 说明                                        |
| -------------------------- | ------------------------------------------- |
| `bun run dev`              | 启动完整开发环境（<http://localhost:3010>） |
| `bun run dev:docker`       | 启动 PostgreSQL、Redis、RustFS、SearXNG     |
| `bun run dev:docker:down`  | 停止依赖服务                                |
| `bun run db:migrate`       | 执行数据库迁移                              |
| `bun run dev:docker:reset` | 重置依赖服务（**会清空本地数据**）          |

#### 自定义品牌

应用名称和 Logo 在 [`packages/business/const/src/branding.ts`](packages/business/const/src/branding.ts) 中配置：修改 `BRANDING_NAME` 和 `BRANDING_LOGO_URL`（Logo 文件放在 `public/` 下）后重启开发服务即可。

#### 常见问题

- **页面打不开，或命令行访问 localhost 返回 502**：如果系统设置了 `HTTP_PROXY` / `HTTPS_PROXY` 代理，请把 `localhost` 加入 `NO_PROXY`，或让浏览器对本地地址不走代理。
- **上传文件失败**：确认第 5 步的 `rustfs-init` 已执行过一次。
- **端口被占用**：应用使用 3010（Next.js）和 9876（Vite），依赖服务使用 5432、6379、9000、9001、8180。

### 安全提示

`.env` 等配置文件已被 Git 忽略，不会被提交。但模板里的密码和密钥（`AUTH_SECRET`、`KEY_VAULTS_SECRET`、数据库密码等）都是公开的默认值，**只适合本地开发**。部署到服务器或对外开放之前，请务必全部重新生成。

### 致谢与许可证

本项目基于 [LobeHub](https://github.com/lobehub/lobehub) 二次开发，感谢 LobeHub 团队和所有贡献者。

本项目沿用 [LobeHub Community License](./LICENSE)（基于 Apache License 2.0，附加条件）。根据该许可证，基于本项目开发并**以商业方式分发衍生作品**，需要先向 LobeHub 取得商业授权（<hello@lobehub.com>）。

<div align="right">

[返回顶部](#readme-top)

</div>

---

## English

### Introduction

Junying AI is a self-hostable AI assistant platform built on top of the open-source project [LobeHub](https://github.com/lobehub/lobehub). It brings chat, agents, tasks, and a knowledge base together in one workspace. Connect your own model providers and keep your own API keys and data, so you end up with an AI assistant that is entirely yours.

Compared with upstream LobeHub, this repository adds:

- **Branding**: the app is named Junying AI and uses its own logo (browser tab icon, sign-in page, About page, PWA icon).
- **Theme**: a deep purple background across the interface.
- **Welcome line**: the default assistant greets you with "你的专属 AI 助手" ("Your personal AI assistant").
- **Quick start card**: a dismissible card above the home page input box that explains how to start a chat in three steps.

### Features

- **Multi-model chat**: 80+ built-in model providers (OpenAI, Anthropic, Google, DeepSeek, Qwen, Moonshot, Zhipu, OpenRouter, Ollama, and more). Switch models at any time from the input box.
- **Agents**: create multiple agents, each with its own prompt, model, and capabilities, and switch between them from the sidebar.
- **Tasks**: hand work to an agent as a task, track its progress on the home page, and schedule recurring tasks.
- **Resources & knowledge base**: upload files and manage resources so agents can answer from your own material.
- **Pages**: write and organize documents in the app, with an agent helping you edit.
- **Generation**: AI image and video generation.
- **Memory**: agents remember your preferences and context; review and manage what they remember in Settings.
- **Skills, tools & connectors**: extend agents with new abilities and connect external tools and services.
- **Community**: discover and add agents, models, and MCP servers shared by the community.
- **Languages & theme**: a multilingual interface; this repository defaults to the deep purple theme.

### Installation

These steps run the full development stack (frontend, backend, and databases) on your machine.

#### 1. Prerequisites

Install the following first:

- [Node.js](https://nodejs.org/) (latest LTS or stable; verified on Node.js 24)
- [pnpm](https://pnpm.io/installation) for dependencies (run `corepack enable` to use the version the project pins)
- [Bun](https://bun.com/docs/installation) to run the project scripts
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/get-started) to run PostgreSQL, Redis, RustFS, and SearXNG

#### 2. Get the code

```bash
git clone https://github.com/g-sunshine/lobehub.git
cd lobehub
```

#### 3. Install dependencies

```bash
pnpm install
```

#### 4. Configure environment variables

```bash
# Docker services
cp docker-compose/dev/.env.example docker-compose/dev/.env

# App
cp .env.example.development .env
```

Both files ship with defaults that work for local development, so you usually don't need to edit them.

#### 5. Start the backing services

Make sure Docker Desktop is running, then:

```bash
bun run dev:docker
```

On the first run, also initialize the file storage bucket once:

```bash
docker compose -f docker-compose/dev/docker-compose.yml up rustfs-init
```

#### 6. Set up the database

```bash
bun run db:migrate
```

You should see `✅ database migration pass.`

#### 7. Start the app

```bash
bun run dev
```

Then open <http://localhost:3010> in your browser. The first compile takes about a minute.

### Usage

1. **Create an account**: open <http://localhost:3010> and sign up with an email address (email verification is off by default locally), then finish the onboarding steps.

2. **Set up a model provider**: go to **Settings → Provider** (「AI 服务商」 in the Chinese UI), pick a provider (for example DeepSeek), enter your API key, and enable it. Sending a message fails until a key is configured.

3. **Start chatting**: on the home page, follow the three steps on the Quick start card:

   - click the model button in the input box and choose a model;
   - type your question in the input box;
   - press Enter or click Send to get an answer.

   Once you're comfortable, close the card with the × in its top-right corner. It won't come back.

4. **Switch modes**: the bottom-left of the input box switches between **Agent** (chat) and **Task**. Task mode creates a task that runs in the background while you track its progress.

5. **Manage agents and material**: create agents from the sidebar, upload files under **Resources**, and see what agents remember under **Memory**.

#### Common commands

| Command                    | What it does                                        |
| -------------------------- | --------------------------------------------------- |
| `bun run dev`              | Start the full dev stack (<http://localhost:3010>)  |
| `bun run dev:docker`       | Start PostgreSQL, Redis, RustFS, and SearXNG        |
| `bun run dev:docker:down`  | Stop the backing services                           |
| `bun run db:migrate`       | Run database migrations                             |
| `bun run dev:docker:reset` | Reset the backing services (**deletes local data**) |

#### Custom branding

The app name and logo are set in [`packages/business/const/src/branding.ts`](packages/business/const/src/branding.ts). Change `BRANDING_NAME` and `BRANDING_LOGO_URL` (put the logo file under `public/`), then restart the dev server.

#### Troubleshooting

- **The page won't load, or `localhost` returns 502 from the command line**: if `HTTP_PROXY` / `HTTPS_PROXY` is set, add `localhost` to `NO_PROXY`, or make sure your browser bypasses the proxy for local addresses.
- **File uploads fail**: make sure you ran `rustfs-init` once (step 5).
- **Port already in use**: the app uses 3010 (Next.js) and 9876 (Vite); the backing services use 5432, 6379, 9000, 9001, and 8180.

### Security note

`.env` and the other local config files are ignored by Git and are never committed. However, the passwords and secrets in the templates (`AUTH_SECRET`, `KEY_VAULTS_SECRET`, the database password, and so on) are public defaults meant **for local development only**. Regenerate all of them before deploying to a server or exposing the app to a network.

### Acknowledgements & license

Junying AI is built on [LobeHub](https://github.com/lobehub/lobehub). Thanks to the LobeHub team and all of its contributors.

This project keeps the [LobeHub Community License](./LICENSE) (Apache License 2.0 with additional conditions). Under that license, **distributing a derivative work commercially** requires a commercial license from LobeHub (<hello@lobehub.com>).

<div align="right">

[Back to top](#readme-top)

</div>
