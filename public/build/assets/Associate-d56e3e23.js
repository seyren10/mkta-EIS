import{f as C,_ as b,r as s,o as f,g as S,w as t,d as u,t as w,s as h,a as e,i as D,j as O,v as A,b as V,c as j,k as B}from"./app-f2b2cabb.js";import{u as N}from"./employeeStore-4009d962.js";import{u as U}from"./itemStore-737c839f.js";import{u as z}from"./locationStore-c999e36b.js";import{V as M}from"./VDataTable-7163fc42.js";const q=C("employee-inventory",{state:()=>({employeeInventories:[],isLoading:!1,errors:[]}),getters:{},actions:{async getEmployeeInventories(){},async postEmployeeInventories(i){try{this.isLoading=!0,this.errors=[],await axios.post("/api/employee-inventory",i)}catch(o){console.log(o.message),this.errors=o.response.data.errors}finally{this.isLoading=!1,this.getEmployeeInventories()}}}}),R={props:{list:String,listType:String},computed:{color(){if(this.listType==="condition")switch(this.list){case"good":return"green";case"fair":return"yellow";case"bad":return"orange";case"for disposal":return"red-accent-1";case"disposed":return"red";default:return"grey"}return"grey"}}};function F(i,o,c,a,r,d){const _=s("v-chip");return f(),S(_,{color:d.color,size:"small"},{default:t(()=>[u(w(c.list),1)]),_:1},8,["color"])}const Z=b(R,[["render",F]]),G={async setup(){const i=N(),o=q(),c=U(),a=z();await a.getLocations(),await i.getEmployees();const{errors:r,isLoading:d,employeeInventories:_}=h(o),{locations:p}=h(a);return{employeeStore:i,employeeInventoryStore:o,errors:r,isLoading:d,employeeInventories:_,itemStore:c,locations:p}},components:{VDataTable:M},props:{item:Object,user:Object},emits:["close","change"],data(){return{form:{transferred_date:new Date().toISOString().split("T")[0],officer_in_charge:this.user?this.user.name:"anonymous",is_active:1,item_id:this.item.id,employee_id:null,location_id:null},dialog:!1,search:"",employees:[]}},methods:{async create(){await this.employeeInventoryStore.postEmployeeInventories(this.form),Object.keys(this.errors).length||this.$emit("change")}},async created(){this.employees=this.employeeStore.activeEmployees}},H=V("label",{for:"date"},"Date of transfer*",-1),J={key:0};function K(i,o,c,a,r,d){const _=s("v-toolbar-title"),p=s("v-spacer"),v=s("v-btn"),x=s("v-toolbar-items"),I=s("v-toolbar"),m=s("v-col"),y=s("v-text-field"),g=s("v-autocomplete"),E=s("v-form"),k=s("v-row"),L=s("v-container"),T=s("v-card");return f(),S(T,null,{default:t(()=>[e(I,{color:"white",class:"border-b"},{default:t(()=>[e(_,{style:{"font-size":"1rem"}},{default:t(()=>[u("Assign to Employee")]),_:1}),e(p),e(x,null,{default:t(()=>[e(v,{variant:"text",onClick:o[0]||(o[0]=n=>i.$emit("close"))},{default:t(()=>[u(" cancel ")]),_:1})]),_:1})]),_:1}),e(L,{style:{"max-width":"50rem"}},{default:t(()=>[e(k,null,{default:t(()=>[e(E,{style:{width:"100%"},onSubmit:D(d.create,["prevent"])},{default:t(()=>[e(m,{cols:"12",class:"date"},{default:t(()=>{var n;return[H,O(V("input",{id:"date",type:"date","onUpdate:modelValue":o[1]||(o[1]=l=>r.form.transferred_date=l)},null,512),[[A,r.form.transferred_date]]),(n=r.form.errors)!=null&&n.date_purchased?(f(),j("p",J,w(r.form.errors.date_purchased),1)):B("",!0)]}),_:1}),e(m,{cols:"12"},{default:t(()=>[e(y,{label:"Officer in charge*",required:"",modelValue:r.form.officer_in_charge,"onUpdate:modelValue":o[2]||(o[2]=n=>r.form.officer_in_charge=n)},null,8,["modelValue"])]),_:1}),e(m,{cols:"12"},{default:t(()=>[e(y,{label:"Device to transfer*",readOnly:"","model-value":`${c.item.brand} ${c.item.model}`},null,8,["model-value"])]),_:1}),e(m,{cols:"12"},{default:t(()=>{var n;return[e(g,{label:"Assign to employee",items:r.employees.map(l=>({title:l.full_name,value:l.id})),modelValue:r.form.employee_id,"onUpdate:modelValue":o[3]||(o[3]=l=>r.form.employee_id=l),error:!!((n=a.errors)!=null&&n.employee_id),"error-messages":a.errors.employee_id},null,8,["items","modelValue","error","error-messages"])]}),_:1}),e(m,{cols:"12"},{default:t(()=>{var n;return[e(g,{label:"Assign Location",items:a.locations.map(l=>({title:l.name,value:l.id})),modelValue:r.form.location_id,"onUpdate:modelValue":o[4]||(o[4]=l=>r.form.location_id=l),error:!!((n=a.errors)!=null&&n.location_id),"error-messages":a.errors.location_id},null,8,["items","modelValue","error","error-messages"])]}),_:1}),e(m,{cols:"12"},{default:t(()=>[e(v,{block:"",variant:"flat",color:"blue-lighten-1",type:"submit",loading:a.isLoading},{default:t(()=>[u("assign device")]),_:1},8,["loading"])]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})}const $=b(G,[["render",K]]);export{$ as A,Z as C,q as u};
