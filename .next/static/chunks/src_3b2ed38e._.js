(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": ()=>Card,
    "CardAction": ()=>CardAction,
    "CardContent": ()=>CardContent,
    "CardDescription": ()=>CardDescription,
    "CardFooter": ()=>CardFooter,
    "CardHeader": ()=>CardHeader,
    "CardTitle": ()=>CardTitle
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
const Card = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Card;
const CardHeader = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = CardHeader;
const CardTitle = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('leading-none', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = CardTitle;
const CardDescription = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = CardDescription;
const CardAction = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c4 = CardAction;
const CardContent = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-6 [&:last-child]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c5 = CardContent;
const CardFooter = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 pb-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/shared/UnderConstruction.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$construction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Construction$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/construction.js [app-client] (ecmascript) <export default as Construction>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
;
;
;
;
const UnderConstruction = (param)=>{
    let { featureName, onGoToFallback } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center min-h-[60vh] px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "w-full max-w-md text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$construction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Construction$3e$__["Construction"], {
                                    className: "w-8 h-8 text-yellow-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shared/UnderConstruction.tsx",
                                    lineNumber: 21,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/shared/UnderConstruction.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/UnderConstruction.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-xl font-bold text-gray-800",
                            children: "Under Construction"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/UnderConstruction.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shared/UnderConstruction.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: [
                                "The ",
                                featureName,
                                " feature is currently being developed and will be available soon."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shared/UnderConstruction.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500",
                            children: "We're working hard to bring you the best experience possible."
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/UnderConstruction.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        onGoToFallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onGoToFallback,
                            className: "w-full",
                            children: "Go to Profile"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/UnderConstruction.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shared/UnderConstruction.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shared/UnderConstruction.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/shared/UnderConstruction.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = UnderConstruction;
const __TURBOPACK__default__export__ = UnderConstruction;
var _c;
__turbopack_context__.k.register(_c, "UnderConstruction");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/shared/FeatureFlagProtected.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$UnderConstruction$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/UnderConstruction.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$feature$2d$flags$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/feature-flags/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$feature$2d$flags$2f$hooks$2f$useFeatureFlag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/feature-flags/hooks/useFeatureFlag.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const FeatureFlagProtected = (param)=>{
    let { featureName, children, showUnderConstruction = false, fallbackPath = '/profile' } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { flags, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$feature$2d$flags$2f$hooks$2f$useFeatureFlag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFeatureFlag"])([
        featureName
    ]);
    const isEnabled = flags[featureName];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeatureFlagProtected.useEffect": ()=>{
            if (!isLoading && !isEnabled && !showUnderConstruction) {
                router.push(fallbackPath);
            }
        }
    }["FeatureFlagProtected.useEffect"], [
        isLoading,
        isEnabled,
        showUnderConstruction,
        router,
        fallbackPath
    ]);
    const handleGoToFallback = ()=>{
        router.push(fallbackPath);
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[60vh]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/FeatureFlagProtected.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/shared/FeatureFlagProtected.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!isEnabled) {
        if (showUnderConstruction) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$UnderConstruction$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                featureName: featureName,
                onGoToFallback: handleGoToFallback
            }, void 0, false, {
                fileName: "[project]/src/components/shared/FeatureFlagProtected.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        }
        return null; // Will redirect to fallback path
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
};
_s(FeatureFlagProtected, "2XDf3Npsl2v3c/O6+SXBip9v95c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$feature$2d$flags$2f$hooks$2f$useFeatureFlag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFeatureFlag"]
    ];
});
_c = FeatureFlagProtected;
const __TURBOPACK__default__export__ = FeatureFlagProtected;
var _c;
__turbopack_context__.k.register(_c, "FeatureFlagProtected");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/Calendar.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "calendarCard": "Calendar-module__1Ob42q__calendarCard",
  "calendarSection": "Calendar-module__1Ob42q__calendarSection",
  "container": "Calendar-module__1Ob42q__container",
  "header": "Calendar-module__1Ob42q__header",
  "mainContent": "Calendar-module__1Ob42q__mainContent",
  "sidebar": "Calendar-module__1Ob42q__sidebar",
  "subtitle": "Calendar-module__1Ob42q__subtitle",
  "title": "Calendar-module__1Ob42q__title",
});
}),
"[project]/src/features/calendar/config/workoutTypes.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "dayHeaders": ()=>dayHeaders,
    "months": ()=>months,
    "workoutTypes": ()=>workoutTypes
});
const workoutTypes = [
    {
        name: 'Strength',
        color: 'workout-strength',
        textColor: 'workout-strength-text',
        bgColor: 'workout-strength-bg'
    },
    {
        name: 'Cardio',
        color: 'workout-cardio',
        textColor: 'workout-cardio-text',
        bgColor: 'workout-cardio-bg'
    },
    {
        name: 'HIIT',
        color: 'workout-hiit',
        textColor: 'workout-hiit-text',
        bgColor: 'workout-hiit-bg'
    },
    {
        name: 'Flexibility',
        color: 'workout-flexibility',
        textColor: 'workout-flexibility-text',
        bgColor: 'workout-flexibility-bg'
    },
    {
        name: 'Recovery',
        color: 'workout-recovery',
        textColor: 'workout-recovery-text',
        bgColor: 'workout-recovery-bg'
    }
];
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const dayHeaders = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/utils/workoutUtils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "calculateCalendarStats": ()=>calculateCalendarStats,
    "convertTo24Hour": ()=>convertTo24Hour,
    "getStatusConfig": ()=>getStatusConfig,
    "getTimeOfDay": ()=>getTimeOfDay,
    "getUpcomingWorkouts": ()=>getUpcomingWorkouts,
    "getWorkoutTypeConfig": ()=>getWorkoutTypeConfig,
    "groupWorkoutsByDay": ()=>groupWorkoutsByDay
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$config$2f$workoutTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/config/workoutTypes.ts [app-client] (ecmascript)");
;
const convertTo24Hour = (time)=>{
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':');
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) {
        hour += 12;
    } else if (period === 'AM' && hour === 12) {
        hour = 0;
    }
    return "".concat(hour.toString().padStart(2, '0'), ":").concat(minutes);
};
const getUpcomingWorkouts = (workouts, today)=>{
    return workouts.filter((w)=>w.status === 'scheduled' && w.date >= today).sort((a, b)=>{
        // First sort by date, then by time
        if (a.date.getTime() !== b.date.getTime()) {
            return a.date.getTime() - b.date.getTime();
        }
        // Convert time to 24-hour format for comparison
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
    }).slice(0, 8); // Show more to accommodate multiple daily sessions
};
const groupWorkoutsByDay = (workoutList)=>{
    const grouped = workoutList.reduce((acc, workout)=>{
        const dateKey = workout.date.toDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(workout);
        return acc;
    }, {});
    // Sort workouts within each day by time
    Object.keys(grouped).forEach((dateKey)=>{
        grouped[dateKey].sort((a, b)=>{
            const timeA = convertTo24Hour(a.time);
            const timeB = convertTo24Hour(b.time);
            return timeA.localeCompare(timeB);
        });
    });
    return grouped;
};
const getTimeOfDay = (time)=>{
    const hour24 = parseInt(convertTo24Hour(time).split(':')[0]);
    if (hour24 >= 5 && hour24 < 12) {
        return {
            period: 'Morning',
            color: 'time-morning-text',
            bgColor: 'time-morning-bg'
        };
    } else if (hour24 >= 12 && hour24 < 17) {
        return {
            period: 'Afternoon',
            color: 'time-afternoon-text',
            bgColor: 'time-afternoon-bg'
        };
    } else {
        return {
            period: 'Evening',
            color: 'time-evening-text',
            bgColor: 'time-evening-bg'
        };
    }
};
const getWorkoutTypeConfig = (type)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$config$2f$workoutTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["workoutTypes"].find((wt)=>wt.name === type) || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$config$2f$workoutTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["workoutTypes"][0];
};
const getStatusConfig = (status)=>{
    switch(status){
        case 'completed':
            return {
                color: 'status-completed',
                text: 'Completed',
                textColor: 'status-completed-text'
            };
        case 'scheduled':
            return {
                color: 'status-scheduled',
                text: 'Scheduled',
                textColor: 'status-scheduled-text'
            };
        case 'missed':
            return {
                color: 'status-missed',
                text: 'Missed',
                textColor: 'status-missed-text'
            };
        case 'active':
            return {
                color: 'status-active',
                text: 'In Progress',
                textColor: 'status-active-text'
            };
        default:
            return {
                color: 'status-unknown',
                text: 'Unknown',
                textColor: 'status-unknown-text'
            };
    }
};
const calculateCalendarStats = (workouts, today)=>{
    const completedThisMonth = workouts.filter((w)=>w.status === 'completed' && w.date.getMonth() === today.getMonth() && w.date.getFullYear() === today.getFullYear()).length;
    const scheduledThisMonth = workouts.filter((w)=>w.date.getMonth() === today.getMonth() && w.date.getFullYear() === today.getFullYear()).length;
    const totalCaloriesBurned = workouts.filter((w)=>w.status === 'completed' && w.actualCalories).reduce((sum, w)=>sum + (w.actualCalories || 0), 0);
    // Calculate days with multiple sessions this month
    const daysWithMultipleSessions = Object.values(workouts.filter((w)=>w.date.getMonth() === today.getMonth() && w.date.getFullYear() === today.getFullYear()).reduce((acc, workout)=>{
        const dateKey = workout.date.toDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = 0;
        }
        acc[dateKey]++;
        return acc;
    }, {})).filter((count)=>count > 1).length;
    // Calculate average workout duration
    const completedWorkouts = workouts.filter((w)=>w.status === 'completed');
    const totalMinutes = completedWorkouts.reduce((sum, w)=>{
        const minutes = parseInt(w.duration.split(' ')[0]);
        return sum + minutes;
    }, 0);
    const avgDuration = completedWorkouts.length > 0 ? Math.round(totalMinutes / completedWorkouts.length) : 0;
    return {
        completedThisMonth,
        scheduledThisMonth,
        totalCaloriesBurned,
        avgDuration,
        daysWithMultipleSessions
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/CalendarDay/CalendarDay.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "currentMonth": "CalendarDay-module__9cnn4W__currentMonth",
  "currentMonthText": "CalendarDay-module__9cnn4W__currentMonthText",
  "dateNumber": "CalendarDay-module__9cnn4W__dateNumber",
  "day": "CalendarDay-module__9cnn4W__day",
  "indicator": "CalendarDay-module__9cnn4W__indicator",
  "indicatorRow": "CalendarDay-module__9cnn4W__indicatorRow",
  "indicators": "CalendarDay-module__9cnn4W__indicators",
  "moreIndicator": "CalendarDay-module__9cnn4W__moreIndicator",
  "multipleWorkouts": "CalendarDay-module__9cnn4W__multipleWorkouts",
  "otherMonth": "CalendarDay-module__9cnn4W__otherMonth",
  "otherMonthText": "CalendarDay-module__9cnn4W__otherMonthText",
  "selected": "CalendarDay-module__9cnn4W__selected",
  "sessionCount": "CalendarDay-module__9cnn4W__sessionCount",
  "singleWorkout": "CalendarDay-module__9cnn4W__singleWorkout",
  "smallIndicator": "CalendarDay-module__9cnn4W__smallIndicator",
  "status-active": "CalendarDay-module__9cnn4W__status-active",
  "status-completed": "CalendarDay-module__9cnn4W__status-completed",
  "status-missed": "CalendarDay-module__9cnn4W__status-missed",
  "status-scheduled": "CalendarDay-module__9cnn4W__status-scheduled",
  "status-unknown": "CalendarDay-module__9cnn4W__status-unknown",
  "today": "CalendarDay-module__9cnn4W__today",
  "todayText": "CalendarDay-module__9cnn4W__todayText",
  "workout-cardio": "CalendarDay-module__9cnn4W__workout-cardio",
  "workout-flexibility": "CalendarDay-module__9cnn4W__workout-flexibility",
  "workout-hiit": "CalendarDay-module__9cnn4W__workout-hiit",
  "workout-recovery": "CalendarDay-module__9cnn4W__workout-recovery",
  "workout-strength": "CalendarDay-module__9cnn4W__workout-strength",
  "workoutIndicators": "CalendarDay-module__9cnn4W__workoutIndicators",
});
}),
"[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CalendarDay": ()=>CalendarDay
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/utils/workoutUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarDay/CalendarDay.module.css [app-client] (css module)");
;
;
;
const CalendarDay = (param)=>{
    let { day, onSelect } = param;
    const handleClick = ()=>{
        onSelect(day);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].day, " ").concat(day.isCurrentMonth ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].currentMonth : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].otherMonth, " ").concat(day.isToday ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].today : '', " ").concat(day.isSelected ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''),
        onClick: handleClick,
        onKeyDown: (e)=>{
            if (e.key === 'Enter' || e.key === ' ') {
                handleClick();
            }
        },
        role: "button",
        tabIndex: 0,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dateNumber, " ").concat(day.isToday ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].todayText : day.isCurrentMonth ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].currentMonthText : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].otherMonthText),
                children: day.date
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            day.workouts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].workoutIndicators,
                children: day.workouts.length === 1 ? // Single workout - show as before
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].singleWorkout,
                    children: day.workouts.map((workout)=>{
                        const typeConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkoutTypeConfig"])(workout.type);
                        const statusConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatusConfig"])(workout.status);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indicator, " ").concat(workout.status === 'completed' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][statusConfig.color] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][typeConfig.color]),
                            title: "".concat(workout.name, " at ").concat(workout.time, " - ").concat(workout.status)
                        }, workout.id, false, {
                            fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                            lineNumber: 57,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                    lineNumber: 52,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)) : // Multiple workouts - show count and time indicators
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].multipleWorkouts,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indicatorRow,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indicators,
                                children: [
                                    day.workouts.slice(0, 4).map((workout)=>{
                                        const typeConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkoutTypeConfig"])(workout.type);
                                        const statusConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatusConfig"])(workout.status);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].smallIndicator, " ").concat(workout.status === 'completed' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][statusConfig.color] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][typeConfig.color]),
                                            title: "".concat(workout.name, " at ").concat(workout.time, " - ").concat(workout.status)
                                        }, workout.id, false, {
                                            fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                                            lineNumber: 78,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0));
                                    }),
                                    day.workouts.length > 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].moreIndicator,
                                        children: [
                                            "+",
                                            day.workouts.length - 4
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                                        lineNumber: 90,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                                lineNumber: 73,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                            lineNumber: 72,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sessionCount,
                            children: [
                                day.workouts.length,
                                " sessions"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                            lineNumber: 96,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                    lineNumber: 71,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CalendarDay;
var _c;
__turbopack_context__.k.register(_c, "CalendarDay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/CalendarDay/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/CalendarDay/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarDay/index.ts [app-client] (ecmascript) <locals>");
}),
"[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "calendarDays": "CalendarGrid-module__R9tnAG__calendarDays",
  "dayHeader": "CalendarGrid-module__R9tnAG__dayHeader",
  "dayHeaderText": "CalendarGrid-module__R9tnAG__dayHeaderText",
  "dayHeaders": "CalendarGrid-module__R9tnAG__dayHeaders",
  "grid": "CalendarGrid-module__R9tnAG__grid",
});
}),
"[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CalendarGrid": ()=>CalendarGrid
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$config$2f$workoutTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/config/workoutTypes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarDay/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarDay/CalendarDay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.module.css [app-client] (css module)");
;
;
;
;
const CalendarGrid = (param)=>{
    let { calendarDays, onDaySelect } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayHeaders,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$config$2f$workoutTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dayHeaders"].map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayHeader,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayHeaderText,
                            children: day
                        }, void 0, false, {
                            fileName: "[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, day, false, {
                        fileName: "[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].calendarDays,
                children: calendarDays.map((day, index)=>{
                    const uniqueKey = "".concat(day.date, "-").concat(day.isCurrentMonth, "-").concat(day.isToday, "-").concat(day.isSelected, "-").concat(day.workouts.length, "-").concat(index);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarDay$2f$CalendarDay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarDay"], {
                        day: day,
                        onSelect: onDaySelect
                    }, uniqueKey, false, {
                        fileName: "[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CalendarGrid;
var _c;
__turbopack_context__.k.register(_c, "CalendarGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/CalendarGrid/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/CalendarGrid/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarGrid/index.ts [app-client] (ecmascript) <locals>");
}),
"[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "CalendarNavigation-module__aIPaqa__active",
  "controls": "CalendarNavigation-module__aIPaqa__controls",
  "icon": "CalendarNavigation-module__aIPaqa__icon",
  "leftSection": "CalendarNavigation-module__aIPaqa__leftSection",
  "navButton": "CalendarNavigation-module__aIPaqa__navButton",
  "navigation": "CalendarNavigation-module__aIPaqa__navigation",
  "title": "CalendarNavigation-module__aIPaqa__title",
  "todayButton": "CalendarNavigation-module__aIPaqa__todayButton",
  "viewModeButton": "CalendarNavigation-module__aIPaqa__viewModeButton",
  "viewModeSelector": "CalendarNavigation-module__aIPaqa__viewModeSelector",
});
}),
"[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CalendarNavigation": ()=>CalendarNavigation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$config$2f$workoutTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/config/workoutTypes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
;
;
;
;
;
const CalendarNavigation = (param)=>{
    let { currentDate, viewMode, onNavigateMonth, onNavigateToToday, onViewModeChange } = param;
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navigation,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].leftSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$config$2f$workoutTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["months"][currentMonth],
                            " ",
                            currentYear
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controls,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>onNavigateMonth('prev'),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButton,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>onNavigateMonth('next'),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButton,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: onNavigateToToday,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].todayButton,
                                children: "Today"
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].viewModeSelector,
                children: [
                    'Month',
                    'Week',
                    'Day'
                ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: viewMode === mode ? 'default' : 'ghost',
                        size: "sm",
                        onClick: ()=>onViewModeChange(mode),
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].viewModeButton, " ").concat(viewMode === mode ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''),
                        children: mode
                    }, mode, false, {
                        fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CalendarNavigation;
var _c;
__turbopack_context__.k.register(_c, "CalendarNavigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/CalendarNavigation/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/CalendarNavigation/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarNavigation/index.ts [app-client] (ecmascript) <locals>");
}),
"[project]/src/features/calendar/components/CalendarStats/CalendarStats.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "icon": "CalendarStats-module__frnCPa__icon",
  "statCard": "CalendarStats-module__frnCPa__statCard",
  "statContent": "CalendarStats-module__frnCPa__statContent",
  "statDescription": "CalendarStats-module__frnCPa__statDescription",
  "statIcon": "CalendarStats-module__frnCPa__statIcon",
  "statInfo": "CalendarStats-module__frnCPa__statInfo",
  "statLabel": "CalendarStats-module__frnCPa__statLabel",
  "statValue": "CalendarStats-module__frnCPa__statValue",
  "statsGrid": "CalendarStats-module__frnCPa__statsGrid",
});
}),
"[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CalendarStats": ()=>CalendarStats
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarStats/CalendarStats.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
;
;
;
;
const CalendarStats = (param)=>{
    let { stats } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statsGrid,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statInfo,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                    children: "This Month"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statValue,
                                    children: [
                                        stats.completedThisMonth,
                                        "/",
                                        stats.scheduledThisMonth
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statDescription,
                                    children: "Workouts completed"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statIcon,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statInfo,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                    children: "Total Calories"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statValue,
                                    children: stats.totalCaloriesBurned.toLocaleString()
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statDescription,
                                    children: "Burned this month"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statIcon,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statInfo,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                    children: "Avg Duration"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statValue,
                                    children: [
                                        stats.avgDuration,
                                        "m"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statDescription,
                                    children: "Per workout"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statIcon,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statInfo,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                    children: "Double Days"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statValue,
                                    children: stats.daysWithMultipleSessions
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statDescription,
                                    children: "Multiple sessions"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statIcon,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CalendarStats;
var _c;
__turbopack_context__.k.register(_c, "CalendarStats");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/CalendarStats/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/CalendarStats/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarStats/index.ts [app-client] (ecmascript) <locals>");
}),
"[project]/src/features/calendar/components/QuickActions/QuickActions.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionButton": "QuickActions-module__FX4Z7q__actionButton",
  "actionIcon": "QuickActions-module__FX4Z7q__actionIcon",
  "actions": "QuickActions-module__FX4Z7q__actions",
  "container": "QuickActions-module__FX4Z7q__container",
  "title": "QuickActions-module__FX4Z7q__title",
});
}),
"[project]/src/features/calendar/components/QuickActions/QuickActions.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "QuickActions": ()=>QuickActions
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/QuickActions/QuickActions.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const QuickActions = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: "Quick Actions"
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/QuickActions/QuickActions.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionButton,
                        onClick: ()=>router.push('/routines/create'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionIcon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/QuickActions/QuickActions.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Schedule Workout"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/QuickActions/QuickActions.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionButton,
                        onClick: ()=>router.push('/routines'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionIcon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/QuickActions/QuickActions.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "View Routines"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/QuickActions/QuickActions.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionButton,
                        onClick: ()=>router.push('/statistics'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionIcon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/QuickActions/QuickActions.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "View Progress"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/QuickActions/QuickActions.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/components/QuickActions/QuickActions.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/calendar/components/QuickActions/QuickActions.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(QuickActions, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = QuickActions;
var _c;
__turbopack_context__.k.register(_c, "QuickActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/QuickActions/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/QuickActions/QuickActions.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/QuickActions/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/QuickActions/QuickActions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/QuickActions/index.ts [app-client] (ecmascript) <locals>");
}),
"[project]/src/features/calendar/utils/calendarUtils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "formatDate": ()=>formatDate,
    "generateCalendarDays": ()=>generateCalendarDays,
    "isSameDay": ()=>isSameDay
});
const isSameDay = (date1, date2)=>{
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};
const generateCalendarDays = (currentDate, workouts, selectedDate, today)=>{
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    const days = [];
    // Add previous month's trailing days
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    for(let i = firstDayOfWeek - 1; i >= 0; i--){
        const date = prevMonth.getDate() - i;
        const workoutDate = new Date(currentYear, currentMonth - 1, date);
        days.push({
            date,
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            workouts: workouts.filter((w)=>isSameDay(w.date, workoutDate))
        });
    }
    // Add current month's days
    for(let date = 1; date <= daysInMonth; date++){
        const workoutDate = new Date(currentYear, currentMonth, date);
        const isToday = isSameDay(workoutDate, today);
        const isSelected = isSameDay(workoutDate, selectedDate);
        days.push({
            date,
            isCurrentMonth: true,
            isToday,
            isSelected,
            workouts: workouts.filter((w)=>isSameDay(w.date, workoutDate))
        });
    }
    // Add next month's leading days
    const remainingDays = 42 - days.length; // 6 weeks × 7 days
    for(let date = 1; date <= remainingDays; date++){
        const workoutDate = new Date(currentYear, currentMonth + 1, date);
        days.push({
            date,
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            workouts: workouts.filter((w)=>isSameDay(w.date, workoutDate))
        });
    }
    return days;
};
const formatDate = (date)=>{
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (isSameDay(date, today)) {
        return 'Today';
    } else if (isSameDay(date, tomorrow)) {
        return 'Tomorrow';
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionButton": "WorkoutEventCard-module__JN65uW__actionButton",
  "actionIcon": "WorkoutEventCard-module__JN65uW__actionIcon",
  "actions": "WorkoutEventCard-module__JN65uW__actions",
  "badges": "WorkoutEventCard-module__JN65uW__badges",
  "calories": "WorkoutEventCard-module__JN65uW__calories",
  "card": "WorkoutEventCard-module__JN65uW__card",
  "content": "WorkoutEventCard-module__JN65uW__content",
  "default": "WorkoutEventCard-module__JN65uW__default",
  "deleteIcon": "WorkoutEventCard-module__JN65uW__deleteIcon",
  "detailIcon": "WorkoutEventCard-module__JN65uW__detailIcon",
  "detailItem": "WorkoutEventCard-module__JN65uW__detailItem",
  "detailText": "WorkoutEventCard-module__JN65uW__detailText",
  "details": "WorkoutEventCard-module__JN65uW__details",
  "difficultyBadge": "WorkoutEventCard-module__JN65uW__difficultyBadge",
  "header": "WorkoutEventCard-module__JN65uW__header",
  "startButton": "WorkoutEventCard-module__JN65uW__startButton",
  "startIcon": "WorkoutEventCard-module__JN65uW__startIcon",
  "status-active": "WorkoutEventCard-module__JN65uW__status-active",
  "status-active-text": "WorkoutEventCard-module__JN65uW__status-active-text",
  "status-completed": "WorkoutEventCard-module__JN65uW__status-completed",
  "status-completed-text": "WorkoutEventCard-module__JN65uW__status-completed-text",
  "status-missed": "WorkoutEventCard-module__JN65uW__status-missed",
  "status-missed-text": "WorkoutEventCard-module__JN65uW__status-missed-text",
  "status-scheduled": "WorkoutEventCard-module__JN65uW__status-scheduled",
  "status-scheduled-text": "WorkoutEventCard-module__JN65uW__status-scheduled-text",
  "status-unknown": "WorkoutEventCard-module__JN65uW__status-unknown",
  "status-unknown-text": "WorkoutEventCard-module__JN65uW__status-unknown-text",
  "time-afternoon-bg": "WorkoutEventCard-module__JN65uW__time-afternoon-bg",
  "time-afternoon-text": "WorkoutEventCard-module__JN65uW__time-afternoon-text",
  "time-evening-bg": "WorkoutEventCard-module__JN65uW__time-evening-bg",
  "time-evening-text": "WorkoutEventCard-module__JN65uW__time-evening-text",
  "time-morning-bg": "WorkoutEventCard-module__JN65uW__time-morning-bg",
  "time-morning-text": "WorkoutEventCard-module__JN65uW__time-morning-text",
  "timeBadge": "WorkoutEventCard-module__JN65uW__timeBadge",
  "title": "WorkoutEventCard-module__JN65uW__title",
  "titleSection": "WorkoutEventCard-module__JN65uW__titleSection",
  "today": "WorkoutEventCard-module__JN65uW__today",
  "typeBadge": "WorkoutEventCard-module__JN65uW__typeBadge",
  "workout-cardio": "WorkoutEventCard-module__JN65uW__workout-cardio",
  "workout-cardio-bg": "WorkoutEventCard-module__JN65uW__workout-cardio-bg",
  "workout-cardio-text": "WorkoutEventCard-module__JN65uW__workout-cardio-text",
  "workout-flexibility": "WorkoutEventCard-module__JN65uW__workout-flexibility",
  "workout-flexibility-bg": "WorkoutEventCard-module__JN65uW__workout-flexibility-bg",
  "workout-flexibility-text": "WorkoutEventCard-module__JN65uW__workout-flexibility-text",
  "workout-hiit": "WorkoutEventCard-module__JN65uW__workout-hiit",
  "workout-hiit-bg": "WorkoutEventCard-module__JN65uW__workout-hiit-bg",
  "workout-hiit-text": "WorkoutEventCard-module__JN65uW__workout-hiit-text",
  "workout-recovery": "WorkoutEventCard-module__JN65uW__workout-recovery",
  "workout-recovery-bg": "WorkoutEventCard-module__JN65uW__workout-recovery-bg",
  "workout-recovery-text": "WorkoutEventCard-module__JN65uW__workout-recovery-text",
  "workout-strength": "WorkoutEventCard-module__JN65uW__workout-strength",
  "workout-strength-bg": "WorkoutEventCard-module__JN65uW__workout-strength-bg",
  "workout-strength-text": "WorkoutEventCard-module__JN65uW__workout-strength-text",
});
}),
"[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WorkoutEventCard": ()=>WorkoutEventCard
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$calendarUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/utils/calendarUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/utils/workoutUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const WorkoutEventCard = (param)=>{
    let { workout, today, onEdit, onDelete } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const typeConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkoutTypeConfig"])(workout.type);
    const timeOfDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTimeOfDay"])(workout.time);
    const isToday = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$calendarUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDay"])(workout.date, today);
    const handleStartWorkout = ()=>{
        router.push('/workout-tracker');
    };
    const handleEdit = ()=>{
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(workout);
    };
    const handleDelete = ()=>{
        onDelete === null || onDelete === void 0 ? void 0 : onDelete(workout);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card, " ").concat(isToday ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].today : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].default),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                        children: workout.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].timeBadge, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][timeOfDay.color], " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][timeOfDay.bgColor]),
                                        children: timeOfDay.period
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badges,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "secondary",
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].typeBadge, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][typeConfig.bgColor], " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][typeConfig.textColor]),
                                        children: workout.type
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].difficultyBadge,
                                        children: workout.difficulty
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: handleEdit,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionButton,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionIcon
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: handleDelete,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionButton,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"], {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deleteIcon
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].details,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailItem,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailIcon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailText,
                                children: [
                                    workout.time,
                                    " • ",
                                    workout.duration
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailItem,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailIcon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailText,
                                children: [
                                    workout.exercises,
                                    " exercises"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            workout.estimatedCalories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].calories,
                children: [
                    "Estimated: ~",
                    workout.estimatedCalories,
                    " calories"
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isToday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].startButton,
                size: "sm",
                onClick: handleStartWorkout,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].startIcon
                    }, void 0, false, {
                        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Start ",
                    timeOfDay.period,
                    " Workout"
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
                lineNumber: 116,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(WorkoutEventCard, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = WorkoutEventCard;
var _c;
__turbopack_context__.k.register(_c, "WorkoutEventCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/WorkoutEventCard/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/WorkoutEventCard/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutEventCard/index.ts [app-client] (ecmascript) <locals>");
}),
"[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "UpcomingWorkouts-module__sMFLkG__container",
  "content": "UpcomingWorkouts-module__sMFLkG__content",
  "dayGroup": "UpcomingWorkouts-module__sMFLkG__dayGroup",
  "dayHeader": "UpcomingWorkouts-module__sMFLkG__dayHeader",
  "dayTitle": "UpcomingWorkouts-module__sMFLkG__dayTitle",
  "emptyDescription": "UpcomingWorkouts-module__sMFLkG__emptyDescription",
  "emptyIcon": "UpcomingWorkouts-module__sMFLkG__emptyIcon",
  "emptyState": "UpcomingWorkouts-module__sMFLkG__emptyState",
  "emptyTitle": "UpcomingWorkouts-module__sMFLkG__emptyTitle",
  "header": "UpcomingWorkouts-module__sMFLkG__header",
  "sessionBadge": "UpcomingWorkouts-module__sMFLkG__sessionBadge",
  "title": "UpcomingWorkouts-module__sMFLkG__title",
  "viewAllButton": "UpcomingWorkouts-module__sMFLkG__viewAllButton",
  "workoutsList": "UpcomingWorkouts-module__sMFLkG__workoutsList",
});
}),
"[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "UpcomingWorkouts": ()=>UpcomingWorkouts
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.534.0_react@19.1.1/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$calendarUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/utils/calendarUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutEventCard/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutEventCard/WorkoutEventCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
const UpcomingWorkouts = (param)=>{
    let { groupedUpcoming, today, onEditWorkout, onDeleteWorkout } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: "Upcoming Workouts"
                    }, void 0, false, {
                        fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        onClick: ()=>router.push('/routines'),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].viewAllButton,
                        children: "View All"
                    }, void 0, false, {
                        fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                children: [
                    Object.entries(groupedUpcoming).map((param)=>{
                        let [dateKey, dayWorkouts] = param;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayHeader,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayTitle,
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$calendarUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(dayWorkouts[0].date)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                                            lineNumber: 48,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        dayWorkouts.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "outline",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sessionBadge,
                                            children: [
                                                dayWorkouts.length,
                                                " sessions"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                                            lineNumber: 52,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].workoutsList,
                                    children: dayWorkouts.map((workout)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutEventCard$2f$WorkoutEventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkoutEventCard"], {
                                            workout: workout,
                                            today: today,
                                            onEdit: onEditWorkout,
                                            onDelete: onDeleteWorkout
                                        }, workout.id, false, {
                                            fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, dateKey, true, {
                            fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0));
                    }),
                    Object.keys(groupedUpcoming).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$534$2e$0_react$40$19$2e$1$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyIcon
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyTitle,
                                children: "No upcoming workouts"
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyDescription,
                                children: "Schedule your next session"
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(UpcomingWorkouts, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UpcomingWorkouts;
var _c;
__turbopack_context__.k.register(_c, "UpcomingWorkouts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/UpcomingWorkouts/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/UpcomingWorkouts/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/UpcomingWorkouts/index.ts [app-client] (ecmascript) <locals>");
}),
"[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "indicator": "WorkoutTypeLegend-module__ekk9Tq__indicator",
  "label": "WorkoutTypeLegend-module__ekk9Tq__label",
  "legend": "WorkoutTypeLegend-module__ekk9Tq__legend",
  "legendItem": "WorkoutTypeLegend-module__ekk9Tq__legendItem",
  "status-active": "WorkoutTypeLegend-module__ekk9Tq__status-active",
  "status-completed": "WorkoutTypeLegend-module__ekk9Tq__status-completed",
  "status-missed": "WorkoutTypeLegend-module__ekk9Tq__status-missed",
  "status-scheduled": "WorkoutTypeLegend-module__ekk9Tq__status-scheduled",
  "status-unknown": "WorkoutTypeLegend-module__ekk9Tq__status-unknown",
  "typeName": "WorkoutTypeLegend-module__ekk9Tq__typeName",
  "workout-cardio": "WorkoutTypeLegend-module__ekk9Tq__workout-cardio",
  "workout-flexibility": "WorkoutTypeLegend-module__ekk9Tq__workout-flexibility",
  "workout-hiit": "WorkoutTypeLegend-module__ekk9Tq__workout-hiit",
  "workout-recovery": "WorkoutTypeLegend-module__ekk9Tq__workout-recovery",
  "workout-strength": "WorkoutTypeLegend-module__ekk9Tq__workout-strength",
});
}),
"[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WorkoutTypeLegend": ()=>WorkoutTypeLegend
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$config$2f$workoutTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/config/workoutTypes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.module.css [app-client] (css module)");
;
;
;
const WorkoutTypeLegend = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legend,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                children: "Legend:"
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$config$2f$workoutTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["workoutTypes"].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendItem,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indicator, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][type.color])
                        }, void 0, false, {
                            fileName: "[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.tsx",
                            lineNumber: 11,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].typeName,
                            children: type.name
                        }, void 0, false, {
                            fileName: "[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.tsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, type.name, true, {
                    fileName: "[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = WorkoutTypeLegend;
var _c;
__turbopack_context__.k.register(_c, "WorkoutTypeLegend");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/WorkoutTypeLegend/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/components/WorkoutTypeLegend/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutTypeLegend/index.ts [app-client] (ecmascript) <locals>");
}),
"[project]/src/features/calendar/hooks/useCalendar.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useCalendar": ()=>useCalendar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useCalendar = ()=>{
    _s();
    const [currentDate, setCurrentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date(2025, 6, 22)); // July 22, 2025
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date(2025, 6, 22)); // July 22, 2025
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Month');
    const navigateMonth = (direction)=>{
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
    };
    const navigateToToday = ()=>{
        const today = new Date(2025, 6, 22); // July 22, 2025
        setCurrentDate(today);
        setSelectedDate(today);
    };
    return {
        currentDate,
        selectedDate,
        viewMode,
        setCurrentDate,
        setSelectedDate,
        setViewMode,
        navigateMonth,
        navigateToToday
    };
};
_s(useCalendar, "dBUuCuMfzPNTthDypynL0byAKDo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/data/mockWorkouts.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "mockWorkouts": ()=>mockWorkouts
});
const mockWorkouts = [
    {
        id: '1',
        name: 'Upper Body Strength',
        duration: '45 minutes',
        difficulty: 'Intermediate',
        type: 'Strength',
        status: 'completed',
        date: new Date(2025, 6, 20),
        time: '5:30 PM',
        exercises: 8,
        estimatedCalories: 320,
        actualCalories: 298
    },
    {
        id: '2',
        name: 'Morning HIIT',
        duration: '30 minutes',
        difficulty: 'Advanced',
        type: 'HIIT',
        status: 'scheduled',
        date: new Date(2025, 6, 22),
        time: '7:00 AM',
        exercises: 6,
        estimatedCalories: 280
    },
    {
        id: '2b',
        name: 'Evening Yoga',
        duration: '25 minutes',
        difficulty: 'Beginner',
        type: 'Flexibility',
        status: 'scheduled',
        date: new Date(2025, 6, 22),
        time: '7:30 PM',
        exercises: 4,
        estimatedCalories: 120
    },
    {
        id: '3',
        name: 'Lower Body Focus',
        duration: '50 minutes',
        difficulty: 'Intermediate',
        type: 'Strength',
        status: 'scheduled',
        date: new Date(2025, 6, 23),
        time: '6:00 PM',
        exercises: 10,
        estimatedCalories: 350
    },
    {
        id: '4a',
        name: 'Morning Walk',
        duration: '30 minutes',
        difficulty: 'Beginner',
        type: 'Cardio',
        status: 'scheduled',
        date: new Date(2025, 6, 24),
        time: '7:00 AM',
        exercises: 2,
        estimatedCalories: 150
    },
    {
        id: '4b',
        name: 'Strength Training',
        duration: '45 minutes',
        difficulty: 'Intermediate',
        type: 'Strength',
        status: 'scheduled',
        date: new Date(2025, 6, 24),
        time: '6:30 PM',
        exercises: 7,
        estimatedCalories: 300
    },
    {
        id: '5',
        name: 'Full Body Circuit',
        duration: '40 minutes',
        difficulty: 'Advanced',
        type: 'HIIT',
        status: 'completed',
        date: new Date(2025, 6, 18),
        time: '6:30 PM',
        exercises: 12,
        estimatedCalories: 380,
        actualCalories: 365
    },
    {
        id: '6a',
        name: 'Morning Cardio',
        duration: '25 minutes',
        difficulty: 'Beginner',
        type: 'Cardio',
        status: 'completed',
        date: new Date(2025, 6, 19),
        time: '6:45 AM',
        exercises: 3,
        estimatedCalories: 180,
        actualCalories: 165
    },
    {
        id: '6b',
        name: 'Core & Flexibility',
        duration: '35 minutes',
        difficulty: 'Beginner',
        type: 'Flexibility',
        status: 'completed',
        date: new Date(2025, 6, 19),
        time: '8:00 PM',
        exercises: 6,
        estimatedCalories: 150,
        actualCalories: 142
    },
    {
        id: '7a',
        name: 'Morning Run',
        duration: '35 minutes',
        difficulty: 'Intermediate',
        type: 'Cardio',
        status: 'completed',
        date: new Date(2025, 6, 21),
        time: '6:30 AM',
        exercises: 3,
        estimatedCalories: 250,
        actualCalories: 265
    },
    {
        id: '7b',
        name: 'Push Day',
        duration: '55 minutes',
        difficulty: 'Advanced',
        type: 'Strength',
        status: 'completed',
        date: new Date(2025, 6, 21),
        time: '6:00 PM',
        exercises: 9,
        estimatedCalories: 380,
        actualCalories: 395
    },
    {
        id: '8',
        name: 'Morning Cardio',
        duration: '25 minutes',
        difficulty: 'Intermediate',
        type: 'Cardio',
        status: 'scheduled',
        date: new Date(2025, 6, 25),
        time: '6:30 AM',
        exercises: 5,
        estimatedCalories: 220
    },
    {
        id: '9a',
        name: 'Lunch Break Stretch',
        duration: '20 minutes',
        difficulty: 'Beginner',
        type: 'Flexibility',
        status: 'scheduled',
        date: new Date(2025, 6, 26),
        time: '12:30 PM',
        exercises: 4,
        estimatedCalories: 80
    },
    {
        id: '9b',
        name: 'Pull Day',
        duration: '50 minutes',
        difficulty: 'Intermediate',
        type: 'Strength',
        status: 'scheduled',
        date: new Date(2025, 6, 26),
        time: '7:00 PM',
        exercises: 8,
        estimatedCalories: 340
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/hooks/useWorkouts.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useWorkouts": ()=>useWorkouts
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$data$2f$mockWorkouts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/data/mockWorkouts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$calendarUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/utils/calendarUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/utils/workoutUtils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
const useWorkouts = (currentDate, selectedDate)=>{
    _s();
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useWorkouts.useMemo[today]": ()=>new Date(2025, 6, 22)
    }["useWorkouts.useMemo[today]"], []); // July 22, 2025
    const workouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useWorkouts.useMemo[workouts]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$data$2f$mockWorkouts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockWorkouts"]
    }["useWorkouts.useMemo[workouts]"], []);
    const calendarDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useWorkouts.useMemo[calendarDays]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$calendarUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateCalendarDays"])(currentDate, workouts, selectedDate, today)
    }["useWorkouts.useMemo[calendarDays]"], [
        currentDate,
        selectedDate,
        workouts,
        today
    ]);
    const upcomingWorkouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useWorkouts.useMemo[upcomingWorkouts]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUpcomingWorkouts"])(workouts, today)
    }["useWorkouts.useMemo[upcomingWorkouts]"], [
        workouts,
        today
    ]);
    const groupedUpcoming = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useWorkouts.useMemo[groupedUpcoming]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupWorkoutsByDay"])(upcomingWorkouts)
    }["useWorkouts.useMemo[groupedUpcoming]"], [
        upcomingWorkouts
    ]);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useWorkouts.useMemo[stats]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$utils$2f$workoutUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCalendarStats"])(workouts, today)
    }["useWorkouts.useMemo[stats]"], [
        workouts,
        today
    ]);
    return {
        workouts,
        calendarDays,
        upcomingWorkouts,
        groupedUpcoming,
        stats,
        today
    };
};
_s(useWorkouts, "nZLOyd0e4bMepN+gZWGQFD0h2Xc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/features/calendar/Calendar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/features/calendar/Calendar.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarGrid/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarGrid/CalendarGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarNavigation/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarNavigation/CalendarNavigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarStats/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/CalendarStats/CalendarStats.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/QuickActions/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/QuickActions/QuickActions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/UpcomingWorkouts/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/UpcomingWorkouts/UpcomingWorkouts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutTypeLegend/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/components/WorkoutTypeLegend/WorkoutTypeLegend.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$hooks$2f$useCalendar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/hooks/useCalendar.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$hooks$2f$useWorkouts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/hooks/useWorkouts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
const Calendar = ()=>{
    _s();
    const { currentDate, selectedDate, viewMode, setCurrentDate, setSelectedDate, setViewMode, navigateMonth, navigateToToday } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$hooks$2f$useCalendar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCalendar"])();
    const { calendarDays, groupedUpcoming, stats, today } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$hooks$2f$useWorkouts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkouts"])(currentDate, selectedDate);
    /**
   * Handles day selection in the calendar grid.
   * Fixes the bug where clicking on days from adjacent months would incorrectly
   * set the date to the current month. Now correctly identifies and handles
   * days from previous/next months and navigates to the appropriate month.
   */ const handleDaySelect = (day)=>{
        // Create the selected date using the day's actual date
        let newSelectedDate;
        if (day.isCurrentMonth) {
            // Day is from current month
            newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.date);
        } else {
            // Day is from adjacent month - need to determine which one
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            // Check if this is likely from previous or next month
            // Days with high numbers (>20) at the beginning are from previous month
            // Days with low numbers (<15) at the end are from next month
            const dayIndex = calendarDays.findIndex((d)=>d.date === day.date && d.isCurrentMonth === day.isCurrentMonth);
            if (dayIndex < 7 && day.date > 20) {
                // Previous month
                newSelectedDate = new Date(currentYear, currentMonth - 1, day.date);
                // Also navigate to that month
                const newCurrentDate = new Date(currentDate);
                newCurrentDate.setMonth(newCurrentDate.getMonth() - 1);
                setCurrentDate(newCurrentDate);
            } else if (dayIndex >= 35 && day.date < 15) {
                // Next month
                newSelectedDate = new Date(currentYear, currentMonth + 1, day.date);
                // Also navigate to that month
                const newCurrentDate = new Date(currentDate);
                newCurrentDate.setMonth(newCurrentDate.getMonth() + 1);
                setCurrentDate(newCurrentDate);
            } else {
                // Fallback - assume current month
                newSelectedDate = new Date(currentYear, currentMonth, day.date);
            }
        }
        setSelectedDate(newSelectedDate);
    };
    const handleEditWorkout = (workout)=>{
        // TODO: Implement edit functionality
        // eslint-disable-next-line no-console
        console.log('Edit workout:', workout);
    };
    const handleDeleteWorkout = (workout)=>{
        // TODO: Implement delete functionality
        // eslint-disable-next-line no-console
        console.log('Delete workout:', workout);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: "Calendar"
                    }, void 0, false, {
                        fileName: "[project]/src/features/calendar/Calendar.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                        children: "View and manage your workout schedule"
                    }, void 0, false, {
                        fileName: "[project]/src/features/calendar/Calendar.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/Calendar.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarStats$2f$CalendarStats$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarStats"], {
                stats: stats
            }, void 0, false, {
                fileName: "[project]/src/features/calendar/Calendar.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].calendarSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].calendarCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarNavigation$2f$CalendarNavigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarNavigation"], {
                                    currentDate: currentDate,
                                    viewMode: viewMode,
                                    onNavigateMonth: navigateMonth,
                                    onNavigateToToday: navigateToToday,
                                    onViewModeChange: setViewMode
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/Calendar.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$WorkoutTypeLegend$2f$WorkoutTypeLegend$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkoutTypeLegend"], {}, void 0, false, {
                                    fileName: "[project]/src/features/calendar/Calendar.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$CalendarGrid$2f$CalendarGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CalendarGrid"], {
                                    calendarDays: calendarDays,
                                    onDaySelect: handleDaySelect
                                }, void 0, false, {
                                    fileName: "[project]/src/features/calendar/Calendar.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/calendar/Calendar.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/calendar/Calendar.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$UpcomingWorkouts$2f$UpcomingWorkouts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UpcomingWorkouts"], {
                                groupedUpcoming: groupedUpcoming,
                                today: today,
                                onEditWorkout: handleEditWorkout,
                                onDeleteWorkout: handleDeleteWorkout
                            }, void 0, false, {
                                fileName: "[project]/src/features/calendar/Calendar.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$components$2f$QuickActions$2f$QuickActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickActions"], {}, void 0, false, {
                                fileName: "[project]/src/features/calendar/Calendar.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/calendar/Calendar.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/calendar/Calendar.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/calendar/Calendar.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Calendar, "rVCKQM1vjXjgPVbYmwXG1uHpxgA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$hooks$2f$useCalendar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCalendar"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$hooks$2f$useWorkouts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkouts"]
    ];
});
_c = Calendar;
const __TURBOPACK__default__export__ = Calendar;
var _c;
__turbopack_context__.k.register(_c, "Calendar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(app)/calendar/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$FeatureFlagProtected$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/FeatureFlagProtected.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/calendar/Calendar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$feature$2d$flags$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/feature-flags/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$feature$2d$flags$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/feature-flags/lib/config.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
const CalendarPage = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$FeatureFlagProtected$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        featureName: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$feature$2d$flags$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATURE_FLAGS"].CALENDAR_FEATURE,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$calendar$2f$Calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/app/(app)/calendar/page.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/calendar/page.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CalendarPage;
const __TURBOPACK__default__export__ = CalendarPage;
var _c;
__turbopack_context__.k.register(_c, "CalendarPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_3b2ed38e._.js.map