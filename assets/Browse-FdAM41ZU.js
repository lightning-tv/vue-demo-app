import{a as D,c as I,b as M,_ as P,d as V,T as j}from"./styles-_hYwUma5.js";import{r as c,w as S,d as z,a as H,c as y,b as O,e as R,f as A,u as k,g as C,_ as L,h as U,F as w,i as T,j as Y,k as q,o as u,l as x,m as G,n as J}from"./main-B_FQazcE.js";import"./CoreExtension-CvzE2bo0.js";/**
* @vue/runtime-dom v3.4.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const E=Symbol("_vod"),K=Symbol("_vsh"),Q={beforeMount(e,{value:n},{transition:t}){e[E]=e.style.display==="none"?"":e.style.display,t&&n?t.beforeEnter(e):h(e,n)},mounted(e,{value:n},{transition:t}){t&&n&&t.enter(e)},updated(e,{value:n,oldValue:t},{transition:s}){!n!=!t&&(s?n?(s.beforeEnter(e),h(e,!0),s.enter(e)):s.leave(e,()=>{h(e,!1)}):h(e,n))},beforeUnmount(e,{value:n}){h(e,n)}};function h(e,n){e.style.display=n?e[E]:"none",e[K]=!n}function W(e){const[n,t="ms"]=String(e).split(/(ms|s)/i),s={ms:1,s:1e3};return Number(n)*s[t]}function B(e,n){let t=null;const s=typeof n=="number"?n:W(n),r=function(...a){const i=()=>{t=null,e.apply(this,a)};clearTimeout(t),t=setTimeout(i,s),t||e.apply(this,a)};return r.cancel=()=>{clearTimeout(t),t=null},r}const b=new Map,g=new Map;function X(e){return n=>{const t=`/trending/${e}/week?page=${n}`;if(b.has(t))return b.get(t);const s=D.get(t).then(r=>{const a=r.results.filter(_=>!_.adult),i=(g.has(e)?g.get(e):[]).concat(I(a)),l=M(i);return l[l.length-1].length<7?g.set(e,l.pop()):g.delete(e),l});return b.set(t,s),s}}function Z(e){const n=c([]),t=c(0),s=c(!1);return S(t,async()=>{if(s.value)return;const a=await e(t.value);a.length===0?s.value=!0:n.value=[...n.value,...a]}),{pages:n,page:t,setPage:a=>{t.value=a},end:s,setEnd:a=>{s.value=a}}}const ee=["src","item"],oe=z({__name:"Browse",props:["filter"],setup(e){const n=c(null),t=c({}),s=c(0),r=c(!1),a=e,i={width:1920,height:800,y:560,x:0,zIndex:2},l=B(o=>Y.value=o,400),_=B(o=>t.value=o||{},200);S(()=>G.value,(o,f)=>{o&&o.item&&(o.item.backdrop&&l(o.item.backdrop),o.item.heroContent&&_(o.item.heroContent))});function F(){var f;(f=this.children.selected)==null||f.setFocus(),s.value=(this.y||0)*-1+24;let o=p.value.length;this.parent.selected=this.parent.children.indexOf(this),(o===0||this.parent.selected&&this.parent.selected>=o-2)&&(m.value=m.value+1)}const $=q();function N(o,f,v){var d;(d=v.item)!=null&&d.href&&$.push(v.item.href)}let p,m;return H(()=>{const o=Z(X(a.filter||"all"));p=o.pages,m=o.page,m.value=1}),(o,f)=>(u(),y(w,null,[O(R(P,{y:360,x:162,title:t.value.title,description:t.value.description},null,8,["title","description"]),[[Q,r.value]]),A("view",{clipping:"true",style:i},[k(p).length?(u(),C(L,{key:0,ref_key:"column",ref:n,x:150,y:s.value,width:1920,height:1080,autofocus:!0,plinko:!0,onEnter:N},{default:T(()=>[(u(!0),y(w,null,x(k(p),v=>(u(),C(V,{width:1620,height:300,onFocus:F,justifyContent:"spaceBetween"},{default:T(()=>[(u(!0),y(w,null,x(v,d=>(u(),y("node",{style:J(j),src:d.src,item:d},null,12,ee))),256))]),_:2},1024))),256))]),_:1},8,["y"])):U("",!0)])],64))}});export{oe as default};
//# sourceMappingURL=Browse-FdAM41ZU.js.map