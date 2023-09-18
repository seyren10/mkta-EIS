<script>
import { useEmployeeStore } from "../../stores/employeeStore";
import { storeToRefs } from "pinia";
export default {
    setup() {
        const employeeStore = useEmployeeStore();
        const { errors, isLoading } = storeToRefs(employeeStore);

        return { employeeStore, errors, isLoading };
    },
    data() {
        return {
            dialog: false,
            form: {
                employee_no: null,
                RFID_no: null,
                full_name: null,
                is_active: true,
            },
        };
    },
    methods: {
        async create() {
            await this.employeeStore.postEmployee(this.form);

            //close the dialog of there's no error
            if (!Object.keys(this.errors).length) {
                this.form = {
                    employee_no: null,
                    RFID_no: null,
                    full_name: null,
                    is_active: true,
                };
                this.dialog = false;
            }
        },
        handleKeyEnter(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        },
    },
};
</script>

<template>
    <v-row class="py-2">
        <v-dialog
            v-model="dialog"
            :scrim="false"
            transition="dialog-bottom-transition"
            style="max-width: 30rem"
            persistent
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    color="blue-lighten-1"
                    dark
                    v-bind="props"
                    prepend-icon="mdi-plus"
                    size="small"
                >
                    Register employee
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title style="flex-basis: 100%"
                        >Employee Registration Form</v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container style="max-width: 50rem">
                    <v-row>
                        <v-form style="width: 100%" @submit.prevent="create">
                            <v-col cols="12">
                                <v-text-field
                                    label="Employee Number*"
                                    required
                                    v-model="form.employee_no"
                                    :error="errors?.employee_no ? true : false"
                                    :error-messages="errors.employee_no"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="RFID*"
                                    required
                                    v-model="form.RFID_no"
                                    hint="Put the ID over the RFID scanner to automatically generate RFID number."
                                    persistent-hint
                                    @keydown.enter="handleKeyEnter"
                                    :error="errors?.RFID_no ? true : false"
                                    :error-messages="errors.RFID_no"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Full Name*"
                                    required
                                    v-model="form.full_name"
                                    :error="errors?.full_name ? true : false"
                                    :error-messages="errors.full_name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12"
                                ><v-btn
                                    block
                                    variant="flat"
                                    color="blue-lighten-1"
                                    type="submit"
                                    :loading="isLoading"
                                    >Register User</v-btn
                                ></v-col
                            >
                        </v-form>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
