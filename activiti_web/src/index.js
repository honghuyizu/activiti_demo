//【这个必须放在第一行：import "babel-polyfill";】
import "babel-polyfill";
import './index.html';
import 'ant-design-pro/dist/ant-design-pro.css';
import 'antd/dist/antd.css';
import './index.less';
import dva from 'dva';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva(createLoading());

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/index.js'));
app.model(require('./models/login.js'));
app.model(require('./models/index/my_dashboard/welcome.js'));
app.model(require('./models/index/my_dashboard/my_info/baseInfo.js'));
app.model(require('./models/index/my_dashboard/my_info/changePassword.js'));
app.model(require('./models/index/my_dashboard/my_info/updateAvatar.js'));
app.model(require('./models/index/my_dashboard/my_info/userAddresses.js'));
app.model(require('./models/index/my_dashboard/my_info/userCreditCards.js'));
app.model(require('./models/index/my_dashboard/my_info/userDebitCards.js'));
app.model(require('./models/index/system_config/menus.js'));
app.model(require('./models/index/system_config/roles.js'));
app.model(require('./models/index/system_config/users.js'));
app.model(require('./models/index/system_config/area_manage/provinces.js'));
app.model(require('./models/index/system_config/area_manage/citiesAndCounties.js'));
app.model(require('./models/index/system_config/dict_manage/dictTypes.js'));
app.model(require('./models/index/system_config/dict_manage/dicts.js'));
app.model(require('./models/index/system_config/dict_manage/dictBanks.js'));
app.model(require('./models/index/system_config/task_manage/tasks.js'));
app.model(require('./models/index/system_config/task_manage/taskLogs.js'));
app.model(require('./models/index/system_config/resources.js'));
app.model(require('./models/index/system_config/mobile_app_manage/mobileApps.js'));
app.model(require('./models/index/system_config/mobile_app_manage/mobileAppConfigs.js'));
app.model(require('./models/index/member_manage/levels.js'));
app.model(require('./models/index/member_manage/members.js'));
app.model(require('./models/index/customer_manage/groups.js'));
app.model(require('./models/index/customer_manage/customers.js'));
app.model(require('./models/index/content_manage/carousel_manage/carousels.js'));
app.model(require('./models/index/content_manage/carousel_manage/carouselItems.js'));
app.model(require('./models/index/content_manage/ad_manage/adPositions.js'));
app.model(require('./models/index/content_manage/ad_manage/ads.js'));
app.model(require('./models/index/content_manage/article_manage/topics.js'));
app.model(require('./models/index/content_manage/article_manage/articles.js'));
app.model(require('./models/index/data_analysis/userAnalysis.js'));
app.model(require('./models/index/data_analysis/memberAnalysis.js'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
