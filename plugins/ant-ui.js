import Vue from 'vue'
import { Button,Message,Form, Table, Tabs, Modal, Collapse, Empty,Tag,Pagination, Menu,Carousel,
    ConfigProvider,Input ,Icon,Select,Radio,Checkbox,Col,Row,} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; 

Vue.use(Table);
Vue.use(Tabs);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Carousel);
Vue.use(Pagination);
Vue.use(ConfigProvider);
Vue.use(Input);
Vue.use(Modal);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Radio);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.prototype.$message = Message