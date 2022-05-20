"use strict";(self.webpackChunklivio_dump_page=self.webpackChunklivio_dump_page||[]).push([[7373],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return m}});var i=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=i.createContext({}),p=function(e){var t=i.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(a),m=n,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||r;return a?i.createElement(f,o(o({ref:t},c),{},{components:a})):i.createElement(f,o({ref:t},c))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,o=new Array(r);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var p=2;p<r;p++)o[p]=a[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,a)}d.displayName="MDXCreateElement"},8401:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},assets:function(){return c},toc:function(){return u},default:function(){return m}});var i=a(7462),n=a(3366),r=(a(7294),a(3905)),o=["components"],l={slug:"vmware-vds-traffic-filter",title:'Using vSphere Distributed Switch (VDS) for stateless "traffic filtering" (or ACL)',authors:["livio"],tags:["vmware vds","nsx-t","cloud infrastructure","security","acl","traffic filter"]},s=void 0,p={permalink:"/vmware-vds-traffic-filter",editUrl:"https://github.com/liviozanol/liviozanol.github.io/blog/2022-04-07-vmware-vds-traffic-filter/index.md",source:"@site/blog/2022-04-07-vmware-vds-traffic-filter/index.md",title:'Using vSphere Distributed Switch (VDS) for stateless "traffic filtering" (or ACL)',description:"Intro",date:"2022-04-07T00:00:00.000Z",formattedDate:"April 7, 2022",tags:[{label:"vmware vds",permalink:"/tags/vmware-vds"},{label:"nsx-t",permalink:"/tags/nsx-t"},{label:"cloud infrastructure",permalink:"/tags/cloud-infrastructure"},{label:"security",permalink:"/tags/security"},{label:"acl",permalink:"/tags/acl"},{label:"traffic filter",permalink:"/tags/traffic-filter"}],readingTime:6.225,truncated:!0,authors:[{name:"L\xedvio Zanol Puppim",title:"Me",url:"https://github.com/liviozanol",imageURL:"https://github.com/liviozanol.png",key:"livio"}],nextItem:{title:"Full-Stack Automation Part 11 - Conclusions",permalink:"/full-stack-it-automation-part-11"}},c={authorsImageUrls:[void 0]},u=[{value:"Intro",id:"intro",children:[],level:2},{value:"vSphere API",id:"vsphere-api",children:[],level:2},{value:"Python Scripts",id:"python-scripts",children:[],level:2},{value:"Conclusion",id:"conclusion",children:[],level:2}],d={toc:u};function m(e){var t=e.components,l=(0,n.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},d,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"intro"},"Intro"),(0,r.kt)("p",null,"VMWare has a nice product called ",(0,r.kt)("a",{parentName:"p",href:"https://www.vmware.com/br/products/nsx.html"},"NSX-T")," which allows you to build a sort of a cloud provider network infrastructure for your virtualized environment \xa0(and K8s). It has network segmentation, routing, NAT, stateful firewall, IDS, traffic inspection, etc."),(0,r.kt)("p",null,"What if you already have a good and working cloud-like architecture and just want to insert some simple ACLs directly on the virtualization layer to outsource traffic filtering directly to the hypervisor, and do not want fancy things like firewall, NAT, IDS, etc. ?"),(0,r.kt)("p",null,"vSwitch doesn't support this; NSX-T does, but it is expensive... What about VDS???"),(0,r.kt)("p",null,"Python scripts used available at git repository: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/liviozanol/vmware_vds_traffic_filte"},"https://github.com/liviozanol/vmware_vds_traffic_filte")),(0,r.kt)("p",null,"Well, using vCenter web UI (you can use this ",(0,r.kt)("a",{parentName:"p",href:"https://www.vmwarelearningplatform.com/HOL/console/lab/HOL-2211-01-SDC-HOL"},"Hands-on Lab")," to check), if you navigate to the VDS itself, and select a portgroup and click configure, you will see that it has some sort of Traffic Filtering. So, despite this almost hidden function (poor UI design in my opinion) it CAN filter traffic."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Port Group on vSphere",src:a(4954).Z})),(0,r.kt)("p",null,"If you snoop the web interface a little bit you will \xa0see that this looks like a normal network equipment ACL using the classic 5 tuples (src IP, dst IP, L4 protocol, src port, dst port) and input/output direction to apply the filter."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Creating rules on web UI",src:a(6351).Z})),(0,r.kt)("p",null,"Ok... So, it may be possible to apply filters, but this UI is not helpful at all to create and manage a bunch of ACLs (nor to give end-users permission to apply it). Lets try with the API."),(0,r.kt)("h2",{id:"vsphere-api"},"vSphere API"),(0,r.kt)("p",null,'vCenter has a "new" REST API, launched since version 6.5. But if you look at their ',(0,r.kt)("a",{parentName:"p",href:"https://developer.vmware.com/apis/vsphere-automation/latest/vcenter"},"documentation")," you will see that it is ",(0,r.kt)("strong",{parentName:"p"},"very")," limited and still needs to be involved to be useful for automation. Hey VMWARE, come on, prioritize vSphere REST API on your product backlog... Oh wait! Maybe you don't want to for some reason?"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},(0,r.kt)("em",{parentName:"p"},"As a side note, NSX-T has a pretty complete, good structured and ",(0,r.kt)("a",{parentName:"em",href:"https://developer.vmware.com/apis/976"},"well documented REST API"))))),(0,r.kt)("p",null,'But vSphere also has another "Web Service API" that can be accessed ',(0,r.kt)("a",{parentName:"p",href:"https://developer.vmware.com/apis/1192/vsphere"},"here"),". It is very complete and you will be able to do almost anything with it, and in fact, it is used by ansible VMWare modules. The documentation is not as good as NSX-T and it is not REST, but it is something."),(0,r.kt)("p",null,'If you search for "DvsTraffic" on Data Object Types, you will find some interesting things. Let\'s check ',(0,r.kt)("a",{parentName:"p",href:"https://vdc-download.vmware.com/vmwb-repository/dcr-public/bf660c0a-f060-46e8-a94d-4b5e6ffc77ad/208bc706-e281-49b6-a0ce-b402ec19ef82/SDK/vsphere-ws/docs/ReferenceGuide/vim.dvs.DistributedVirtualPort.TrafficFilterConfig.html"},(0,r.kt)("inlineCode",{parentName:"a"},"DVSTrafficFilterConfig")),": "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"You will see that it supports one property called ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsTrafficRuleset"),";"),(0,r.kt)("li",{parentName:"ul"},"Digging in ",(0,r.kt)("a",{parentName:"li",href:"https://vdc-download.vmware.com/vmwb-repository/dcr-public/bf660c0a-f060-46e8-a94d-4b5e6ffc77ad/208bc706-e281-49b6-a0ce-b402ec19ef82/SDK/vsphere-ws/docs/ReferenceGuide/vim.dvs.TrafficRuleset.html"},"DvsTrafficRuleset"),", it supports ",(0,r.kt)("inlineCode",{parentName:"li"},"enabled"),", some other properties and ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsTrafficRule")," object. Let's go deeper;"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://vdc-download.vmware.com/vmwb-repository/dcr-public/bf660c0a-f060-46e8-a94d-4b5e6ffc77ad/208bc706-e281-49b6-a0ce-b402ec19ef82/SDK/vsphere-ws/docs/ReferenceGuide/vim.dvs.TrafficRule.html"},"DvsTrafficRule")," supports ",(0,r.kt)("inlineCode",{parentName:"li"},"action")," which could be used to permit or deny traffic on match (besides other actions). Also supports ",(0,r.kt)("inlineCode",{parentName:"li"},"sequence"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"direction")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"qualifier")," fields. As stated on the page about qualifier:\n\xa0 \xa0 - List of Network rule qualifiers. 'AND' of this array of network rule qualifiers is applied as one network traffic rule. If the TrafficRule belongs to DvsFilterPolicy : There can be a maximum of 1 ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsIpNetworkRuleQualifier"),", 1 DvsMacNetworkRuleQualifier and 1 DvsSystemTrafficNetworkRuleQualifier for a total of 3 qualifier.\n\xa0 \xa0 - Let's check ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsIpNetworkRuleQualifier")," than..."),(0,r.kt)("li",{parentName:"ul"},"Hey! ",(0,r.kt)("a",{parentName:"li",href:"https://vdc-download.vmware.com/vmwb-repository/dcr-public/bf660c0a-f060-46e8-a94d-4b5e6ffc77ad/208bc706-e281-49b6-a0ce-b402ec19ef82/SDK/vsphere-ws/docs/ReferenceGuide/vim.dvs.TrafficRule.IpQualifier.html"},"DvsIpNetworkRuleQualifier")," supports the 5 tuples!\n\xa0 \xa0 - Look! It supports ",(0,r.kt)("inlineCode",{parentName:"li"},"tcpFlags")," also! Maybe we could simulate an 'established' ACL keyword, creating an ACL which matches only segments with ACK and/or RST!\n\xa0 \xa0 - Oh no... Look at the description... \"",(0,r.kt)("em",{parentName:"li"},"TCP flags are not supported by Traffic Filtering"),'". Ok, but we can still create traffic rules...')),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"This TCP Flags thing really got me the first time I tried to use\xa0DVS filter because this text was only added on documentation for version 7.0... So I tried to use this on the 6.5 version without success but could never figure out the reason that it wasn't working... ",(0,r.kt)("a",{parentName:"p",href:"https://developer.vmware.com/apis/358/vsphere/doc/vim.dvs.TrafficRule.IpQualifier.html"},"Check the old version without this text"),"."))),(0,r.kt)("p",null,"So, to effectively apply ACLs on DVS you need to:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Define the 5 rule tuples using ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsIpNetworkRuleQualifier"),"."),(0,r.kt)("li",{parentName:"ul"},"Append it to a ",(0,r.kt)("inlineCode",{parentName:"li"},"qualifier")," on a ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsTrafficRule"),"."),(0,r.kt)("li",{parentName:"ul"},"Set ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsTrafficRule")," ",(0,r.kt)("inlineCode",{parentName:"li"},"description"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"direction")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"action"),"."),(0,r.kt)("li",{parentName:"ul"},"Append this ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsTrafficRule")," to a ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsTrafficRuleset"),"."),(0,r.kt)("li",{parentName:"ul"},"Set ",(0,r.kt)("inlineCode",{parentName:"li"},"DVSTrafficFilterConfig")," with the ",(0,r.kt)("inlineCode",{parentName:"li"},"DvsTrafficRuleset")," you just created."),(0,r.kt)("li",{parentName:"ul"},"Apply ",(0,r.kt)("inlineCode",{parentName:"li"},"DVSTrafficFilterConfig")," to a port group."),(0,r.kt)("li",{parentName:"ul"},"Enable traffic filtering on that port group.")),(0,r.kt)("p",null,"Some questions about this VDS traffic filter rise:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"How many rules can I create?\n\xa0 \xa0 - Well, there isn't any documentation about this limit and VMWare ",(0,r.kt)("strong",{parentName:"li"},"must")," provide support to your vSphere even if you apply a long list of rules. Well, at least in theory, but I doubt that if you apply 10.000+ rules on your production environment VMWare will be able to help you..."),(0,r.kt)("li",{parentName:"ul"},"Is it stable? How is latency (ms overhead) and throughput (less pps) impacted by rules? What about the bare metal CPU usage (could increase since it's processing traffic to match rules)?\n\xa0 \xa0 - Really don't know... You could build some test scenarios to validate."),(0,r.kt)("li",{parentName:"ul"},"Where/When the rules are processed.\n\xa0 \xa0 - Don't know... Maybe it is like the DFW rules from NSX-T and they are processed on kernel hooks giving a good performance... But haven't looked for it."),(0,r.kt)("li",{parentName:"ul"},"Can I apply ACLs for an specific VM? Can I apply to uplinks?\n\xa0 \xa0 - YES! You can!")),(0,r.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"danger")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Be careful when using API to manipulate trafficRules like this. There are some functionalities that are only available through API! If you create some certain kind of rules using API you may be not able to see it on WEB UI! Worst: No errors are shown, but the rules are still there! If you want to delete or edit them, you'll need to do it using the API itself."))),(0,r.kt)("h2",{id:"python-scripts"},"Python Scripts"),(0,r.kt)("p",null,"The vSphere API described before is commonly used through an SDK previously built by vmware itself. A lot of people use PowerShell SDK (called ",(0,r.kt)("a",{parentName:"p",href:"https://developer.vmware.com/web/tool/12.5.0/vmware-powercli"},"PowerCLI"),"). I like the python SDK called ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/vmware/pyvmomi"},"pyvimovi")," which is also used by ansible modules."),(0,r.kt)("p",null,"I've uploaded 2 scripts to github. The first one lists rules on DVS and the second creates rules on DVS. Could have been only one, but that's ok..."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/liviozanol/vmware_vds_traffic_filter/blob/main/list_vds_portgroup_rules.py"},(0,r.kt)("inlineCode",{parentName:"a"},"list_vds_portgroup_rules.py"))," list rules for a specific portgroup. You pass dvswitch name, portgroup name and rule_id (optional) as argument to the script and all rules for that portgroup is outputted on a JSON formatted string."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/liviozanol/vmware_vds_traffic_filter/blob/main/edit_vds_portgroup_rules.py"},(0,r.kt)("inlineCode",{parentName:"a"},"edit_vds_portgroup_rules.py"))," edit, create and delete rules for a specific portgroup using a JSON file as source. The JSON file needs to have a specific format. In the following example we intended to create a simple TCP rule on port 53 to google DNS. Keep in mind that ",(0,r.kt)("a",{parentName:"p",href:"https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml"},"protocol number must follow IANA definition"),": (this example is also on script help):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-JSON"},'[\n\xa0 \xa0 {\n\xa0 \xa0 "sourceAddress":"any",\n\xa0 \xa0 "destinationAddress":"8.8.8.8/32",\n\xa0 \xa0 "sourcePort":"1024-60000",\n\xa0 \xa0 "destinationPort":"53",\n\xa0 \xa0 "protocol":"6",\n\xa0 \xa0 "action":"accept",\n\xa0 \xa0 "direction":"both",\n\xa0 \xa0 "description":"DNS google"\n\xa0 \xa0 }\n]\n')),(0,r.kt)("h2",{id:"conclusion"},"Conclusion"),(0,r.kt)("p",null,"vSphere Distributed Switch (VDS), along with other features like QoS, mark, shaping, LACP, etc. also supports stateless traffic filtering using 5 tuples."),(0,r.kt)("p",null,"Since I never tested it on production, I can't recommend you to do so. If you have some case scenarios for this or have already tested this on a production environment, please, feel free to send some data or feedback so I can share with others."),(0,r.kt)("p",null,'You could use these scripts to automate VDS using ansible directly (just install pyvimomi) calling it as a "shell" command. Or, you could use it to create an ansible module.'),(0,r.kt)("p",null,"Any feedback is appreciated."))}m.isMDXComponent=!0},6351:function(e,t,a){t.Z=a.p+"assets/images/create_rule-9ed69b4134d1b0a576ad01a849217cc3.png"},4954:function(e,t,a){t.Z=a.p+"assets/images/portgroup-a00ab32c28d5036f139ad36d7b5e3d66.png"}}]);