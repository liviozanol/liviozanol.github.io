"use strict";(self.webpackChunklivio_dump_page=self.webpackChunklivio_dump_page||[]).push([[7337],{3905:function(t,e,r){r.d(e,{Zo:function(){return s},kt:function(){return f}});var n=r(7294);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function l(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}var u=n.createContext({}),c=function(t){var e=n.useContext(u),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},s=function(t){var e=c(t.components);return n.createElement(u.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var r=t.components,a=t.mdxType,o=t.originalType,u=t.parentName,s=l(t,["components","mdxType","originalType","parentName"]),m=c(r),f=a,d=m["".concat(u,".").concat(f)]||m[f]||p[f]||o;return r?n.createElement(d,i(i({ref:e},s),{},{components:r})):n.createElement(d,i({ref:e},s))}));function f(t,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var u in e)hasOwnProperty.call(e,u)&&(l[u]=e[u]);l.originalType=t,l.mdxType="string"==typeof t?t:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},2812:function(t,e,r){r.r(e),r.d(e,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return c},assets:function(){return s},toc:function(){return p},default:function(){return f}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],l={slug:"full-stack-it-automation-part-3-Vault",title:"Full-Stack Automation Part 3 - Vault",authors:["livio"],tags:["automation","harshicorp vault","ansible","gitlab","network automation"]},u=void 0,c={permalink:"/full-stack-it-automation-part-3-Vault",editUrl:"https://github.com/liviozanol/liviozanol.github.io/blog/2021-12-07-automation-3/index.md",source:"@site/blog/2021-12-07-automation-3/index.md",title:"Full-Stack Automation Part 3 - Vault",description:"Harshicorp Vault",date:"2021-12-07T00:00:00.000Z",formattedDate:"December 7, 2021",tags:[{label:"automation",permalink:"/tags/automation"},{label:"harshicorp vault",permalink:"/tags/harshicorp-vault"},{label:"ansible",permalink:"/tags/ansible"},{label:"gitlab",permalink:"/tags/gitlab"},{label:"network automation",permalink:"/tags/network-automation"}],readingTime:2.875,truncated:!0,authors:[{name:"L\xedvio Zanol Puppim",title:"Me",url:"https://github.com/liviozanol",imageURL:"https://github.com/liviozanol.png",key:"livio"}],prevItem:{title:"Full-Stack Automation Part 4 - AWX",permalink:"/full-stack-it-automation-part-4-awx"},nextItem:{title:"Full-Stack Automation Part 2 - Gitlab",permalink:"/full-stack-it-automation-part-2-gitlab"}},s={authorsImageUrls:[void 0]},p=[{value:"Harshicorp Vault",id:"harshicorp-vault",children:[],level:2}],m={toc:p};function f(t){var e=t.components,r=(0,a.Z)(t,i);return(0,o.kt)("wrapper",(0,n.Z)({},m,r,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"harshicorp-vault"},"Harshicorp Vault"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.vaultproject.io/"},"Harshicorp Vault")," is a solution to secure store and get sensitive information. It has a lot of features, like One Time Password, many auth methods, policies, temp tokens, etc."),(0,o.kt)("p",null,"For this solution will be used a basic auth with token (no refreshment) to query vault, simple Key/Value will store keys/passwords. Of course it can and should be improved, like using policies, temp tokens, other auth methods, lease duration, etc. You can (and should) also limit requests for secrets based on IP addresses."))}f.isMDXComponent=!0}}]);