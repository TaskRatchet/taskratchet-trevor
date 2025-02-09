/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as commands_connectBeeminder from "../commands/connectBeeminder.js";
import type * as commands_goals from "../commands/goals.js";
import type * as commands_index from "../commands/index.js";
import type * as commands_start from "../commands/start.js";
import type * as commands_utils from "../commands/utils.js";
import type * as hello from "../hello.js";
import type * as http from "../http.js";
import type * as telegram from "../telegram.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "commands/connectBeeminder": typeof commands_connectBeeminder;
  "commands/goals": typeof commands_goals;
  "commands/index": typeof commands_index;
  "commands/start": typeof commands_start;
  "commands/utils": typeof commands_utils;
  hello: typeof hello;
  http: typeof http;
  telegram: typeof telegram;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
