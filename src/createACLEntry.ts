import {
    IResourceACLEntry,
    IResourceACLMiddleware,
} from "@personaspace/server-acl-middleware-types";

/**
 * Takes middleware, parameters, and result and returns an object that can be
 * stored as JSON in the ACL.
 *
 * ### Example
 * ```ts
 *  //  "request" is the web request on a PersonaSpace server.
 *  import { createACLEntry } from "@personaspace/server-acl-middleware";
 *  import { onDomain } from "@personaspace/server-acl-middleware-ondomain";
 *
 *  const result = createACLEntry(onDomain, ["example.com"], true, false);
 * ```
 *
 *  **Result of `console.log(result);`**
 * ```json
 *  {
 *      "enforce": false,
 *      "middleware": "onDomain",
 *      "params": ["example.com"],
 *      "result": true,
 *  }
 * ```
 *
 * @param middleware IResourceACLMiddleware The resource middleware for the entry.
 * @param values Array<boolean|number|string> The middleware params to store with the entry.
 * @param result booelan The access result.
 * @param enforce boolean Whether to enforce the result across further processing.
 * @returns The object to store for the access.
 */
export function createACLEntry(
    middleware: IResourceACLMiddleware,
    values: Array<boolean|number|string>,
    result: boolean = false,
    enforce: boolean = false,
): IResourceACLEntry {
    return {
        enforce,
        middleware: middleware.name,
        params: middleware.handleParams.map((param) => param(values, middleware.form)),
        result,
    };
}
