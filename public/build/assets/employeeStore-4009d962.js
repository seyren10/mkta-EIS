import{f as o}from"./app-f2b2cabb.js";const i=o("employees",{state:()=>({employees:[],isLoading:!1,errors:[]}),getters:{activeEmployees:e=>e.employees.filter(s=>s.is_active)},actions:{async getEmployees(){const e=await axios.get("/api/employee");this.employees=e.data.data},async postEmployee(e){try{this.isLoading=!0,this.errors=[],await axios.post("/api/employee",e)}catch(s){console.log(s.message),this.errors=s.response.data.errors}finally{this.isLoading=!1,this.getEmployees()}},async updateEmployee(e,s){try{this.isLoading=!0,this.errors=[],await axios.put(`/api/employee/${e}`,s)}catch(t){console.log(t.message),this.errors=t.response.data.errors}finally{this.isLoading=!1,this.getEmployees()}}}});export{i as u};
