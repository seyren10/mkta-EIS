<script>
export default {
    props: {
        employee: Object,
    },
    data() {
        return {
            dialog: false,
            form: {
                id: this.employee.id,
                employee_no: this.employee.employee_no,
                full_name: this.employee.full_name,
                RFID_no: this.employee.RFID_no,
                is_active: this.employee.is_active ? true : false,
            },
        };
    },
    methods: {
        async update() {},

        handleKeyEnter: (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        },
    },
    created() {},
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
                    color="blue-lighten-1"
                    v-bind="props"
                    icon="mdi-pencil"
                    size="small"
                >
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="white" class="border-b">
                    <v-toolbar-title>Edit Employee</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            variant="text"
                            color="blue-lighten-1"
                            @click="dialog = false"
                        >
                            Update
                        </v-btn>
                        <v-btn variant="text" @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container style="max-width: 50rem">
                    <v-row>
                        <v-form style="width: 100%" @submit.prevent="update">
                            <v-col cols="12">
                                <v-text-field
                                    label="Employee Number*"
                                    required
                                    v-model="form.employee_no"
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
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Full Name*"
                                    required
                                    v-model="form.full_name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <label
                                    class="text-grey-darken-1"
                                    style="font-size: 0.9rem"
                                >
                                    Change the status of the employee to either
                                    active or inactive
                                </label>
                                <v-switch
                                    v-model="form.is_active"
                                    color="blue-lighten-1"
                                    :label="`Status: ${
                                        form.is_active ? 'active' : 'inactive'
                                    }`"
                                ></v-switch>
                            </v-col>
                            <v-col cols="12"
                                ><v-btn
                                    block
                                    variant="flat"
                                    color="blue-lighten-1"
                                    type="submit"
                                    :loading="form.processing"
                                    >Update Employee</v-btn
                                ></v-col
                            >
                        </v-form>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
