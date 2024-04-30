import { defineComponent as k, createVNode as u, reactive as O, Fragment as q } from "vue";
function w(t) {
  return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
}
function P(t) {
  return w(t) === "object";
}
function V(t) {
  return w(t) === "array";
}
const j = /* @__PURE__ */ k({
  render() {
    return u("svg", {
      viewBox: "0 0 1792 1792",
      focusable: "false",
      "data-icon": "icon-minus",
      width: "1em",
      height: "1em",
      fill: "currentColor",
      "aria-hidden": "true"
    }, [u("path", {
      d: "M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"
    }, null)]);
  }
}), z = /* @__PURE__ */ k({
  render() {
    return u("svg", {
      viewBox: "0 0 1792 1792",
      focusable: "false",
      "data-icon": "icon-plus",
      width: "1em",
      height: "1em",
      fill: "currentColor",
      "aria-hidden": "true"
    }, [u("path", {
      d: "M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"
    }, null)]);
  }
});
const v = /* @__PURE__ */ k({
  name: "TreeWrap",
  props: {
    json: {
      required: !0,
      type: Object,
      default: () => ({})
    },
    deep: {
      type: Number,
      default: 4
    },
    showLength: {
      type: Boolean,
      default: !0
    },
    showLine: {
      type: Boolean,
      default: !0
    },
    showIcon: {
      type: Boolean,
      default: !0
    },
    showDoubleQuotes: {
      type: Boolean,
      default: !0
    },
    rootPath: {
      type: String,
      default: "root"
    },
    collapsedOnClickBrackets: {
      type: Boolean,
      default: !0
    },
    renderNodeKey: {
      type: Function
    },
    renderNodeValue: {
      type: Function
    },
    nodeClick: {
      type: Function
    }
  },
  setup(t, {
    emit: D,
    slots: K
  }) {
    const h = O({
      // 关闭状态的路径
      closedPath: {}
    }), I = (e) => t.deep ? e.split("[").length >= t.deep : !1, C = (e, n) => {
      t.nodeClick && t.nodeClick({
        isClosed: e,
        path: n
      }), h.closedPath = {
        ...h.closedPath,
        [n]: !e
      };
    }, b = (e, n) => u("span", {
      class: "icon-wrap",
      onClick: () => C(e, n)
    }, [e ? u(z, null, null) : u(j, null, null)]), g = (e) => u("span", {
      class: ["node-key"]
    }, [`${t.showDoubleQuotes && '"'}${e}${t.showDoubleQuotes && '"'}:  `]), L = ({
      key: e,
      data: n,
      level: o,
      showComma: l,
      path: r,
      itemsLen: c,
      isClosed: s,
      canClick: d
    }) => t.renderNodeKey ? t.renderNodeKey({
      node: {
        key: e,
        data: n,
        level: o,
        showComma: l,
        path: r,
        itemsLen: c,
        isClosed: s,
        canClick: d
      },
      defaultKey: g(e)
    }) : g(e), $ = (e) => (e === null ? e = "null" : e === void 0 && (e = "undefined"), w(e) === "string" ? `${m(e) ? "" : t.showDoubleQuotes && '"'}${e}${m(e) ? "" : t.showDoubleQuotes && '"'}` : e + ""), N = ({
      key: e,
      data: n,
      level: o,
      showComma: l,
      path: r,
      itemsLen: c,
      isClosed: s,
      canClick: d
    }) => t.renderNodeValue ? t.renderNodeValue({
      node: {
        key: e,
        data: n,
        level: o,
        showComma: l,
        path: r,
        itemsLen: c,
        isClosed: s,
        canClick: d
      },
      defaultValue: $(n)
    }) : $(n), m = (e) => ["{", "}", "[", "]", "[ . . . ]", "{ . . . }"].includes(e), a = ({
      key: e,
      data: n,
      level: o,
      showComma: l,
      path: r,
      itemsLen: c,
      isClosed: s,
      canClick: d
    }) => u("div", {
      class: ["item-wrap", o > 0 && "need-indent", t.collapsedOnClickBrackets && d && "item-wrap-click"],
      onClick: () => t.collapsedOnClickBrackets && d && C(s, r)
    }, [e && L({
      key: e,
      data: n,
      level: o,
      showComma: l,
      path: r,
      itemsLen: c,
      isClosed: s,
      canClick: d
    }), u("span", {
      class: ["node-content", m(n) ? "" : w(n)]
    }, [N({
      key: e,
      data: n,
      level: o,
      showComma: l,
      path: r,
      itemsLen: c,
      isClosed: s,
      canClick: d
    })]), l && u("span", null, [","]), t.showLength && !!c && u("span", {
      class: "items-length"
    }, [`${c} items`])]), y = ({
      // 键值
      key: e = "",
      // json数据
      data: n,
      // 层级
      level: o = 0,
      // 是否显示逗号
      showComma: l = !1,
      // 路径
      path: r = t.rootPath || "root"
    }) => {
      const c = h.closedPath[r] === void 0 ? I(r) : h.closedPath[r];
      let s = 0;
      if (V(n)) {
        const d = n.length;
        return c && (s = d), u("div", {
          class: ["content-wrap", t.showLine && o > 0 && "need-border", o > 1 && "need-indent"]
        }, [t.showIcon && b(c, r), c ? u(q, null, [a({
          key: e,
          data: "[ . . . ]",
          level: o,
          showComma: !0,
          path: r,
          itemsLen: s,
          isClosed: c,
          canClick: !0
        })]) : u(q, null, [a({
          key: e,
          data: "[",
          level: o,
          showComma: !1,
          path: r,
          itemsLen: s,
          isClosed: c,
          canClick: !0
        }), n.map((i, f) => y({
          key: "",
          data: i,
          level: o + 1,
          showComma: f !== d - 1,
          path: `${r}[${f}]`
        })), a({
          key: "",
          data: "]",
          level: o,
          showComma: l,
          path: r,
          itemsLen: s,
          isClosed: c,
          canClick: !1
        })])]);
      }
      if (P(n)) {
        const d = Object.keys(n), i = d.length;
        return c && (s = i), u("div", {
          class: ["content-wrap", t.showLine && o > 0 && "need-border", o > 1 && "need-indent"]
        }, [t.showIcon && b(c, r), c ? u(q, null, [a({
          key: e,
          data: "{ . . . }",
          level: o,
          showComma: !0,
          path: r,
          itemsLen: i,
          isClosed: c,
          canClick: !0
        })]) : u(q, null, [a({
          key: e,
          data: "{",
          level: o,
          showComma: !1,
          path: r,
          itemsLen: s,
          isClosed: c,
          canClick: !0
        }), d.map((f, B) => y({
          key: f,
          data: n[f],
          level: o + 1,
          showComma: B !== i - 1,
          path: `${r}[${B}]`
        })), a({
          key: "",
          data: "}",
          level: o,
          showComma: l,
          path: r,
          itemsLen: s,
          isClosed: c,
          canClick: !1
        })])]);
      }
      return u("div", {
        class: ["content-wrap", t.showLine && o > 0 && "need-border", o > 1 && "need-indent"]
      }, [a({
        key: e,
        data: n,
        level: o,
        showComma: l,
        path: r,
        itemsLen: s,
        isClosed: c,
        canClick: !1
      })]);
    };
    return () => u("div", {
      class: "tree-node-wrap"
    }, [y({
      data: t.json
    })]);
  }
});
export {
  v as default
};
