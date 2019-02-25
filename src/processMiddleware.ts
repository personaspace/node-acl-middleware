import {
    IPermissionObject,
    IPermissionsObject,
    IResourceACLEntry,
    IResourceACLMiddleware,
} from "@personaspace/server-acl-middleware-types";
import { IncomingMessage } from "http";

/**
 * Processes an access item and adds them to a permissions object, processing
 * the collective access objects with ACL middleware.
 *
 * ### Example
 * ```ts
 *  //  "request" is the web request on a PersonaSpace server.
 *  import { processMiddleware } from "@personaspace/server-acl-middleware";
 *  import { onDomain } from "@personaspace/server-acl-middleware-ondomain";
 *
 *  const req = { headers: { host: "example.com" } };
 *  const permissions = {
 *    create: {
 *      enforce: false,
 *      result: true,
 *    },
 *    read: {
 *      enforce: true,
 *      result: false,
 *    },
 *  };
 *  const permObjs = [
 *    {
 *      enforce: true,
 *      middleware: "onDomain",
 *      params: ["example.com"],
 *      result: false,
 *    },
 *    {
 *      enforce: false,
 *      result: true,
 *    },
 *  ];
 *  processMiddleware(req, "create", permissions, permObjs, [onDomain]);
 * ```
 *
 *  **Result of `console.log(permissions);`**
 * ```json
 *  {
 *      "create": {
 *          "enforce": true,
 *          "result": false
 *      },
 *      "read": {
 *          "enforce": true,
 *          "result": false
 *      }
 *  }
 * ```
 *
 * @param request IncomingMessage The web request for the resource.
 * @param access string The access item.
 * @param permissions IPermissionsObject The permissions object.
 * @param accessObjects IAccessObject[] A collection of access objects for the action.
 * @param middleware { [key: string]: IResourceACLMiddleware } The ACL middleware.
 * @param index number
 */
export function processMiddleware(
    request: Partial<IncomingMessage>,
    access: string,
    permissions: IPermissionsObject,
    accessObjects: IResourceACLEntry[],
    middleware: IResourceACLMiddleware[],
    index?: number,
) {
    let enforce: boolean;
    let result: boolean;
    let permission: IPermissionObject;

    (permissions as any)[access] = (permissions as any)[access] || {
        enforce: false,
        result: false,
    };
    permission = (permissions as any)[access];

    if (typeof index !== "number") {
        processMiddleware(
            request,
            access,
            permissions,
            accessObjects,
            middleware,
            0,
        );
    } else {
        const accessItem = accessObjects[index];
        let newResult: boolean = false;
        if (typeof accessItem.middleware === "string") {
            const mws = middleware.filter((m) => accessItem.middleware === m.name);
            if (!mws.length) { throw new Error(`Middleware ${accessItem.middleware} is not registered.`); }
            const mw = mws[0];
            const use = mw.exec(request, ...(accessItem.params || []));
            if (use) {
                newResult = !!accessItem.result;
            }
        } else if (typeof accessItem.result === "boolean") {
            newResult = !!accessItem.result;
        }

        result = !!(permission.enforce ? accessItem.enforce ? newResult : permission.result : newResult);
        enforce = permission.enforce ? true : !!accessItem.enforce;
        (permissions as any)[access] = { result, enforce };

        if (index < accessObjects.length - 1) {
            processMiddleware(request, access, permissions, accessObjects, middleware, index + 1);
        }
    }
}
