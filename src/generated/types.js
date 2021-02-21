// Generated by @compas/code-gen
/* eslint-disable no-unused-vars */

// An export soo all things work correctly with linters, ts, ...
export const __generated__ = true;
/**
 * @typedef {import("@compas/code-gen").App} App
 */
/**
 * @typedef {import("@compas/code-gen").TypeCreator} TypeCreator
 */
/**
 * @typedef {import("@compas/code-gen").RouteCreator} RouteCreator
 */
/**
 * @typedef {{"filePath": string, "contentPath": string, "metadata"?: undefined|{"type": "blog"|"page", "title": string, "date"?: undefined|Date, "description": string, "order": number, "tags": (string)[], }, "htmlContent"?: undefined|string, }} ContentItem
 */
/**
 * @typedef {DocParserUnknownBlock|DocParserFunctionDeclarationBlock} DocParserBlock
 */
/**
 * @typedef {{"type": "unknown", "raw": string, "range": DocParserRange, }} DocParserUnknownBlock
 */
/**
 * @typedef {{"start": number, "end": number, "pkg": DocParserPackage, "file": string, "line"?: undefined|string, }} DocParserRange
 */
/**
 * @typedef {"insight"|"stdlib"|"cli"|"store"|"server"} DocParserPackage
 */
/**
 * @typedef {{"type": "functionDeclaration", "name"?: undefined|string, "summary"?: undefined|string, "description"?: undefined|string, "availableSince"?: undefined|string, "isVariable": boolean, "parsedType": DocParserFunctionType, "range": DocParserRange, }} DocParserFunctionDeclarationBlock
 */
/**
 * @typedef {{"type": "function", "params": ({"name": string, "description": string, "type": DocParserType, })[], "returnType": DocParserType, }} DocParserFunctionType
 */
/**
 * @typedef {DocParserLiteralType|DocParserFunctionType} DocParserType
 */
/**
 * @typedef {{"type": "literal", "value": string, "isOptional"?: undefined|boolean, "defaultValue"?: undefined|string, "isDocBlockReference"?: undefined|boolean, }} DocParserLiteralType
 */
/**
 * @typedef {{"type": "MultiLine"|"SingleLine", "value": string, "range": DocParserRange, }} DocParserJSComment
 */
