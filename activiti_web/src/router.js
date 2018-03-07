import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import * as projectUtil from './utils/rbacProjectUtil';
import Login from './routes/Login';
import Index from './routes/Index';
import MyDashboard from './routes/index/MyDashboard';
import Welcome from './routes/index/my_dashboard/Welcome';
import MyInfo from './routes/index/my_dashboard/MyInfo';
import BaseInfo from './routes/index/my_dashboard/my_info/BaseInfo';
import BaseInfoEdit from './routes/index/my_dashboard/my_info/base_info/REdit';
import ChangePassword from './routes/index/my_dashboard/my_info/ChangePassword';
import ChangePasswordEdit from './routes/index/my_dashboard/my_info/change_password/REdit';
import UpdateAvatar from './routes/index/my_dashboard/my_info/UpdateAvatar';
import UpdateAvatarView from './routes/index/my_dashboard/my_info/update_avatar/RView';
import UpdateAvatarEdit from './routes/index/my_dashboard/my_info/update_avatar/REdit';
import UserAddresses from './routes/index/my_dashboard/my_info/UserAddresses';
import UserAddressList from './routes/index/my_dashboard/my_info/user_address/RList';
import UserAddressEdit from './routes/index/my_dashboard/my_info/user_address/REdit';
import UserCreditCards from './routes/index/my_dashboard/my_info/UserCreditCards';
import UserCreditCardList from './routes/index/my_dashboard/my_info/user_credit_card/RList';
import UserCreditCardEdit from './routes/index/my_dashboard/my_info/user_credit_card/REdit';
import UserDebitCards from './routes/index/my_dashboard/my_info/UserDebitCards';
import UserDebitCardList from './routes/index/my_dashboard/my_info/user_debit_card/RList';
import UserDebitCardEdit from './routes/index/my_dashboard/my_info/user_debit_card/REdit';
import SystemConfig from './routes/index/SystemConfig';
import Menus from './routes/index/system_config/Menus';
import MenuList from './routes/index/system_config/menu/RList';
import MenuEdit from './routes/index/system_config/menu/REdit';
import Roles from './routes/index/system_config/Roles';
import RoleList from './routes/index/system_config/role/RList';
import RoleEdit from './routes/index/system_config/role/REdit';
import RoleAuth from './routes/index/system_config/role/RAuth';
import Users from './routes/index/system_config/Users';
import UserList from './routes/index/system_config/user/RList';
import UserEdit from './routes/index/system_config/user/REdit';
import UserAuth from './routes/index/system_config/user/RAuth';
import AreaManage from './routes/index/system_config/AreaManage';
import Provinces from './routes/index/system_config/area_manage/Provines';
import ProvinceList from './routes/index/system_config/area_manage/province/RList';
import ProvinceEdit from './routes/index/system_config/area_manage/province/REdit';
import CitiesAndCounties from './routes/index/system_config/area_manage/CitiesAndCounties';
import CityAndCountyList from './routes/index/system_config/area_manage/city_and_county/RList';
import CityAndCountyEdit from './routes/index/system_config/area_manage/city_and_county/REdit';
import DictManage from './routes/index/system_config/DictManage';
import DictTypes from './routes/index/system_config/dict_manage/DictTypes';
import DictTypeList from './routes/index/system_config/dict_manage/dict_type/RList';
import DictTypeEdit from './routes/index/system_config/dict_manage/dict_type/REdit';
import Dicts from './routes/index/system_config/dict_manage/Dicts';
import DictList from './routes/index/system_config/dict_manage/dict/RList';
import DictEdit from './routes/index/system_config/dict_manage/dict/REdit';
import DictBanks from './routes/index/system_config/dict_manage/DictBanks';
import DictBankList from './routes/index/system_config/dict_manage/dict_bank/RList';
import DictBankEdit from './routes/index/system_config/dict_manage/dict_bank/REdit';
import TaskManage from './routes/index/system_config/TaskManage';
import Tasks from './routes/index/system_config/task_manage/Tasks';
import TaskList from './routes/index/system_config/task_manage/task/RList';
import TaskEdit from './routes/index/system_config/task_manage/task/REdit';
import TaskLogs from './routes/index/system_config/task_manage/TaskLogs';
import TaskLogList from './routes/index/system_config/task_manage/task_log/RList';
import Resources from './routes/index/system_config/Resources';
import ResourceList from './routes/index/system_config/resource/RList';
import MobileAppManage from './routes/index/system_config/MobileAppManage';
import MobileApps from './routes/index/system_config/mobile_app_manage/MobileApps';
import MobileAppList from './routes/index/system_config/mobile_app_manage/mobile_app/RList';
import MobileAppEdit from './routes/index/system_config/mobile_app_manage/mobile_app/REdit';
import MobileAppConfigs from './routes/index/system_config/mobile_app_manage/MobileAppConfigs';
import MobileAppConfigList from './routes/index/system_config/mobile_app_manage/mobile_app_config/RList';
import MobileAppConfigEdit from './routes/index/system_config/mobile_app_manage/mobile_app_config/REdit';
import MemberManage from './routes/index/MemberManage';
import Levels from './routes/index/member_manage/Levels';
import LevelList from './routes/index/member_manage/level/RList';
import LevelEdit from './routes/index/member_manage/level/REdit';
import Members from './routes/index/member_manage/Members';
import MemberList from './routes/index/member_manage/member/RList';
import MemberEdit from './routes/index/member_manage/member/REdit';
import CustomerManage from './routes/index/CustomerManage';
import Groups from './routes/index/customer_manage/Groups';
import GroupList from './routes/index/customer_manage/group/RList';
import GroupEdit from './routes/index/customer_manage/group/REdit';
import Customers from './routes/index/customer_manage/Customers';
import CustomerList from './routes/index/customer_manage/customer/RList';
import CustomerEdit from './routes/index/customer_manage/customer/REdit';
import ContentManage from './routes/index/ContentManage';
import CarouselManage from './routes/index/content_manage/CarouselManage';
import Carousels from './routes/index/content_manage/carousel_manage/Carousels';
import CarouselList from './routes/index/content_manage/carousel_manage/carousel/RList';
import CarouselEdit from './routes/index/content_manage/carousel_manage/carousel/REdit';
import CarouselItems from './routes/index/content_manage/carousel_manage/CarouselItems';
import CarouselItemList from './routes/index/content_manage/carousel_manage/carousel_item/RList';
import CarouselItemEdit from './routes/index/content_manage/carousel_manage/carousel_item/REdit';
import AdManage from './routes/index/content_manage/AdManage';
import AdPositions from './routes/index/content_manage/ad_manage/AdPositions';
import AdPositionList from './routes/index/content_manage/ad_manage/ad_position/RList';
import AdPositionEdit from './routes/index/content_manage/ad_manage/ad_position/REdit';
import Ads from './routes/index/content_manage/ad_manage/Ads';
import AdList from './routes/index/content_manage/ad_manage/ad/RList';
import AdEdit from './routes/index/content_manage/ad_manage/ad/REdit';
import ArticleManage from './routes/index/content_manage/ArticleManage';
import Topics from './routes/index/content_manage/article_manage/Topics';
import TopicList from './routes/index/content_manage/article_manage/topic/RList';
import TopicEdit from './routes/index/content_manage/article_manage/topic/REdit';
import Articles from './routes/index/content_manage/article_manage/Articles';
import ArticleList from './routes/index/content_manage/article_manage/article/RList';
import ArticleEdit from './routes/index/content_manage/article_manage/article/REdit';
import DataAnalysis from './routes/index/DataAnalysis';
import UserAnalysis from './routes/index/data_analysis/UserAnalysis';
import UserAnalysiList from './routes/index/data_analysis/user_analysi/RList';
import MemberAnalysis from './routes/index/data_analysis/MemberAnalysis';
import MemberAnalysiList from './routes/index/data_analysis/member_analysi/RList';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/index" component={Index} onEnter={requireAuth}>
        <Route path="my_dashboard" component={MyDashboard} onEnter={requireAuth}>
          <Route path="welcome" component={Welcome}  onEnter={requireAuth}/>
          <Route path="my_info" component={MyInfo} onEnter={requireAuth}>
            <Route path="base_info" component={BaseInfo} onEnter={requireAuth}>
              <IndexRoute component={BaseInfoEdit} />
            </Route>
            <Route path="change_password" component={ChangePassword} onEnter={requireAuth}>
              <IndexRoute component={ChangePasswordEdit} />
            </Route>
            <Route path="update_avatar" component={UpdateAvatar} onEnter={requireAuth}>
              <IndexRoute component={UpdateAvatarView} />
              <Route path="edit" component={UpdateAvatarEdit} />
            </Route>
            <Route path="user_addresses" component={UserAddresses} onEnter={requireAuth}>
              <IndexRoute component={UserAddressList} />
              <Route path="add" component={UserAddressEdit} />
              <Route path="user_address/:id" component={UserAddressEdit}/>
            </Route>
            <Route path="user_credit_cards" component={UserCreditCards} onEnter={requireAuth}>
              <IndexRoute component={UserCreditCardList} />
              <Route path="add" component={UserCreditCardEdit} />
              <Route path="user_credit_card/:id" component={UserCreditCardEdit}/>
            </Route>
            <Route path="user_debit_cards" component={UserDebitCards} onEnter={requireAuth}>
              <IndexRoute component={UserDebitCardList} />
              <Route path="add" component={UserDebitCardEdit} />
              <Route path="user_debit_card/:id" component={UserDebitCardEdit}/>
            </Route>
          </Route>
        </Route>
        <Route path="system_config" component={SystemConfig} onEnter={requireAuth}>
          <Route path="menus" component={Menus} onEnter={requireAuth}>
            <IndexRoute component={MenuList} />
            <Route path="add" component={MenuEdit} />
            <Route path="menu/:id" component={MenuEdit}/>
          </Route>
          <Route path="roles" component={Roles} onEnter={requireAuth}>
            <IndexRoute component={RoleList} />
            <Route path="add" component={RoleEdit} />
            <Route path="role/:id" component={RoleEdit}/>
            <Route path="auth" component={RoleAuth}/>
          </Route>
          <Route path="users" component={Users} onEnter={requireAuth}>
            <IndexRoute component={UserList} />
            <Route path="add" component={UserEdit} />
            <Route path="user/:id" component={UserEdit}/>
            <Route path="auth" component={UserAuth}/>
          </Route>
          <Route path="area_manage" component={AreaManage} onEnter={requireAuth}>
            <Route path="provinces" component={Provinces} onEnter={requireAuth}>
              <IndexRoute component={ProvinceList} />
              <Route path="add" component={ProvinceEdit} />
              <Route path="province/:id" component={ProvinceEdit}/>
            </Route>
            <Route path="cities_and_counties" component={CitiesAndCounties} onEnter={requireAuth}>
              <IndexRoute component={CityAndCountyList} />
              <Route path="add" component={CityAndCountyEdit} />
              <Route path="city_and_county/:id" component={CityAndCountyEdit}/>
            </Route>
          </Route>
          <Route path="dict_manage" component={DictManage} onEnter={requireAuth}>
            <Route path="dict_types" component={DictTypes} onEnter={requireAuth}>
              <IndexRoute component={DictTypeList} />
              <Route path="add" component={DictTypeEdit} />
              <Route path="dict_type/:id" component={DictTypeEdit}/>
            </Route>
            <Route path="dicts" component={Dicts} onEnter={requireAuth}>
              <IndexRoute component={DictList} />
              <Route path="add" component={DictEdit} />
              <Route path="dict/:id" component={DictEdit}/>
            </Route>
            <Route path="dict_banks" component={DictBanks} onEnter={requireAuth}>
              <IndexRoute component={DictBankList} />
              <Route path="add" component={DictBankEdit} />
              <Route path="dict_bank/:id" component={DictBankEdit}/>
            </Route>
          </Route>
          <Route path="task_manage" component={TaskManage} onEnter={requireAuth}>
            <Route path="tasks" component={Tasks} onEnter={requireAuth}>
              <IndexRoute component={TaskList} />
              <Route path="add" component={TaskEdit} />
              <Route path="task/:id" component={TaskEdit}/>
            </Route>
            <Route path="task_logs" component={TaskLogs} onEnter={requireAuth}>
              <IndexRoute component={TaskLogList} />
            </Route>
          </Route>
          <Route path="resources" component={Resources} onEnter={requireAuth}>
            <IndexRoute component={ResourceList} />
          </Route>
          <Route path="mobile_app_manage" component={MobileAppManage} onEnter={requireAuth}>
            <Route path="mobile_apps" component={MobileApps} onEnter={requireAuth}>
              <IndexRoute component={MobileAppList} />
              <Route path="add" component={MobileAppEdit} />
              <Route path="mobile_app/:id" component={MobileAppEdit}/>
            </Route>
            <Route path="mobile_app_configs" component={MobileAppConfigs} onEnter={requireAuth}>
              <IndexRoute component={MobileAppConfigList} />
              <Route path="add" component={MobileAppConfigEdit} />
              <Route path="mobile_app_config/:id" component={MobileAppConfigEdit}/>
            </Route>
          </Route>
        </Route>
        <Route path="member_manage" component={MemberManage} onEnter={requireAuth}>
          <Route path="levels" component={Levels} onEnter={requireAuth}>
            <IndexRoute component={LevelList} />
            <Route path="add" component={LevelEdit} />
            <Route path="level/:id" component={LevelEdit}/>
          </Route>
          <Route path="members" component={Members} onEnter={requireAuth}>
            <IndexRoute component={MemberList} />
            <Route path="add" component={MemberEdit} />
            <Route path="member/:id" component={MemberEdit}/>
          </Route>
        </Route>
        <Route path="customer_manage" component={CustomerManage} onEnter={requireAuth}>
          <Route path="groups" component={Groups} onEnter={requireAuth}>
            <IndexRoute component={GroupList} />
            <Route path="add" component={GroupEdit} />
            <Route path="group/:id" component={GroupEdit}/>
          </Route>
          <Route path="customers" component={Customers} onEnter={requireAuth}>
            <IndexRoute component={CustomerList} />
            <Route path="add" component={CustomerEdit} />
            <Route path="customer/:id" component={CustomerEdit}/>
          </Route>
        </Route>
        <Route path="content_manage" component={ContentManage} onEnter={requireAuth}>
          <Route path="carousel_manage" component={CarouselManage} onEnter={requireAuth}>
            <Route path="carousels" component={Carousels} onEnter={requireAuth}>
              <IndexRoute component={CarouselList} />
              <Route path="add" component={CarouselEdit} />
              <Route path="carousel/:id" component={CarouselEdit}/>
            </Route>
            <Route path="carousel_items" component={CarouselItems} onEnter={requireAuth}>
              <IndexRoute component={CarouselItemList} />
              <Route path="add" component={CarouselItemEdit} />
              <Route path="carousel_item/:id" component={CarouselItemEdit}/>
            </Route>
          </Route>
          <Route path="ad_manage" component={AdManage} onEnter={requireAuth}>
            <Route path="ad_positions" component={AdPositions} onEnter={requireAuth}>
              <IndexRoute component={AdPositionList} />
              <Route path="add" component={AdPositionEdit} />
              <Route path="ad_position/:id" component={AdPositionEdit}/>
            </Route>
            <Route path="ads" component={Ads} onEnter={requireAuth}>
              <IndexRoute component={AdList} />
              <Route path="add" component={AdEdit} />
              <Route path="ad/:id" component={AdEdit}/>
            </Route>
          </Route>
          <Route path="article_manage" component={ArticleManage} onEnter={requireAuth}>
            <Route path="topics" component={Topics} onEnter={requireAuth}>
              <IndexRoute component={TopicList} />
              <Route path="add" component={TopicEdit} />
              <Route path="topic/:id" component={TopicEdit}/>
            </Route>
            <Route path="articles" component={Articles} onEnter={requireAuth}>
              <IndexRoute component={ArticleList} />
              <Route path="add" component={ArticleEdit} />
              <Route path="article/:id" component={ArticleEdit}/>
            </Route>
          </Route>
        </Route>
        <Route path="data_analysis" component={DataAnalysis} onEnter={requireAuth}>
          <Route path="user_analysis" component={UserAnalysis} onEnter={requireAuth}>
            <IndexRoute component={UserAnalysiList} />
          </Route>
          <Route path="member_analysis" component={MemberAnalysis} onEnter={requireAuth}>
            <IndexRoute component={MemberAnalysiList} />
          </Route>
        </Route>
      </Route>
    </Router>
  );
};

/**
 * 需要鉴权
 * @param nextState
 * @param replace
 */
function requireAuth(nextState, replace) {
  let b = false;
  let token = projectUtil.getToken();
  //console.log("token : " + token);
  if (token === null || token === undefined) {
  } else {
    let menuLink = nextState.location.pathname;
    console.log("menuLink : " + menuLink);
    b = projectUtil.authMap(menuLink)
  }
  if (!b) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
