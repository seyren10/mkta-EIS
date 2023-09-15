<script>
import { VDatePicker } from "vuetify/labs/VDatePicker";
import { VDataTable } from "vuetify/lib/labs/VDataTable/index.mjs";
export default {
    components: { VDatePicker, VDataTable },
    props: {
        item: Object,
    },
    data() {
        return {
            form: {
                transferred_date: null,
                officer_in_charge: "Manual Dayrit",
                is_active: 1,
                item_id: this.item.id,
                employee_id: null,
                errors: {},
            },
            items: {},
            employees: [],
            dialog: false,
            isLoading: false,
            search: "",
            searchResult: [],
        };
    },
    methods: {
        asfetchItem() {
            axios
                .get("/api/item")
                .then((res) => {
                    this.items = res.data.data;
                })
                .catch((err) => {});
        },
        async fetchEmployees() {
            const res = await axios.get("/api/employee");

            this.employees = res.data.data.filter(emp=> emp.is_active);
            this.searchResult = this.employees;
        },
        searchEmployee() {
            this.searchResult = this.employees.filter((emp) => {
                return (
                    emp.full_name.customIncludes(this.search)
                );
            });
        },
        async create() {
            const res = await axios.post('/api/employee-inventory', this.form);
        },
      
    },
    created() {
        this.fetchEmployees();
    },
};
</script>

<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    prepend-icon="mdi-plus"
                    rounded="2"
                    elevation="1"
                    color="blue-lighten-1"
                    size="small"
                    v-bind="props"
                >
                    transfer
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title
                        >Associate this device to employee</v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            variant="text"
                            color="blue-lighten-1"
                            @click="dialog = false"
                        >
                            associate
                        </v-btn>
                        <v-btn variant="text" @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container style="max-width: 50rem">
                    <v-row>
                        <v-form style="width: 100%" @submit.prevent="create">
                            <v-col cols="12">
                                <!-- <VDatePicker
                                    v-model="form.transferred_date"
                                    :hide-actions="true"
                                    input-mode="keyboard"
                                    class="mx-auto"
                                    title="transferred date"
                                    format="(YYYY-MM-DD)"
                                ></VDatePicker> -->
                                <input type="date" v-model="form.transferred_date" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Officer in charge*"
                                    required
                                    v-model="form.officer_in_charge"
                                    readOnly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Device to transfer*"
                                    readOnly
                                    :model-value="`${item.brand} ${item.model}`"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Search"
                                    append-icon="mdi-magnify"
                                    placeholder="Search for ID, RFID or name..."
                                    v-model="search"
                                    @keydown.enter="searchEmployee"
                                ></v-text-field>
                                <v-select label="Active Employee" required v-model="form.employee_id" :items="searchResult.map(c=>{
                                    return {
                                        title: c.full_name,
                                        value: c.id
                                    }
                                })"></v-select>
                            </v-col>
                            <v-col cols="12"
                                ><v-btn
                                    block
                                    variant="flat"
                                    color="blue-lighten-1"
                                    type="submit"
                                    :loading="isLoading"
                                    >Associate</v-btn
                                ></v-col
                            >
                        </v-form>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
