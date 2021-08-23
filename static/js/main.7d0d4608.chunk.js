(this["webpackJsonpbanner-web"]=this["webpackJsonpbanner-web"]||[]).push([[0],{42:function(e,t,n){},44:function(e,t,n){},47:function(e,t){},57:function(e,t,n){"use strict";n.r(t);var a=n(7),s=n.n(a),r=n(32),i=n.n(r),c=(n(42),n(2)),o=n.n(c),u=n(15),d=n(8),p=(n(44),n(14)),l=n(5);function b(e){var t=Object(a.useState)(!1),n=Object(d.a)(t,2),s=n[0],r=n[1],i=Object(a.useState)(localStorage.getItem("account")),c=Object(d.a)(i,2),b=c[0],y=c[1],m=e.setConnected,j=e.setSigner,h=e.setChain,f=Object(a.useCallback)((function(){y(null),m(!1),localStorage.removeItem("account")}),[m]),g=Object(a.useCallback)(Object(u.a)(o.a.mark((function e(){var t,n,a,s,r,i,c,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("connectUser"),t={"0x4":"rinkeby"},n=window,a=n.ethereum,e.prev=3,e.next=6,a.request({method:"eth_requestAccounts"});case 6:if(!(s=e.sent)[0]){e.next=21;break}return r=p.a.utils.getAddress(s[0]),y(r),m(!0),localStorage.setItem("account",r),i=new p.a.providers.Web3Provider(window.ethereum),c=i.getSigner(),j(c),e.next=17,a.request({method:"eth_chainId"});case 17:u=e.sent,h(t[u]),e.next=22;break;case 21:f();case 22:e.next=28;break;case 24:e.prev=24,e.t0=e.catch(3),console.error("getAccount ERROR",e.t0),f();case 28:case"end":return e.stop()}}),e,null,[[3,24]])}))),[f,m,j,h]);Object(a.useEffect)((function(){var e=window.ethereum;r(e&&e.isMetaMask),s&&(e.on("accountsChanged",(function(e){console.log("accountsChanged",e),e.length?g():f()})),e.on("disconnect",(function(){console.log("disconnect"),f()})),e.on("chainChanged",(function(e){console.log("chainChanged",e),window.location.reload()})),b&&g())}),[s,g,f,b]);return Object(l.jsx)("div",{id:"account",children:s?b?Object(l.jsxs)("div",{children:["Connected as ","".concat(b.substring(0,6),"...").concat(b.substring(38))]}):Object(l.jsx)("div",{children:Object(l.jsx)("button",{onClick:function(){return g()},children:"CONNECT WALLET"})}):Object(l.jsxs)("div",{children:[Object(l.jsx)("a",{href:"https://metamask.io/",target:"_blank",rel:"noreferrer",className:"external",children:"Install MetaMask"})," ","to join."]})})}var y=function(e){var t=Object(a.useState)(12),n=Object(d.a)(t,2),s=n[0],r=n[1];return Object(a.useEffect)((function(){var t=e.message?e.message.length:1e3;r(t>800?16:t>500?20:t>250?30:t>190?34:t>100?40:t>50?50:t>20?55:t>10?60:t>6?100:t>3?130:200)}),[e.message]),Object(l.jsxs)("div",{id:"container",children:[Object(l.jsxs)("div",{id:"sky",children:[Object(l.jsx)("div",{className:"shooting-star"}),Object(l.jsx)("div",{className:"shooting-star"}),Object(l.jsx)("div",{id:"star1",className:"stars",children:"*"}),Object(l.jsx)("div",{id:"star2",className:"stars",children:"*"}),Object(l.jsx)("div",{id:"star3",className:"stars",children:"*"}),Object(l.jsx)("div",{id:"star4",className:"stars",children:"*"}),Object(l.jsx)("div",{id:"star5",className:"stars",children:"*"}),Object(l.jsx)("div",{id:"star6",className:"stars",children:"*"}),Object(l.jsx)("div",{id:"star7",className:"stars",children:"*"})]}),Object(l.jsx)("div",{id:"billboard",style:{fontSize:"".concat(s,"px")},children:e.message}),Object(l.jsxs)("div",{id:"lights",children:[Object(l.jsx)("div",{id:"light1",className:"light"}),Object(l.jsx)("div",{id:"light2",className:"light"})]}),Object(l.jsx)("div",{id:"pole"}),Object(l.jsxs)("div",{id:"base-price",children:[Object(l.jsx)("div",{className:"price-pole"}),Object(l.jsxs)("div",{children:["PAID \u039e",e.price]}),Object(l.jsx)("div",{className:"price-pole"})]}),Object(l.jsxs)("div",{id:"base",children:["From:\xa0",Object(l.jsx)("a",{href:"https://".concat("","etherscan.io/address/").concat(e.publisher),target:"_blank",rel:"noreferrer",className:"external",children:function(){if(e.publisher)return"".concat(e.publisher.substring(0,6),"..").concat(e.publisher.substring(38))}()})]}),Object(l.jsx)("div",{id:"road"})]})},m=[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"approved",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!1,internalType:"bool",name:"approved",type:"bool"}],name:"ApprovalForAll",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"string",name:"message",type:"string"},{indexed:!1,internalType:"uint256",name:"price",type:"uint256"},{indexed:!1,internalType:"address",name:"publisher",type:"address"}],name:"NewMessage",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"approve",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"},{internalType:"bytes",name:"_data",type:"bytes"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"operator",type:"address"},{internalType:"bool",name:"approved",type:"bool"}],name:"setApprovalForAll",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"string",name:"baseURI",type:"string"}],name:"setBaseURI",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"string",name:"message",type:"string"}],name:"setMessage",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"transferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"withdrawAll",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"uint256",name:"price",type:"uint256"},{internalType:"string",name:"message",type:"string"},{internalType:"string",name:"baseURI",type:"string"}],stateMutability:"nonpayable",type:"constructor"},{inputs:[{internalType:"address",name:"owner",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"getApproved",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"getInfo",outputs:[{internalType:"string",name:"",type:"string"},{internalType:"uint256",name:"",type:"uint256"},{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"getMessage",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"getPrice",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getPublisher",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"ownerOf",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"}],j=function(e){console.log("chain",e);var t={mainnet:{address:"",infuraName:"mainnet"},rinkeby:{address:"0x6f784d11BF8040b047a28d85cbd3b0b186BD453C",infuraName:"rinkeby"}},n=new p.a.providers.InfuraProvider(t[e].infuraName,"5ac032ada81f40b3808b1c90bacc95ba");return new p.a.Contract(t[e].address,m,n)};function h(e){return f.apply(this,arguments)}function f(){return(f=Object(u.a)(o.a.mark((function e(t){var n,a,s,r,i,c,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=j(t),e.next=3,n.getInfo();case 3:return a=e.sent,s=Object(d.a)(a,3),r=s[0],i=s[1],c=s[2],u=p.a.utils.formatEther(i.toString()),e.abrupt("return",[r,x(u,2),c]);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e,t){j(e).on("NewMessage",(function(e,n,a){console.log("NewMessage",e,n,a);var s=p.a.utils.formatEther(n.toString());t(e,x(s,2),a)}))}function O(e,t,n,a){return v.apply(this,arguments)}function v(){return(v=Object(u.a)(o.a.mark((function e(t,n,a,s){var r,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=j(t),e.prev=1,e.next=4,r.connect(n).setMessage(a,{value:s});case 4:return i=e.sent,e.abrupt("return",i.hash);case 8:return e.prev=8,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",null);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}function x(e,t){return t=Math.pow(10,t),Math.ceil(e*t)/t}function T(e){var t=Object(a.useState)(),n=Object(d.a)(t,2),s=n[0],r=n[1],i=Object(a.useState)(),c=Object(d.a)(i,2),b=c[0],y=c[1],m=Object(a.useState)(),j=Object(d.a)(m,2),h=j[0],f=j[1],g=Object(a.useState)(!1),v=Object(d.a)(g,2),x=v[0],T=v[1],w=.01,k=e.setTxPending,M=e.chain;Object(a.useEffect)((function(){if(e.price){var t=e.price+w;f(S(t))}}),[e.price,k]);var N=function(){var t=Object(u.a)(o.a.mark((function t(n){var a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),!e.signer){t.next=6;break}return t.next=4,O(M,e.signer,b,p.a.utils.parseEther(h.toString()).toString());case 4:(a=t.sent)&&(r(a),e.setTxPending(!0));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function S(e){return Math.round(100*e)/100}return 0===e.price||e.price?Object(l.jsx)("div",{id:"buy",children:s?Object(l.jsxs)("div",{id:"transaction",children:["Please wait for"," ",Object(l.jsx)("a",{href:"https://".concat("","etherscan.io/tx/").concat(s),target:"_blank",rel:"noreferrer",className:"external",children:"transaction"})," ","to complete..."," "]}):Object(l.jsxs)("form",{onSubmit:N,children:[Object(l.jsx)("div",{id:"custom-button",children:Object(l.jsx)("input",{type:"button",id:"advance",onClick:function(){return T(!x)},value:x?"basic":"advance"})}),Object(l.jsx)("div",{className:"clear"}),Object(l.jsx)("div",{className:"grow-wrap",children:Object(l.jsx)("textarea",{"data-gramm_editor":"false",id:"newMessage",rows:"1",placeholder:"Type your message...",value:b,onChange:function(e){return y(e.target.value)},maxLength:"1000",required:!0,name:"message",onInput:function(e){return e.target.parentNode.dataset.replicatedValue=e.target.value}})}),x&&Object(l.jsxs)("div",{id:"advance-setttings",children:["Set custom price:",Object(l.jsx)("input",{type:"number",step:w,min:S(e.price+w),defaultValue:h,onChange:function(t){var n=parseFloat(t.target.value);isNaN(n)||n<=e.price||f(n)}}),Object(l.jsxs)("div",{id:"tip",children:["Price has to be greater than \u039e",e.price,".",Object(l.jsx)("br",{}),"Message stays until someone pays more than you."]})]}),Object(l.jsx)("div",{children:Object(l.jsx)("input",{id:"submit",type:"submit",value:"Publish for \u039e".concat(h)})})]})}):""}var w=function(){var e=Object(a.useState)(),t=Object(d.a)(e,2),n=t[0],s=t[1],r=Object(a.useState)(),i=Object(d.a)(r,2),c=i[0],p=i[1],m=Object(a.useState)(),j=Object(d.a)(m,2),f=j[0],O=j[1],v=Object(a.useState)(),x=Object(d.a)(v,2),w=x[0],k=x[1],M=Object(a.useState)(!1),N=Object(d.a)(M,2),S=N[0],I=N[1],C=Object(a.useState)(!1),A=Object(d.a)(C,2),F=A[0],P=A[1],E=Object(a.useState)(!1),B=Object(d.a)(E,2),R=B[0],D=B[1],L=Object(a.useState)("rinkeby"),_=Object(d.a)(L,2),q=_[0],U=_[1];return Object(a.useEffect)((function(){var e=function(e){var t=document.createElement("script");t.src=e,t.async=!0,document.body.appendChild(t)};e('https://www.googletagmanager.com/gtag/js?id=G-6WS15T0K6D"'),e("/FS.js")}),[]),Object(a.useEffect)((function(){function e(){return(e=Object(u.a)(o.a.mark((function e(){var t,n,a,r,i,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(e,t,n){s(e),p(t),O(n)},e.next=3,h(q);case 3:n=e.sent,a=Object(d.a)(n,3),r=a[0],i=a[1],c=a[2],t(r,i,c),g(q,(function(e,n,a){t(e,n,a),F&&D(!0)}));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}q&&function(){e.apply(this,arguments)}(q)}),[F,q]),Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)("h1",{children:"CRYPTO BILLBOARD"}),Object(l.jsx)("div",{id:"tagline",children:"Your message to the world"}),q&&Object(l.jsx)(y,{message:n,publisher:f,price:c}),"mainnet"!==q&&Object(l.jsxs)("div",{id:"chain",children:["- ",q||"unsupported network"," -"]}),Object(l.jsx)(b,{message:n,setConnected:I,setSigner:k,setChain:U}),R&&Object(l.jsx)("div",{children:"Transaction is complete \ud83c\udf89"}),S&&!R&&q&&Object(l.jsx)(T,{price:c,signer:w,setTxPending:P,chain:q}),Object(l.jsxs)("div",{id:"info",children:[Object(l.jsx)("h3",{children:"About"}),"Welcome to a decentralized social experiment \ud83d\udc4b ",Object(l.jsx)("br",{}),"The billboard above"," ",Object(l.jsx)("a",{href:"https://".concat("","etherscan.io/address/").concat("0x6f784d11BF8040b047a28d85cbd3b0b186BD453C"),className:"external",target:"_blank",rel:"noreferrer",children:"exists on the Etherume blockchain"})," ","The message is censorship-resistant and available to everyone.",Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),"The billboard also shows the owner and price paid for the message to be published.",Object(l.jsx)("br",{}),"To override this message with your own, you will need to pay more ETH than the previous price paid.",Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),"Publishers are gifted a unique BLBD NFT \ud83e\udd84.",Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),"Your message will stay forever on the blockchain unless someone decides to pay more to publish their message instead.",Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),"Got something to tell the world? Publish it now!"]}),Object(l.jsx)("hr",{}),Object(l.jsx)("div",{id:"footer",children:"Footer"})]})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,59)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),s(e),r(e),i(e)}))};i.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(w,{})}),document.getElementById("root")),k()}},[[57,1,2]]]);
//# sourceMappingURL=main.7d0d4608.chunk.js.map