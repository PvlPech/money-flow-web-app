import { createApp } from "vue";
import App from '@/App.vue';
import MyButton from "@/components/ui/MyButton.vue";
import MyInput from "@/components/ui/MyInput.vue";
import MyDialog from "@/components/ui/MyDialog.vue";
import MySelect from "@/components/ui/MySelect.vue";
import router from "@/router/router";
import VIntersection from "@/directives/VIntersection";
import VFocus from "@/directives/VFocus";
import store from "@/stores/store";

const app = createApp(App);
app
    .component("my-button", MyButton)
    .component("my-input", MyInput)
    .component("my-dialog", MyDialog)
    .component("my-select", MySelect)
    .directive("intersection", VIntersection)
    .directive("focus", VFocus)
    .use(store)
    .use(router)
    .mount('#app');
