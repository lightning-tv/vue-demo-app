import{r as l,w as z,o as J,d as F,c as u,a as S,t as N,b as c,e as v,h as j,f as P,g as V,u as d,i as W,n as H,j as B,k as G,l as T,_ as O,m as Z,F as b,p as U,q as A,s as q,v as R}from"./main-NfD9OEdw.js";import"./CoreExtension-CvzE2bo0.js";const K="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDE4YjEwMTA0YjdiZTlkNjFiMWYwYjVlMGEwNzM2OCIsInN1YiI6IjYwZTVjMTdlNGNhNjc2MDA3NTA4Njc3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_nqH9kd-bhhWzeVsTDPYhHnsUaNAuyAa6YATmKHqsA",Q="https://api.themoviedb.org/3";let M,Y;const X="w185",ee={headers:{"Content-Type":"application/json",Authorization:"Bearer "+K}};function x(t,e=X){return Y+e+t}function te(t,e={}){return M?I(t,e):E().then(()=>I(t,e))}function I(t,e={}){return fetch(Q+t,{...ee,...e}).then(n=>n.json())}function E(){return I("/configuration").then(t=>{var e;return M=t,Y=(e=t.images)==null?void 0:e.secure_base_url,t})}const ne={get:te,loadConfig:E};function oe(t,e){return t.length>e?t.substring(0,e-3)+"...":t}function se(t,e=7){const n=[];for(let o=0,r=t.length;o<r;o+=e)n.push(t.slice(o,o+e));return n}function ie(t=[]){return t.map(e=>({src:x(e.poster_path||e.profile_path),tileSrc:x(e.backdrop_path||e.profile_path,"w300"),backdrop:x(e.backdrop_path,"w1280"),href:`/entity/${e.media_type||"people"}/${e.id}`,shortTitle:oe(e.title||e.name,30),title:e.title||e.name,data:e,entityInfo:{type:e.media_type||"people",id:e.id},heroContent:{title:e.title||e.name,description:e.overview}}))}const k=new Map,y=new Map;function re(t){return e=>{const n=`/trending/${t}/week?page=${e}`;if(k.has(n))return k.get(n);const o=ne.get(n).then(r=>{const i=r.results.filter(_=>!_.adult),h=(y.has(t)?y.get(t):[]).concat(ie(i)),a=se(h);return a[a.length-1].length<7?y.set(t,a.pop()):y.delete(t),a});return k.set(n,o),o}}function ce(t){const e=l([]),n=l(1),o=l(!1),r=async()=>{if(o.value)return;const i=await t(n.value);i.length===0?o.value=!0:e.value=[...e.value,...i]};return z(n,r),J(r),{pages:e,page:n,setPage:i=>{n.value=i},end:o,setEnd:i=>{o.value=i}}}const C=1200,ae=F({__name:"ContentBlock",props:{title:String,description:String},setup(t){const e={display:"flex",flexDirection:"column",flexBoundary:"fixed",width:C,height:220,gap:16},n={fontSize:50,fontFamily:"Roboto",fontWeight:700,maxLines:1,width:C,contain:"width"},o={fontSize:28,fontFamily:"Roboto",fontWeight:400,lineHeight:32,width:C,maxLines:3,contain:"width"};return(r,i)=>(c(),u("node",{id:"contentBlock",style:e},[S("text",{style:n},N(t.title),1),S("text",{style:o},N(t.description),1)]))}}),le=["onLeft","onRight","forwardFocus","selected","onSelectedChanged"],ue=F({__name:"Row",props:{selected:{type:Number,default:0},scrollIndex:Number,onLeft:Function,onRight:Function,onLayout:Function,onSelectedChanged:Function,scroll:String,style:Object},setup(t){const e=t,n=v(e.onLeft,j("left")),o=v(e.onRight,j("right")),r=v(e.onSelectedChanged,e.scroll!=="none"?P(e.x):void 0),i={display:"flex",flexBoundary:"fixed",flexDirection:"row",gap:30,transition:{x:{easing:"ease-in-out",duration:250}}};return(h,a)=>(c(),u("node",{onLeft:d(n),onRight:d(o),forwardFocus:d(W),selected:e.selected,onSelectedChanged:d(r),style:H([i,e.style])},[V(h.$slots,"default")],44,le))}}),de=["src","item"],pe=F({__name:"Browse",setup(t){const e=l(null),n=l(""),o=l({}),r=l(0),i={width:1920,height:800,y:560,x:0,zIndex:2},h={borderRadius:16,width:185,height:278,scale:1,zIndex:2,transition:{scale:{duration:250,easing:"ease-in-out"}},border:{width:0,color:0},focus:{scale:1.1,border:{color:4294967142,width:8}}},a=B(s=>n.value=s,400),_=B(s=>o.value=s||{},200);z(()=>q.value,(s,f)=>{s&&s.item&&(s.item.backdrop&&a(s.item.backdrop),s.item.heroContent&&_(s.item.heroContent))});function L(){var f;(f=this.children.selected)==null||f.setFocus(),r.value=(this.y||0)*-1+24;let s=w.value.length;this.parent.selected=this.parent.children.indexOf(this),(s===0||this.parent.selected&&this.parent.selected>=s-2)&&(m.value=m.value+1)}const $=U();function D(s,f,g){var p;(p=g.item)!=null&&p.href&&$.push(g.item.href)}const{pages:w,page:m}=ce(re("all"));return m.value=1,(s,f)=>(c(),u(b,null,[G(ae,{y:360,x:162,title:o.value.title,description:o.value.description},null,8,["title","description"]),S("view",{clipping:"true",style:i},[d(w).length?(c(),T(O,{key:0,ref_key:"column",ref:e,x:150,y:r.value,width:1920,height:1080,autofocus:!0,plinko:!0,onEnter:D},{default:A(()=>[(c(!0),u(b,null,R(d(w),g=>(c(),T(ue,{width:1620,height:300,onFocus:L,justifyContent:"spaceBetween"},{default:A(()=>[(c(!0),u(b,null,R(g,p=>(c(),u("node",{style:h,src:p.src,item:p},null,8,de))),256))]),_:2},1024))),256))]),_:1},8,["y"])):Z("",!0)])],64))}});export{pe as default};
//# sourceMappingURL=Browse-CLfkLSxL.js.map
