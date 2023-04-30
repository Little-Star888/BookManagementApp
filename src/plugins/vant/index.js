import {
  Button,
  Icon,
  Tabbar,
  TabbarItem,
  NavBar,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Toast,
  Cell,
  CellGroup,
  Image as VanImage,
  Sidebar,
  SidebarItem,
  Empty,
  Card,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Tab,
  Tabs,
  Field,
  Form,
  SwipeCell,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Dialog,
  Tag,
  Loading
} from "vant";
import Vue from "vue";

Vue.use(Loading);
Vue.use(Tag);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SwipeCell);
Vue.use(Form);
Vue.use(Field);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Card);
Vue.use(Empty);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);

// 原型上挂载
Vue.prototype.$toast = Toast;
Vue.use(Toast);
Vue.prototype.$lazyload = Lazyload;
Vue.use(Lazyload);
Vue.prototype.$confirm = Dialog.confirm;
