import{_ as C,r as o,o as _,a as x,w as e,b as t,m as D,d,e as T,c as f,f as n,T as F,g as j,F as g,h as q,t as h,p as A,i as E}from"./app-c99d7a89.js";const L={data(){return{dialog:!1}}},P=d(" Add Category "),U=d("Create Category"),z=d(" Create "),G=d(" cancel "),H=d("Create Category");function J(a,l,k,w,s,$){const c=o("v-btn"),u=o("v-toolbar-title"),i=o("v-spacer"),p=o("v-toolbar-items"),V=o("v-toolbar"),v=o("v-text-field"),m=o("v-col"),I=o("v-form"),b=o("v-row"),N=o("v-container"),B=o("v-card"),S=o("v-dialog");return _(),x(b,{justify:"center"},{default:e(()=>[t(S,{modelValue:s.dialog,"onUpdate:modelValue":l[2]||(l[2]=r=>s.dialog=r),fullscreen:"",scrim:!1,transition:"dialog-bottom-transition"},{activator:e(({props:r})=>[t(c,D({color:"blue-lighten-1",dark:""},r,{"prepend-icon":"mdi-plus",class:"mr-10"}),{default:e(()=>[P]),_:2},1040)]),default:e(()=>[t(B,null,{default:e(()=>[t(V,{color:"white",class:"border-b"},{default:e(()=>[t(u,null,{default:e(()=>[U]),_:1}),t(i),t(p,null,{default:e(()=>[t(c,{variant:"text",color:"blue-lighten-1",onClick:l[0]||(l[0]=r=>s.dialog=!1)},{default:e(()=>[z]),_:1}),t(c,{variant:"text",onClick:l[1]||(l[1]=r=>s.dialog=!1)},{default:e(()=>[G]),_:1})]),_:1})]),_:1}),t(N,{style:{"max-width":"50rem"}},{default:e(()=>[t(b,null,{default:e(()=>[t(I,{style:{width:"100%"}},{default:e(()=>[t(m,{cols:"12"},{default:e(()=>[t(v,{label:"Name*",required:""})]),_:1}),t(m,{cols:"12"},{default:e(()=>[t(v,{label:"Description"})]),_:1}),t(m,{cols:"12"},{default:e(()=>[t(c,{block:"",variant:"flat",color:"blue-lighten-1",type:"submit"},{default:e(()=>[H]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}const K=C(L,[["render",J]]);const M={data(){return{mounted:!1,categories:[]}},created(){this.fetchCategories()},mounted(){this.mounted=!0},methods:{async fetchCategories(){const a=await T.get("api/category");this.categories=a.data}},components:{Create:K}},y=a=>(A("data-v-baaf1cb9"),a=a(),E(),a),O=y(()=>n("thead",null,[n("tr",null,[n("th",null,"Name"),n("th",null,"Description"),n("th")])],-1)),Q=y(()=>n("td",null,null,-1)),R={class:"actions"};function W(a,l,k,w,s,$){const c=o("v-table"),u=o("Create");return _(),f(g,null,[t(c,null,{default:e(()=>[O,n("tbody",null,[(_(!0),f(g,null,q(s.categories.data,(i,p)=>(_(),f("tr",{key:p},[n("td",null,h(i.name),1),n("td",null,h(i.description),1),Q]))),128))])]),_:1}),s.mounted?(_(),x(F,{key:0,to:"#actions"},[n("div",R,[t(u)])])):j("",!0)],64)}const Y=C(M,[["render",W],["__scopeId","data-v-baaf1cb9"]]);export{Y as default};