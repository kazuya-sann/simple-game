import{r as u,o as I,t as M,x as B,v as C}from"./CfbrW8hF.js";const k={class:"game-container"},p=4,R={__name:"index",setup(E){const n=u(null),c=u(null),s=u([]),h=["images/icon1.png","images/icon2.png","images/icon3.png","images/icon4.png"],v=u(0);let g=u(!1),a=u(null),d=u(!1);const m=()=>{s.value=[];let e=[];g.value=!1;let l=0;for(let t=0;t<p;t++){const i=h[t%h.length];e.push({image:i,x:Math.random()*700,y:Math.random()*500,width:100,height:100,img:new Image}),e.push({image:i,x:Math.random()*700,y:Math.random()*500,width:100,height:100,img:new Image})}e.forEach(t=>{t.img.src=t.image,t.img.onload=()=>{l++,l===e.length&&(g.value=!0,r())}}),s.value=e},r=()=>{c.value&&g.value&&(c.value.clearRect(0,0,n.value.width,n.value.height),s.value.forEach(e=>{c.value.drawImage(e.img,e.x,e.y,e.width,e.height)}))},x=e=>{const l=n.value.getBoundingClientRect(),t=e.clientX-l.left,i=e.clientY-l.top;a.value=s.value.find(o=>t>=o.x&&t<=o.x+o.width&&i>=o.y&&i<=o.y+o.height),a.value&&(d.value=!0)},w=e=>{if(d.value&&a.value){const l=n.value.getBoundingClientRect();a.value.x=e.clientX-l.left-a.value.width/2,a.value.y=e.clientY-l.top-a.value.height/2,r(),y()}},f=()=>{d.value=!1,a.value=null},y=()=>{s.value.forEach(e=>{if(a.value&&e!==a.value&&e.image===a.value.image){const l=e.x-a.value.x,t=e.y-a.value.y;Math.sqrt(l*l+t*t)<10&&(_(),s.value=s.value.filter(o=>o!==e&&o!==a.value),v.value++,r())}}),v.value===p&&setTimeout(()=>{v.value=0,m()},1e3)},_=()=>{new Audio("sounds/match.mp3").play()};return I(()=>{n.value&&(n.value.width=800,n.value.height=600,c.value=n.value.getContext("2d"),m())}),(e,l)=>(C(),M("div",k,[B("canvas",{ref_key:"canvas",ref:n,onMousedown:x,onMousemove:w,onMouseup:f,onMouseleave:f},null,544)]))}};export{R as default};
