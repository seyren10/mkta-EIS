import{_ as y,r as d,o as _,g as w,n as C,u as E,s as U,c as x,a as t,w as s,d as l,t as b,m as P,x as T,b as n,i as K,k as D,p as Y,e as z}from"./app-f2b2cabb.js";const F={props:{userName:String},data(){return{nameValue:this.userName}},methods:{updateNameValue(){this.$emit("update",this.nameValue)}}};function M(a,e,N,u,o,m){const i=d("v-text-field");return _(),w(i,{type:"text",variant:"underlined",modelValue:o.nameValue,"onUpdate:modelValue":e[0]||(e[0]=p=>o.nameValue=p),onBlur:m.updateNameValue,onKeydown:C(m.updateNameValue,["enter"])},null,8,["modelValue","onBlur","onKeydown"])}const R=y(F,[["render",M]]);const j={async setup(){const a=E(),{user:e}=U(a);return{user:e,userStore:a}},components:{EditNameInput:R},data(){return{form:{password:null,password_confirmation:null},editName:!1,props:{userName:this.user.name},editableNameValue:this.user.name}},methods:{handleSubmit(){this.userStore.setPasswordFirstTime(this.form)},handleSubmitName(){this.userStore.updateName({name:this.editableNameValue})},updateEditableName(a){this.editableNameValue=a}},watch:{editName(a,e){e&&this.handleSubmitName()}}},c=a=>(Y("data-v-be0acebd"),a=a(),z(),a),q={class:"center"},A={class:"text-body-1"},G=c(()=>n("p",{class:"text-caption text-grey"},"Email",-1)),H={key:0,class:"mt-10"},J=c(()=>n("span",{class:"text-body-1"},"Set your new password",-1)),L=c(()=>n("p",{class:"text-caption text-grey"}," You can change your password one time after registration ",-1)),O={else:"",class:"mt-3"},Q=c(()=>n("span",{class:"text-body-1"},"You already set your new password",-1)),W=c(()=>n("p",{class:"text-caption text-grey"}," contact the system admin to help you reset your account ",-1)),X={else:"",class:"mt-3"},Z=c(()=>n("span",{class:"text-body-1"},"6 device/s",-1)),$=c(()=>n("p",{class:"text-caption text-grey"}," Total of devices you process ",-1));function ee(a,e,N,u,o,m){const i=d("v-icon"),p=d("v-card-title"),V=d("v-card-subtitle"),v=d("v-text-field"),g=d("v-btn"),S=d("v-form"),k=d("v-card-text"),I=d("v-card"),B=d("v-sheet");return _(),x("div",q,[t(B,{height:500,width:500,border:"",rounded:""},{default:s(()=>[t(I,{elevation:"0"},{default:s(()=>[t(p,{class:"d-flex align-center"},{default:s(()=>[(_(),w(T(o.editName?"EditNameInput":"span"),P({class:"mr-3"},o.props,{onUpdate:e[0]||(e[0]=r=>m.updateEditableName(r))}),{default:s(()=>{var r;return[l(b(o.editName?"":(r=u.user)==null?void 0:r.name),1)]}),_:1},16)),t(i,{size:"xs",color:"blue-lighten-1",onClick:e[1]||(e[1]=r=>o.editName=!o.editName)},{default:s(()=>[l("mdi-pencil-outline")]),_:1})]),_:1}),t(V,{class:"border-b"},{default:s(()=>[l("Superuser")]),_:1}),t(k,null,{default:s(()=>{var r,h;return[n("div",null,[t(i,{class:"text-grey mr-3"},{default:s(()=>[l("mdi-email-outline")]),_:1}),n("span",A,b((r=u.user)==null?void 0:r.email),1),G]),(h=u.user)!=null&&h.password_changed?D("",!0):(_(),x("div",H,[t(i,{class:"text-grey mr-3"},{default:s(()=>[l("mdi-key-outline")]),_:1}),J,L,t(S,{onSubmit:K(m.handleSubmit,["prevent"])},{default:s(()=>[t(v,{label:"Password",type:"password",modelValue:o.form.password,"onUpdate:modelValue":e[2]||(e[2]=f=>o.form.password=f)},null,8,["modelValue"]),t(v,{label:"Confirm Password",type:"password",modelValue:o.form.password_confirmation,"onUpdate:modelValue":e[3]||(e[3]=f=>o.form.password_confirmation=f)},null,8,["modelValue"]),t(g,{class:"text-none",variant:"flat",color:"blue-lighten-1",type:"submit"},{default:s(()=>[l("Set new password")]),_:1})]),_:1},8,["onSubmit"])])),n("div",O,[t(i,{class:"text-grey mr-3"},{default:s(()=>[l("mdi-lock-outline")]),_:1}),Q,W]),n("div",X,[t(i,{class:"text-grey mr-3"},{default:s(()=>[l("mdi-devices")]),_:1}),Z,$])]}),_:1})]),_:1})]),_:1})])}const se=y(j,[["render",ee],["__scopeId","data-v-be0acebd"]]);export{se as default};