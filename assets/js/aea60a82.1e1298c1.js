"use strict";(self.webpackChunkclient_sim=self.webpackChunkclient_sim||[]).push([[9626],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>b});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(r),d=a,b=c["".concat(s,".").concat(d)]||c[d]||m[d]||o;return r?n.createElement(b,i(i({ref:t},u),{},{components:r})):n.createElement(b,i({ref:t},u))}));function b(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},8592:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={slug:"release-1.0.0b9",title:"Release 1.0.0b9",date:new Date("2022-03-04T00:00:00.000Z"),authors:["merlin"],tags:["release beta"]},i=void 0,l={permalink:"/news/release-1.0.0b9",source:"@site/news/releases/release-1.0.0b9.md",title:"Release 1.0.0b9",description:"Changelog",date:"2022-03-04T00:00:00.000Z",formattedDate:"March 4, 2022",tags:[{label:"release beta",permalink:"/news/tags/release-beta"}],hasTruncateMarker:!1,authors:[{name:"Merlin",title:"VRChat Developer",url:"https://github.com/merlinvr",imageURL:"https://github.com/merlinvr.png",key:"merlin"}],frontMatter:{slug:"release-1.0.0b9",title:"Release 1.0.0b9",date:"2022-03-04T00:00:00.000Z",authors:["merlin"],tags:["release beta"]},prevItem:{title:"Release 1.0.0b10",permalink:"/news/release-1.0.0b10"},nextItem:{title:"Release 1.0.0b8",permalink:"/news/release-1.0.0b8"}},s={authorsImageUrls:[void 0]},p=[{value:"Changelog",id:"changelog",level:2}],u={toc:p},c="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(c,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"changelog"},"Changelog"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Switch to using Unity C# scripts to store U# script data which has the following benefits for U# behaviours:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Support for prefab scene deltas"),(0,a.kt)("li",{parentName:"ul"},"Support for prefab nesting"),(0,a.kt)("li",{parentName:"ul"},"Support for prefab variants"),(0,a.kt)("li",{parentName:"ul"},"Multi-edit support"),(0,a.kt)("li",{parentName:"ul"},"Editor script dirtying behavior makes more sense"),(0,a.kt)("li",{parentName:"ul"},"Custom inspectors and editor scripting now work on prefab assets properly"))),(0,a.kt)("li",{parentName:"ul"},"Add upgrade path for converting old projects to new data format",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Does not support upgrading nested prefabs and prefab variants since they were not supported prior to 1.0.0b9"))),(0,a.kt)("li",{parentName:"ul"},"Improvements to assembly reload performance"),(0,a.kt)("li",{parentName:"ul"},"Inspector enum support"),(0,a.kt)("li",{parentName:"ul"},"Fixes for struct value write back, reported by @Hai and @Jordo"),(0,a.kt)("li",{parentName:"ul"},"Add InteractionText property to UdonSharpBehaviours"),(0,a.kt)("li",{parentName:"ul"},"Fixes for some methods not being found ex System.Type.Name, contributed by @bd_"),(0,a.kt)("li",{parentName:"ul"},"Remove redundant COW value dirty on this, contributed by @bd_"),(0,a.kt)("li",{parentName:"ul"},"Catch unhandled exceptions from compiler and rethrow them as unhandled exceptions to avoid Tasks silencing exceptions"),(0,a.kt)("li",{parentName:"ul"},"Fix double brackets not being unexcaped on interpolated strings that weren't preforming any interpolation, contributed by @ureishi"),(0,a.kt)("li",{parentName:"ul"},"'Expected' exceptions used to interrupt compilation now do not dump entire callstack to debug log"),(0,a.kt)("li",{parentName:"ul"},"Enable runtime exception watching by default"),(0,a.kt)("li",{parentName:"ul"},"Add checks for Unity C# compile errors before initiating a U# compile to avoid confusion"),(0,a.kt)("li",{parentName:"ul"},"Add more validation for invalid uses of program assets and script files"),(0,a.kt)("li",{parentName:"ul"},"Remove redundant script dirty ignore since it seems like something else was causing the dirtying and is no longer doing it"),(0,a.kt)("li",{parentName:"ul"},"Obsolete many editor APIs for editor scripting that are no longer needed"),(0,a.kt)("li",{parentName:"ul"},"Obsolete old overloads for station and player join events -- now throws compile error")))}m.isMDXComponent=!0}}]);