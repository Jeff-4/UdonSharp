"use strict";(self.webpackChunkclient_sim=self.webpackChunkclient_sim||[]).push([[4884],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(r),b=a,f=u["".concat(s,".").concat(b)]||u[b]||m[b]||l;return r?n.createElement(f,o(o({ref:t},p),{},{components:r})):n.createElement(f,o({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=b;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:a,o[1]=i;for(var c=2;c<l;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},4797:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const l={slug:"release-1.0.0b8",title:"Release 1.0.0b8",date:new Date("2021-09-28T00:00:00.000Z"),authors:["merlin"],tags:["release beta"]},o=void 0,i={permalink:"/news/release-1.0.0b8",source:"@site/news/releases/release-1.0.0b8.md",title:"Release 1.0.0b8",description:"Changelog",date:"2021-09-28T00:00:00.000Z",formattedDate:"September 28, 2021",tags:[{label:"release beta",permalink:"/news/tags/release-beta"}],hasTruncateMarker:!1,authors:[{name:"Merlin",title:"VRChat Developer",url:"https://github.com/merlinvr",imageURL:"https://github.com/merlinvr.png",key:"merlin"}],frontMatter:{slug:"release-1.0.0b8",title:"Release 1.0.0b8",date:"2021-09-28T00:00:00.000Z",authors:["merlin"],tags:["release beta"]},prevItem:{title:"Release 1.0.0b9",permalink:"/news/release-1.0.0b9"},nextItem:{title:"Release 1.0.0b7",permalink:"/news/release-1.0.0b7"}},s={authorsImageUrls:[void 0]},c=[{value:"Changelog",id:"changelog",level:2}],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"changelog"},"Changelog"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Fix missing null check that could cause method redirects to error in some cases, reported by @Ha\xef~")))}m.isMDXComponent=!0}}]);