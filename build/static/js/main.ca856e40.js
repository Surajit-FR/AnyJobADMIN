/*! For license information please see main.ca856e40.js.LICENSE.txt */
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Gp=Ep`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,qp=Ep`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,$p=Pp("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Up} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Gp} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${qp} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Qp=Ep`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Kp=Pp("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Qp} 1s linear infinite;
`,Zp=Ep`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Jp=Ep`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,eg=Pp("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Zp} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Jp} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,tg=Pp("div")`
  position: absolute;
`,ng=Pp("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,rg=Ep`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ag=Pp("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${rg} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ig=e=>{let{toast:t}=e,{icon:n,type:r,iconTheme:a}=t;return void 0!==n?"string"==typeof n?o.createElement(ag,null,n):n:"blank"===r?null:o.createElement(ng,null,o.createElement(Kp,{...a}),"loading"!==r&&o.createElement(tg,null,"error"===r?o.createElement($p,{...a}):o.createElement(eg,{...a})))},og=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,sg=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,lg=Pp("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,cg=Pp("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ug=o.memo((e=>{let{toast:t,position:n,style:r,children:a}=e,i=t.height?((e,t)=>{let n=e.includes("top")?1:-1,[r,a]=Ip()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[og(n),sg(n)];return{animation:t?`${Ep(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${Ep(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||n||"top-center",t.visible):{opacity:0},s=o.createElement(ig,{toast:t}),l=o.createElement(cg,{...t.ariaProps},Lp(t.message,t));return o.createElement(lg,{className:t.className,style:{...i,...r,...t.style}},"function"==typeof a?a({icon:s,message:l}):o.createElement(o.Fragment,null,s,l))}));!function(e,t,n,r){wp.p=t,Dp=e,Tp=n,Np=r}(o.createElement);var dg=e=>{let{id:t,className:n,style:r,onHeightUpdate:a,children:i}=e,s=o.useCallback((e=>{if(e){let n=()=>{let n=e.getBoundingClientRect().height;a(t,n)};n(),new MutationObserver(n).observe(e,{subtree:!0,childList:!0,characterData:!0})}}),[t,a]);return o.createElement("div",{ref:s,className:n,style:r},i)},hg=Ap`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,fg=e=>{let{reverseOrder:t,position:n="top-center",toastOptions:r,gutter:a,children:i,containerStyle:s,containerClassName:l}=e,{toasts:c,handlers:u}=Vp(r);return o.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map((e=>{let r=e.position||n,s=((e,t)=>{let n=e.includes("top"),r=n?{top:0}:{bottom:0},a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Ip()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...r,...a}})(r,u.calculateOffset(e,{reverseOrder:t,gutter:a,defaultPosition:n}));return o.createElement(dg,{id:e.id,key:e.id,onHeightUpdate:u.updateHeight,className:e.visible?hg:"",style:s},"custom"===e.type?Lp(e.message,e):i?i(e):o.createElement(ug,{toast:e,position:r}))})))},pg=Wp;const gg=e=>{let{message:t,type:n,durationTime:r,position:a}=e;const i={duration:r,position:a,style:{color:"#fff",background:"#000"},iconTheme:{primary:"#fff",secondary:"success"===n?"#0f0":"#f00"}};"success"===n?pg.success(t,i):pg.error(t,i)};function mg(e){let{payload:t,type:n}=e;return function*(){try{const r=yield cf(op,null===t||void 0===t?void 0:t.data),a=null===r||void 0===r?void 0:r.data;var e,n;if(null!==a&&void 0!==a&&a.success)t.navigate("/dashboard"),window.localStorage.setItem("accessToken",null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.accessToken),window.localStorage.setItem("refreshToken",null===a||void 0===a||null===(n=a.data)||void 0===n?void 0:n.refreshToken),gg({message:(null===a||void 0===a?void 0:a.message)||"Login Successfully.",type:"success",durationTime:3500,position:"top-center"}),yield sf(Rn(a))}catch(s){var r,a,i,o;yield sf(Fn(null===s||void 0===s||null===(r=s.response)||void 0===r||null===(a=r.data)||void 0===a?void 0:a.message)),gg({message:(null===s||void 0===s||null===(i=s.response)||void 0===i||null===(o=i.data)||void 0===o?void 0:o.message)||"Login failed.",type:"error",durationTime:3500,position:"bottom-center"})}}()}function vg(e){let{payload:t,type:n}=e;return function*(){try{const e=yield cf(sp),n=null===e||void 0===e?void 0:e.data;null!==n&&void 0!==n&&n.success&&(t.navigate("/logout-page"),window.localStorage.removeItem("accessToken"),window.localStorage.removeItem("refreshToken"),gg({message:(null===n||void 0===n?void 0:n.message)||"Logout Successfully.",type:"success",durationTime:3500,position:"top-center"}),yield sf(Hn(n)))}catch(i){var e,n,r,a;yield sf(Yn(null===i||void 0===i||null===(e=i.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message)),gg({message:(null===i||void 0===i||null===(r=i.response)||void 0===r||null===(a=r.data)||void 0===a?void 0:a.message)||"Logout failed.",type:"error",durationTime:3500,position:"bottom-center"})}}()}function*bg(){yield np("authSlice/AuthLoginRequest",mg),yield np("authSlice/AuthLogoutRequest",vg)}function xg(e){let{payload:t,type:n}=e;return function*(){try{const e=yield cf(lp,null===t||void 0===t?void 0:t.data),n=null===e||void 0===e?void 0:e.data;null!==n&&void 0!==n&&n.success&&(yield sf(Ou(n)),null===t||void 0===t||t.reset(),gg({message:(null===n||void 0===n?void 0:n.message)||"New category added.",type:"success",durationTime:3500,position:"top-center"}),yield sf(Yu("categorySlice/getAllCategoryRequest")))}catch(r){var e,n;yield sf(Ru(null===r||void 0===r||null===(e=r.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message))}}()}function yg(e){let{type:t}=e;return function*(){try{const e=yield cf(cp),t=null===e||void 0===e?void 0:e.data;null!==t&&void 0!==t&&t.success&&(yield sf(Wu(t)))}catch(n){var e,t;yield sf(Bu(null===n||void 0===n||null===(e=n.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message))}}()}function wg(e){let{payload:t,type:n}=e;return function*(){try{const e=yield cf(dp,null===t||void 0===t?void 0:t.categoryId),n=null===e||void 0===e?void 0:e.data;null!==n&&void 0!==n&&n.success&&(yield sf(zu(n)))}catch(i){var e,n,r,a;yield sf(Hu(null===i||void 0===i||null===(e=i.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message)),gg({message:null===i||void 0===i||null===(r=i.response)||void 0===r||null===(a=r.data)||void 0===a?void 0:a.message,type:"error",durationTime:3500,position:"top-center"})}}()}function Sg(e){let{payload:t,type:n}=e;return function*(){try{const e=yield cf(hp,null===t||void 0===t?void 0:t.data,null===t||void 0===t?void 0:t.categoryId),n=null===e||void 0===e?void 0:e.data;null!==n&&void 0!==n&&n.success&&(yield sf(Vu(n)),null===t||void 0===t||t.reset(),gg({message:(null===n||void 0===n?void 0:n.message)||"Category updated successfully.",type:"success",durationTime:3500,position:"top-center"}),yield sf(Yu("categorySlice/getAllCategoryRequest")))}catch(r){var e,n;yield sf(Uu(null===r||void 0===r||null===(e=r.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message))}}()}function kg(e){let{payload:t,type:n}=e;return function*(){try{const e=yield cf(up,null===t||void 0===t?void 0:t.categoryId),n=null===e||void 0===e?void 0:e.data;null!==n&&void 0!==n&&n.success&&(yield sf(Wu(n)),gg({message:(null===n||void 0===n?void 0:n.message)||"Category deleted.",type:"success",durationTime:3500,position:"top-center"}),yield sf(Yu("categorySlice/getAllCategoryRequest")))}catch(r){var e,n;yield sf(Bu(null===r||void 0===r||null===(e=r.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message))}}()}function*Cg(){yield np("categorySlice/addCategoryRequest",xg),yield np("categorySlice/getAllCategoryRequest",yg),yield np("categorySlice/getCategoryRequest",wg),yield np("categorySlice/updateCategoryRequest",Sg),yield np("categorySlice/deleteCategoryRequest",kg)}function Ag(e){let{payload:t,type:n}=e;return function*(){try{const e=yield cf(fp,null===t||void 0===t?void 0:t.data),n=null===e||void 0===e?void 0:e.data;null!==n&&void 0!==n&&n.success&&(yield sf(ld(n)),null===t||void 0===t||t.reset(),gg({message:(null===n||void 0===n?void 0:n.message)||"New sub category added.",type:"success",durationTime:3500,position:"top-center"}))}catch(i){var e,n,r,a;yield sf(cd(null===i||void 0===i||null===(e=i.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message)),gg({message:null===i||void 0===i||null===(r=i.response)||void 0===r||null===(a=r.data)||void 0===a?void 0:a.message,type:"error",durationTime:3500,position:"top-center"})}}()}function Dg(e){let{payload:t,type:n}=e;return function*(){try{const e=yield cf(pp,t),n=null===e||void 0===e?void 0:e.data;null!==n&&void 0!==n&&n.success&&(yield sf(pd(n)))}catch(r){var e,n;yield sf(gd(null===r||void 0===r||null===(e=r.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message))}}()}function*Tg(){yield np("subCategorySlice/addSubCategoryRequest",Ag),yield np("subCategorySlice/getAllSubCategoryRequest",Dg)}function Ng(e){let{payload:t,type:n}=e;return function*(){try{const e=yield cf(gp,t.subCategoryId,{categoryId:t.categoryId}),n=null===e||void 0===e?void 0:e.data;null!==n&&void 0!==n&&n.success&&(yield sf(Ld(n)))}catch(i){var e,n,r,a;yield sf(Md(null===i||void 0===i||null===(e=i.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message)),gg({message:null===i||void 0===i||null===(r=i.response)||void 0===r||null===(a=r.data)||void 0===a?void 0:a.message,type:"error",durationTime:3500,position:"top-center"})}}()}function*Eg(){yield np("questionSlice/getAllQuestionRequest",Ng)}const Pg=Qf(),Lg=[Pg],Mg=function(e){const t=function(e){const{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:a=!0}=e??{};let i=new xn;return t&&("boolean"===typeof t?i.push(At):i.push(Dt(t.extraArgument))),i},{reducer:n,middleware:r,devTools:a=!0,preloadedState:i,enhancers:o}=e||{};let s,l;if("function"===typeof n)s=n;else{if(!yt(n))throw new Error(_n(1));s=St(n)}l="function"===typeof r?r(t):t();let c=kt;a&&(c=vn({trace:!1,..."object"===typeof a&&a}));const u=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return e=>(n,r)=>{const a=e(n,r);let i=()=>{throw new Error(mt(15))};const o={getState:a.getState,dispatch:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return i(e,...n)}},s=t.map((e=>e(o)));return i=kt(...s)(a.dispatch),{...a,dispatch:i}}}(...l),d=An(u);return wt(s,i,c(..."function"===typeof o?o(d):d()))}({reducer:{authSlice:Wn,categorySlice:Qu,subCategorySlice:Sd,questionSlice:Id},middleware:e=>e({serializableCheck:!1}).concat(Lg)});Pg.run((function*(){yield function(e){var t=af(Vh,e);return t.combinator=!0,t}([bg(),Cg(),Tg(),Eg()])}));const Ig=()=>{const e=re();return(0,o.useEffect)((()=>{e("/dashboard")}),[e]),(0,r.jsx)(r.Fragment,{})},_g=()=>{const e=window.localStorage.getItem("accessToken"),t=window.localStorage.getItem("refreshToken"),n=te();return(0,r.jsx)(r.Fragment,{children:e||t?(0,r.jsx)(xe,{}):(0,r.jsx)(be,{to:"/login",state:{from:n},replace:!0})})},jg=e=>{let{children:t}=e;const n=window.localStorage.getItem("accessToken"),a=window.localStorage.getItem("refreshToken"),i=te();var o,s;return n||a?(0,r.jsx)(be,{to:(null===(o=i.state)||void 0===o||null===(s=o.from)||void 0===s?void 0:s.pathname)||"/dashboard",state:{from:i},replace:!0}):(0,r.jsx)(r.Fragment,{children:t})},Og={"data-layout-mode":"fluid","data-bs-theme":"light","data-menu-color":"light","data-topbar-color":"light","data-layout-position":"fixed","data-sidenav-size":"default","data-sidenav-user":"flase"};(()=>{const e=JSON.parse(sessionStorage.getItem("theme-settings")||"{}");Object.keys(e).forEach((t=>{const n=e[t];void 0!==n&&ze(t,n)}));const t=sessionStorage.getItem("html-classes");t&&(document.documentElement.className=t)})();const Rg=JSON.parse(sessionStorage.getItem("theme-settings")||"{}");Object.keys(Og).forEach((e=>{const t=e;void 0===Rg[t]&&(Rg[t]=Og[t],sessionStorage.setItem("theme-settings",JSON.stringify(Rg))),document.documentElement.setAttribute(t,Rg[t])}));t.createRoot(document.getElementById("root")).render((0,r.jsxs)(ut,{store:Mg,children:[(0,r.jsx)(Ne,{children:(0,r.jsxs)(Se,{children:[(0,r.jsx)(ye,{path:"/",element:(0,r.jsx)(Ig,{})}),(0,r.jsx)(ye,{element:(0,r.jsx)(_g,{}),children:(0,r.jsx)(ye,{path:"*",element:(0,r.jsx)(Bd,{})})}),(0,r.jsx)(ye,{path:"/login",element:(0,r.jsx)(jg,{children:(0,r.jsx)(qd,{})})}),(0,r.jsx)(ye,{path:"/recovery-password",element:(0,r.jsx)($d,{})}),(0,r.jsx)(ye,{path:"/logout-page",element:(0,r.jsx)(Qd,{})}),(0,r.jsx)(ye,{path:"/maintenance",element:(0,r.jsx)(Kd,{})})]})}),(0,r.jsx)(fg,{position:"top-center",reverseOrder:!1,gutter:10})]})),Xd()})()})();
//# sourceMappingURL=main.ca856e40.js.map