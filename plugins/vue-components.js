import Vue from 'vue';
// import CommingSoon from "@/components/commingsoon.vue";
import Button from "@/components/custom/button.vue";
import TextField from "@/components/custom/text-field.vue";
import Select from "@/components/custom/select.vue";
import ConfirmDialog from "@/components/custom/confirm-dialog.vue";
import PageHeader from '@/components/custom/page-header.vue';
import ActionMenu from "@/components/custom/action-menu.vue";
import ImageViewer from "@/components/custom/image-viewer.vue";

// Vue.component('commingsoon', CommingSoon);
Vue.component('v-custom-btn', Button);
Vue.component('v-custom-text-field', TextField);
Vue.component('v-custom-select', Select);
Vue.component('confirm-dialog', ConfirmDialog);
Vue.component('page-header', PageHeader);
Vue.component('action-menu', ActionMenu);
Vue.component('image-viewer', ImageViewer);