import React from "react"

const ARR = ["Tab 1", "Tab 2", "Tab 3", "Tab 4"]

function render(ref) {
    let arr = ref.props.arr || ref.props.static
    if (!Array.isArray(arr)) arr = ARR
    return <React.Fragment>
        <ol>{arr.map((a, i) => 
            <li onClick={e => click(ref, e.currentTarget, arr, a, i)} key={i}>{a}</li>
        )}</ol>
        <div/>
    </React.Fragment>
}

function click(ref, tab, arr, $x, $index) {
    const cur = ref.container.querySelector(".zp128cur")
    if (cur) cur.classList.remove("zp128cur")
    tab.classList.add("zp128cur")
    const ink = ref.container.lastChild
    ink.style.transform = "translate3d(" + $index * 100 + "%, 0px, 0px)"
    ink.style.width = 100 / arr.length + "%"
    if (ref.props.onClick) ref.exc(ref.props.onClick, { ...ref.ctx, $x, $index }, () => ref.exc("render()"))
}

function onInit({ container, props }) {
    setTimeout(() => {
        const el = container.firstChild.children[props.initTab || 0]
        el && el.click()
    }, 200)
}

const css = `
.zp128 {
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #e8e8e8;
    transition: transform .3s cubic-bezier(.645, .045, .355, 1);
}
.zp128 ol {
    margin: 0;
    padding: 0;
    list-style: none;
    white-space: nowrap;
    display: flex;
    text-align: center;
}
.zp128 li {
    position: relative;
    flex: 1;
    padding: 8px;
    cursor: pointer;
    transition: color .3s cubic-bezier(.645, .045, .355, 1);
}
.zp128cur {
    color: #1890ff;
}
.zp128 svg {
    margin: 0 8px;
}
.zp128 div {
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 1px;
    background-color: #1890ff;
    transform-origin: 0 0;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transform: translate3d(0px, 0px, 0px);
}
@media (hover: hover) {
    .zp128 li:hover {
        color: #40a9ff;
    }
}`

$plugin({
    id: "zp128",
    props: [{
        prop: "arr",
        type: "text",
        label: "数组表达式",
        ph: "需在数据组件内，使用括弧，优先于静态数组"
    }, {
        prop: "static",
        type: "json",
        label: "静态数组"
    }, {
        prop: "initTab",
        type: "text",
        label: "初始标签下标",
        ph: "0"
    }, {
        prop: "onClick",
        type: "exp",
        label: "onClick"
    }],
    render,
    onInit,
    css
})