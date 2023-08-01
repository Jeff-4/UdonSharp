"use strict";(self.webpackChunkclient_sim=self.webpackChunkclient_sim||[]).push([[2893],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>y});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),h=a,y=u["".concat(l,".").concat(h)]||u[h]||d[h]||i;return n?r.createElement(y,o(o({ref:t},p),{},{components:n})):r.createElement(y,o({ref:t},p))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},1075:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const i={id:"using-vrc-stations",title:"Using VRC Stations",hide_title:!0},o="Using VRC Stations",s={unversionedId:"using-vrc-stations",id:"using-vrc-stations",title:"Using VRC Stations",description:"Making a chair to sit in",source:"@site/docs/Using-VRC-Stations.md",sourceDirName:".",slug:"/using-vrc-stations",permalink:"/using-vrc-stations",draft:!1,editUrl:"https://github.com/vrchat-community/UdonSharp/edit/master/Tools/Docusaurus/docs/Using-VRC-Stations.md",tags:[],version:"current",frontMatter:{id:"using-vrc-stations",title:"Using VRC Stations",hide_title:!0},sidebar:"mainSidebar",previous:{title:"Networking Tips & Tricks",permalink:"/networking-tips-&-tricks"},next:{title:"Exporting to Assembly Files",permalink:"/exporting-to-assembly-files"}},l={},c=[{value:"Making a chair to sit in",id:"making-a-chair-to-sit-in",level:3},{value:"Detecting when a player enters or exits a station",id:"detecting-when-a-player-enters-or-exits-a-station",level:3}],p={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"using-vrc-stations"},"Using VRC Stations"),(0,a.kt)("h3",{id:"making-a-chair-to-sit-in"},"Making a chair to sit in"),(0,a.kt)("p",null,"Making a chair to sit in is fairly straightforward and the ",(0,a.kt)("strong",{parentName:"p"},"VRCChair3")," prefab included with the VRCSDK shows how to setup one. "),(0,a.kt)("p",null,"All you need for a chair is a GameObject with the following components:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"VRC_Station with an entry and exit point set to itself or another transform that designates there the player is rooted to the station"),(0,a.kt)("li",{parentName:"ol"},"A collider, usually with IsTrigger enabled"),(0,a.kt)("li",{parentName:"ol"},"An UdonBehaviour with an Udon program that handles sitting in the station"),(0,a.kt)("li",{parentName:"ol"},"Optionally a mesh attached it that looks like a chair")),(0,a.kt)("p",null,"The VRCSDK comes with a program that handles #3 called ",(0,a.kt)("strong",{parentName:"p"},"StationGraph"),", the equivalent U# code for that graph is:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cs"},"public override void Interact()\n{\n    Networking.LocalPlayer.UseAttachedStation();\n}\n")),(0,a.kt)("h3",{id:"detecting-when-a-player-enters-or-exits-a-station"},"Detecting when a player enters or exits a station"),(0,a.kt)("p",null,"For making vehicles it can be useful to know when a player has entered or exited a station. Udon provides events for when players enter and exit stations for the situation where you want this info. "),(0,a.kt)("p",null,"If you haven't already, make a U# program. Add a way to enter the station if you want, this can be done in the way noted above with the Interact event."),(0,a.kt)("p",null,"In order to receive the enter and exit events, you need to add these events to the behaviour, they can be added by adding this code:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cs"},"public override void OnStationEntered(VRCPlayerApi player)\n{\n}\n\npublic override void OnStationExited(VRCPlayerApi player)\n{\n}\n")),(0,a.kt)("p",null,"Now you can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"player")," variable to check what player has entered/exited the station. You can also use this to check if the player is the local player using ",(0,a.kt)("inlineCode",{parentName:"p"},"player.isLocal"),"."))}d.isMDXComponent=!0}}]);