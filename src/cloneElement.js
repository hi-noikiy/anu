import { createElement, CurrentOwner } from "./createElement";

export function cloneElement(vnode, props) {
    if (!vnode.vtype) {
        return Object.assign({}, vnode);
    }
    let owner = vnode._owner,
        lastOwn = CurrentOwner.cur,
        old = vnode.props,
        configs = {  };
    if (props) {
        Object.assign(configs, old, props);
        configs.key = props.key !== void 666 ? props.key :vnode.key;
        if(props.ref !== void 666){
            configs.ref = props.ref;
            owner = lastOwn;
        }else{
            configs.ref = vnode.ref;
        }
    }else{
        configs = old;
    }
    CurrentOwner.cur = owner;

    let args = [].slice.call(arguments, 0),
        argsLength = args.length;
    args[0] = vnode.type;
    args[1] = configs;
    if (argsLength === 2 && configs.children) {
        args.push(configs.children);
    }
    let ret = createElement.apply(null, args);
    CurrentOwner.cur = lastOwn;
    return ret;
}
